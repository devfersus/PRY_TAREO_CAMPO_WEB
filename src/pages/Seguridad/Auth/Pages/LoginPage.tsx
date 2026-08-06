import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import type { ILoginCredentials } from '../interface/IAuth.interface';
import { useAuth } from '../hooks/useAuth';

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: Props) => {
  const { login, isLoading, error } = useAuth();

  const [email,      setEmail]      = useState('strin@gmail.com');
  const [contraseña, setContraseña] = useState('string');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: ILoginCredentials = { email, contraseña };
    const success = await login(credentials);
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Card sx={{ width: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            color="primary"
            align="center"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            TAREO CAMPO
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Ingrese sus credenciales para continuar
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            {error && (
              <Alert severity="error">{error}</Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 1 }}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
