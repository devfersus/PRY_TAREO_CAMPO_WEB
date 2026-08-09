import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { seguridadRoutes, type SeguridadRoute } from '../../../shared/routes/seguridad.routes';

const DRAWER_WIDTH = 220;
const APPBAR_HEIGHT = 64;

interface DrawerDemoProps {
  onLogout: () => void;
}

export default function DrawerDemo({ onLogout }: DrawerDemoProps) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open,     setOpen]     = useState(true);
  const [promises, setPromises] = useState<Map<string, Promise<unknown>>>(new Map());

  const activeRoute = seguridadRoutes.find((r) => r.path === location.pathname) ?? null;

  // Cargar datos al navegar directamente por URL
  useEffect(() => {
    if (activeRoute && !promises.has(activeRoute.id)) {
      setPromises((prev) => new Map(prev).set(activeRoute.id, activeRoute.fetcher()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoute?.id]);

  const handleSelect = (route: SeguridadRoute) => {
    navigate(route.path);
    if (!promises.has(route.id)) {
      setPromises((prev) => new Map(prev).set(route.id, route.fetcher()));
    }
  };

  // Redirigir raíz → primer módulo
  if (location.pathname === '/') return <Navigate to="/modulo" replace />;

  const activePromise = activeRoute ? promises.get(activeRoute.id) : undefined;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen((p) => !p)}
            sx={{ mr: 2 }}
            title="Abrir/cerrar menú"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '0.02em' }}>
            TAREO CAMPO
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: `${APPBAR_HEIGHT}px`,
            height: `calc(100% - ${APPBAR_HEIGHT}px)`,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            fontSize: 11,
            fontWeight: 700,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Seguridad
        </Box>
        <Divider />
        <List dense disablePadding>
          {seguridadRoutes.map((route) => (
            <ListItemButton
              key={route.id}
              selected={activeRoute?.id === route.id}
              onClick={() => handleSelect(route)}
              sx={{
                borderLeft: '3px solid',
                borderColor: activeRoute?.id === route.id ? 'primary.main' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{route.icon}</ListItemIcon>
              <ListItemText
                primary={route.label}
                slotProps={{
                  primary: {
                    variant: 'body2',
                    fontWeight: activeRoute?.id === route.id ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${APPBAR_HEIGHT}px`,
          ml: open ? `${DRAWER_WIDTH}px` : 0,
          transition: 'margin-left 0.25s ease',
          overflowY: 'auto',
          height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
        }}
      >
        {activeRoute && (
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {activeRoute.label}
          </Typography>
        )}

        {activeRoute && activePromise && activeRoute.render(activePromise)}
      </Box>

    </Box>
  );
}
