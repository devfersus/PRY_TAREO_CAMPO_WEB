import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import type { ILoginCredentials } from '../interface/IAuth.interface';
import { useAuth } from '../hooks/useAuth';
import fondoPantalla from '../../../../img/fondo_pantalla.jpg';

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: Props) => {
  const { login, isLoading, error } = useAuth();

  const [email,      setEmail]      = useState('');
  const [contraseña, setContraseña] = useState('');

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
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${fondoPantalla})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />

      {/* Card de login */}
      <Card
        sx={{
          position: 'relative',
          zIndex: 1,
          width: 420,
          bgcolor: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            color="primary"
            align="center"
            sx={{ letterSpacing: '0.06em', mb: 0.5 }}
          >
            TAREO CAMPO
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 1, py: 1.4, fontWeight: 600, fontSize: '0.95rem' }}
            >
              {isLoading
                ? <CircularProgress size={20} color="inherit" />
                : 'Iniciar Sesión'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
