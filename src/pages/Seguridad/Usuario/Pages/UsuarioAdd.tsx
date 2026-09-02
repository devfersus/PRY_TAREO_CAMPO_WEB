import { useActionState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { IUsuario } from '../interface/IUsuario.interface';
import { createUsuarioForm } from '../api/getUsuarios.action';

interface Props {
    onAddUsuario: (usuario: IUsuario) => void;
    onCancel?   : () => void;
}

export const AddUsuarioForm = ({ onAddUsuario, onCancel }: Props) => {
    const [_state, formAction, isPending] = useActionState(
        async (prevState: unknown, queryData: FormData) => {
            const usuario = await createUsuarioForm(prevState, queryData);
            onAddUsuario(usuario);
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
                required
                fullWidth
                autoFocus
                variant="outlined"
                inputProps={{ maxLength: 10 }}
            />
            <TextField
                name="nombre"
                label="Nombre"
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="apellidoPaterno"
                label="Apellido Paterno"
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="apellidoMaterno"
                label="Apellido Materno"
                fullWidth
                variant="outlined"
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
                variant="outlined"
            />
            <TextField
                name="contraseña"
                label="Contraseña"
                type="password"
                required
                fullWidth
                variant="outlined"
            />

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={isPending}>
                    Agregar
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
