import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { IUsuario } from '../interface/IUsuario.interface';
import { updateUsuarioForm } from '../api/updateUsuario.action';

interface Props {
    usuario     : IUsuario;
    onActualizar: (usuario: IUsuario) => void;
    onCancel?   : () => void;
}

export const UsuarioEdit = ({ usuario, onActualizar, onCancel }: Props) => {
    const [activo, setActivo] = useState(usuario.activo);

    const [_state, formAction, isPending] = useActionState(
        async (_prevState: unknown, queryData: FormData) => {
            const actualizado = await updateUsuarioForm(usuario.id, _prevState, queryData);
            onActualizar(actualizado);
        },
        null
    );

    return (
        <Box
            component="form"
            action={formAction}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}
        >
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}

            <TextField
                name="codigo"
                label="Código"
                defaultValue={usuario.codigo}
                required
                fullWidth
                autoFocus
                variant="outlined"
            />
            <TextField
                name="nombre"
                label="Nombre"
                defaultValue={usuario.nombre}
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="apellidoPaterno"
                label="Apellido Paterno"
                defaultValue={usuario.apellidoPaterno}
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="apellidoMaterno"
                label="Apellido Materno"
                defaultValue={usuario.apellidoMaterno}
                fullWidth
                variant="outlined"
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                defaultValue={usuario.email}
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="contraseña"
                label="Nueva Contraseña"
                type="password"
                fullWidth
                variant="outlined"
                helperText="Dejar en blanco para no cambiar"
            />

            <input type="hidden" name="activo" value={activo ? 'true' : 'false'} />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={activo}
                        onChange={(e) => setActivo(e.target.checked)}
                        color="success"
                    />
                }
                label={activo ? 'Activo' : 'Inactivo'}
            />

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={isPending}>
                    Guardar
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outlined"
                        color="inherit"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
};
