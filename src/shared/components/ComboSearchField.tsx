import { useEffect, useRef, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export interface ComboItem {
  codigo     : string;
  descripcion: string;
}

interface Props {
  name        : string;
  label       : string;
  defaultValue?: string;          // valor inicial (codigo) — se envía en el hidden
  defaultLabel?: string;          // descripcion inicial si ya se conoce
  fetchOptions: (search: string) => Promise<ComboItem[]>;
  disabled?   : boolean;
}

/**
 * Campo de búsqueda con autocompletado.
 * - Muestra el campo `descripcion` de cada opción en el dropdown.
 * - Envía el campo `codigo` como valor del formulario (input hidden).
 *
 * Usa `value` controlado (ComboItem | null) para que MUI muestre
 * la descripción correctamente sin resetearla al perder el foco.
 */
export const ComboSearchField = ({ name, label, defaultValue, defaultLabel, fetchOptions, disabled }: Props) => {
  const [options,      setOptions]      = useState<ComboItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComboItem | null>(
    defaultValue && defaultLabel ? { codigo: defaultValue, descripcion: defaultLabel } : null
  );
  const [searchQuery,  setSearchQuery]  = useState('');
  const [hiddenValue,  setHiddenValue]  = useState(defaultValue ?? '');
  const [loading,      setLoading]      = useState(false);
  const autoSelected = useRef(false);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const items = await fetchOptions(searchQuery);
        if (active) {
          setOptions(items);
          // Si hay defaultValue pero no defaultLabel, buscar el item por código
          // en los resultados de la primera carga (búsqueda vacía)
          if (!autoSelected.current && defaultValue && !defaultLabel) {
            autoSelected.current = true;
            const match = items.find(i => i.codigo === defaultValue);
            if (match) setSelectedItem(match);
          }
        }
      } catch {
        if (active) setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery, fetchOptions]);

  return (
    <>
      <input type="hidden" name={name} value={hiddenValue} />
      <Autocomplete
        value={selectedItem}
        options={options}
        isOptionEqualToValue={(opt, val) => opt.codigo === val.codigo}
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.descripcion)}
        filterOptions={(x) => x}          // filtrado lo hace el servidor
        loading={loading}
        disabled={disabled}
        slotProps={{ popper: { style: { zIndex: 1400 } } }}
        onInputChange={(_, v, reason) => {
          if (reason === 'input') setSearchQuery(v);
          if (reason === 'clear') { setSearchQuery(''); setHiddenValue(''); setSelectedItem(null); }
        }}
        onChange={(_, selected) => {
          setSelectedItem(selected);
          setHiddenValue(selected?.codigo ?? '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={16} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    </>
  );
};
