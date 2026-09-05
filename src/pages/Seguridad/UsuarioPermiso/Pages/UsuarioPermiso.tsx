import { use, useEffect, useState } from 'react';
import Alert         from '@mui/material/Alert';
import Autocomplete  from '@mui/material/Autocomplete';
import Box           from '@mui/material/Box';
import Checkbox      from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider       from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import TextField     from '@mui/material/TextField';
import Typography    from '@mui/material/Typography';
import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { getUsuariosComboConId } from '../../Usuario/api/usuarioCombo.action';
import type { IPermiso } from '../../Permiso/interface/IPermiso.interface';
import { asignarPermiso, getUsuarioPermisos, revocarPermiso } from '../api/usuarioPermiso.action';
import type { IUsuarioPermiso } from '../interface/IUsuarioPermiso.interface';

interface Props {
    getPermiso: Promise<IPermiso[]>;
}

export const UsuarioPermiso = ({ getPermiso }: Props) => {
    const todosLosPermisos = use(getPermiso);

    const [opciones,     setOpciones]     = useState<ComboItem[]>([]);
    const [cargandoUsr,  setCargandoUsr]  = useState(true);
    const [usuarioSel,   setUsuarioSel]   = useState<ComboItem | null>(null);

    const [asignados,    setAsignados]    = useState<IUsuarioPermiso[]>([]);
    const [cargando,     setCargando]     = useState(false);
    const [procesando,   setProcesando]   = useState<string | null>(null);
    const [error,        setError]        = useState<string | null>(null);

    // Cargar todos los usuarios una sola vez al montar
    useEffect(() => {
        getUsuariosComboConId()
            .then(setOpciones)
            .catch(() => setOpciones([]))
            .finally(() => setCargandoUsr(false));
    }, []);

    // Cargar permisos asignados al usuario seleccionado
    useEffect(() => {
        if (!usuarioSel) { setAsignados([]); return; }
        setCargando(true);
        setError(null);
        getUsuarioPermisos(usuarioSel.codigo)
            .then(setAsignados)
            .catch(() => setError('No se pudieron cargar los permisos del usuario.'))
            .finally(() => setCargando(false));
    }, [usuarioSel]);

    const estaAsignado = (permisoId: string) =>
        asignados.some(a => a.permisoId === permisoId);

    const handleToggle = async (permisoId: string, checked: boolean) => {
        if (!usuarioSel || procesando !== null) return;
        setProcesando(permisoId);
        setError(null);
        try {
            if (checked) {
                await asignarPermiso(usuarioSel.codigo, permisoId);
                setAsignados(prev => [...prev, { id: '', usuarioId: usuarioSel.codigo, permisoId, activo: true }]);
            } else {
                await revocarPermiso(usuarioSel.codigo, permisoId);
                setAsignados(prev => prev.filter(a => a.permisoId !== permisoId));
            }
        } catch {
            setError(`No se pudo ${checked ? 'asignar' : 'revocar'} el permiso.`);
        } finally {
            setProcesando(null);
        }
    };

    return (
        <Box sx={{ maxWidth: 560 }}>

            {/* Selector de usuario */}
            <Autocomplete
                options={opciones}
                value={usuarioSel}
                loading={cargandoUsr}
                isOptionEqualToValue={(opt, val) => opt.codigo === val.codigo}
                getOptionLabel={(opt) => opt.descripcion}
                onInputChange={(_, _v, reason) => {
                    if (reason === 'clear') setUsuarioSel(null);
                }}
                onChange={(_, sel) => setUsuarioSel(sel)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Seleccionar Usuario"
                        variant="outlined"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {cargandoUsr && <CircularProgress color="inherit" size={16} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />

            {/* Lista de permisos */}
            {usuarioSel && (
                <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                        Permisos de {usuarioSel.descripcion}
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    {cargando
                        ? <LinearProgress sx={{ borderRadius: 1 }} />
                        : (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {todosLosPermisos.map((p) => (
                                    <FormControlLabel
                                        key={p.id}
                                        control={
                                            <Checkbox
                                                checked={estaAsignado(p.id)}
                                                disabled={procesando !== null}
                                                onChange={(e) => handleToggle(p.id, e.target.checked)}
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography
                                                variant="body2"
                                                sx={{ opacity: p.activo ? 1 : 0.45 }}
                                            >
                                                {p.descripcion}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </Box>
                        )
                    }
                </Box>
            )}
        </Box>
    );
};
