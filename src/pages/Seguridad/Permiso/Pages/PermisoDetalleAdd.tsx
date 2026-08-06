import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getPermisoAcciones, getPermisoModulos, getPermisoSubmodulos } from '../api/getPermisos.action';
import { createPermisoDetalle } from '../api/createPermisoDetalle.action';
import { getPermisoDetalles } from '../api/getPermisoDetalles.action';
import type {
  IPermiso,
  IPermisoAccion,
  IPermisoDetalle,
  IPermisoModulo,
  IPermisoSubmodulo,
} from '../interface/IPermiso.interface';

interface Props {
  permiso: IPermiso;
  onCancel?: () => void;
}

interface GrupoDetalle {
  key                 : string;
  moduloDescripcion   : string;
  subModuloDescripcion: string;
  detalles            : IPermisoDetalle[];
}

export const PermisoDetalleAdd = ({ permiso, onCancel }: Props) => {
  const [modulos,    setModulos]    = useState<IPermisoModulo[]>([]);
  const [submodulos, setSubmodulos] = useState<IPermisoSubmodulo[]>([]);
  const [acciones,   setAcciones]   = useState<IPermisoAccion[]>([]);
  const [detalles,   setDetalles]   = useState<IPermisoDetalle[]>([]);

  const [moduloId,    setModuloId]    = useState<string>('');
  const [subModuloId, setSubModuloId] = useState<string>('');
  const [accionIds,   setAccionIds]   = useState<string[]>([]);
  const [isPending,   setIsPending]   = useState(false);

  const cargarDetalles = useCallback(async () => {
    const data = await getPermisoDetalles(permiso.id);
    setDetalles(data);
  }, [permiso.id]);

  useEffect(() => {
    getPermisoModulos().then(setModulos);
    getPermisoSubmodulos().then(setSubmodulos);
    getPermisoAcciones().then(setAcciones);
    cargarDetalles();
  }, [cargarDetalles]);

  const handleAccionesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setAccionIds(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduloId || !subModuloId || accionIds.length === 0) return;
    setIsPending(true);
    try {
      await createPermisoDetalle({
        permisoId: permiso.id,
        detalles: accionIds.map((accionId) => ({ moduloId, subModuloId, accionId })),
      });
      setModuloId('');
      setSubModuloId('');
      setAccionIds([]);
      await cargarDetalles();
    } finally {
      setIsPending(false);
    }
  };

  const grupos: GrupoDetalle[] = Object.values(
    detalles
      .filter((d) => d.activo)
      .reduce<Record<string, GrupoDetalle>>((acc, d) => {
      const key = `${d.moduloId}_${d.subModuloId}`;
      if (!acc[key]) {
        acc[key] = {
          key,
          moduloDescripcion:    d.moduloDescripcion,
          subModuloDescripcion: d.subModuloDescripcion,
          detalles:             [],
        };
      }
      acc[key].detalles.push(d);
      return acc;
    }, {})
  );

  const accionesLabel = acciones
    .filter((a) => accionIds.includes(a.id))
    .map((a) => a.descripcion)
    .join(', ');

  return (
    <Box sx={{ display: 'flex', gap: 2, pt: 1, minHeight: 380 }}>
      {/* ── Panel izquierdo: formulario agregar ── */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
      >
        <Typography variant="body2" color="text.secondary">
          Permiso: <strong>{permiso.descripcion}</strong>
        </Typography>

        <FormControl fullWidth required>
          <InputLabel>Módulo</InputLabel>
          <Select
            value={moduloId}
            label="Módulo"
            onChange={(e: SelectChangeEvent) => setModuloId(e.target.value)}
          >
            {modulos.map((m) => (
              <MenuItem key={m.id} value={m.id}>{m.descripcion}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>SubMódulo</InputLabel>
          <Select
            value={subModuloId}
            label="SubMódulo"
            onChange={(e: SelectChangeEvent) => setSubModuloId(e.target.value)}
          >
            {submodulos.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.descripcion}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Acciones</InputLabel>
          <Select
            multiple
            value={accionIds}
            label="Acciones"
            onChange={handleAccionesChange}
            renderValue={() => accionesLabel}
          >
            {acciones.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                <Checkbox checked={accionIds.includes(a.id)} />
                <ListItemText primary={a.descripcion} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending || !moduloId || !subModuloId || accionIds.length === 0}
          >
            Guardar Detalle
          </Button>
          {onCancel && (
            <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
              Cerrar
            </Button>
          )}
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* ── Panel derecho: detalles guardados (solo lectura) ── */}
      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: 420 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          {permiso.descripcion}
        </Typography>

        {grupos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Sin detalles registrados.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {grupos.map((grupo) => (
              <Paper key={grupo.key} variant="outlined" sx={{ p: 1.5 }}>
                <Typography variant="body2">
                  <strong>Módulo:</strong> {grupo.moduloDescripcion}
                </Typography>
                <Typography variant="body2">
                  <strong>SubMódulo:</strong> {grupo.subModuloDescripcion}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Acciones:</strong>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {grupo.detalles.map((d) => (
                    <Chip key={d.id} label={d.accionDescripcion} size="small" variant="outlined" />
                  ))}
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
