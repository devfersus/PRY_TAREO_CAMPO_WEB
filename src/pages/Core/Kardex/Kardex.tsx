import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { ComboSearchField } from '../../../shared/components/ComboSearchField';
import { getProductosCombo } from '../../Maestro/Producto/api/productoCombo.action';
import { getAlmacenesCombo } from '../../Maestro/Almacen/api/almacenCombo.action';
import type { IKardex } from './interface/IKardex.interface';
import { useKardex } from './hooks/useKardex';
import { KardexLista } from './Pages/KardexList';

interface Props {
    getKardex: Promise<IKardex[]>;
}

const Kardex: FC<Props> = ({ getKardex }) => {
    const { lista, filtro } = useKardex(getKardex);
    const filterFormRef     = useRef<HTMLFormElement>(null);

    const fetchProductos = useCallback((s: string) => getProductosCombo(s), []);
    const fetchAlmacenes = useCallback((s: string) => getAlmacenesCombo(s), []);

    const handleFiltrar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!filterFormRef.current) return;
        const fd             = new FormData(filterFormRef.current);
        const codigoProducto = (fd.get('codigoProducto_filter') as string) || '';
        const codigoAlmacen  = (fd.get('codigoAlmacen_filter')  as string) || '';
        filtro.filtrar(codigoProducto, codigoAlmacen);
    };

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>KARDEX</Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Filtro por producto + almacén */}
            <Box
                key={filtro.filterKey}
                component="form"
                ref={filterFormRef}
                onSubmit={handleFiltrar}
                sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}
            >
                <Box sx={{ minWidth: 240 }}>
                    <ComboSearchField
                        name="codigoProducto_filter"
                        label="Producto"
                        fetchOptions={fetchProductos}
                        disabled={filtro.cargando}
                    />
                </Box>
                <Box sx={{ minWidth: 240 }}>
                    <ComboSearchField
                        name="codigoAlmacen_filter"
                        label="Almacén"
                        fetchOptions={fetchAlmacenes}
                        disabled={filtro.cargando}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="outlined"
                    startIcon={<FilterAltIcon />}
                    disabled={filtro.cargando}
                >
                    Filtrar
                </Button>
                {filtro.isFiltrado && (
                    <Button
                        type="button"
                        variant="text"
                        color="inherit"
                        startIcon={<FilterAltOffIcon />}
                        onClick={filtro.limpiarFiltro}
                        disabled={filtro.cargando}
                    >
                        Ver todos
                    </Button>
                )}
                {filtro.isFiltrado && (
                    <Chip label="Filtro activo" color="info" size="small" variant="outlined" />
                )}
            </Box>

            <KardexLista kardexItems={lista.kardexItems} />
        </>
    );
};

export default Kardex;
