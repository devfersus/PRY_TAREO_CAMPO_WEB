import { useState, Suspense } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FolderIcon from '@mui/icons-material/Folder';
import BoltIcon from '@mui/icons-material/Bolt';
import LockIcon from '@mui/icons-material/Lock';

import Acciones from '../../Seguridad/Accion/Accion';
import { getAccionAll } from '../../Seguridad/Accion/api/getAccions.action';
import type { IAccion } from '../../Seguridad/Accion/interface/IAccion.interface';
import Modulos from '../../Seguridad/Modulo/Modulo';
import { getModuloAll } from '../../Seguridad/Modulo/api/getModulos.action';
import type { IModulo } from '../../Seguridad/Modulo/interface/IModulo.interface';
import Submodulos from '../../Seguridad/SubModulo/Submodulo';
import { getSubmoduloAll } from '../../Seguridad/SubModulo/api/getSubmodulos.action';
import type { ISubmoduloListar } from '../../Seguridad/SubModulo/CasoUso/Listar/interface/ISubmoduloListar.interface';
import Permisos from '../../Seguridad/Permiso/Permiso';
import { getPermisoAll } from '../../Seguridad/Permiso/api/getPermisos.action';
import type { IPermiso } from '../../Seguridad/Permiso/interface/IPermiso.interface';

const DRAWER_WIDTH = 220;
const APPBAR_HEIGHT = 64;

const NAV_ITEMS = [
  { id: 'modulo',    label: 'Módulo',    icon: <ViewModuleIcon fontSize="small" /> },
  { id: 'submodulo', label: 'SubMódulo', icon: <FolderIcon fontSize="small" /> },
  { id: 'accion',    label: 'Acción',    icon: <BoltIcon fontSize="small" /> },
  { id: 'permiso',   label: 'Permiso',   icon: <LockIcon fontSize="small" /> },
];

function LoadingFallback({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}

function ModuloPage({ promise }: { promise: Promise<IModulo[]> }) {
  return (
    <Suspense fallback={<LoadingFallback label="Cargando módulos..." />}>
      <Modulos getModulo={promise} permisos={{ agregar: true, editar: true }} />
    </Suspense>
  );
}

function SubmoduloPage({ promise }: { promise: Promise<ISubmoduloListar[]> }) {
  return (
    <Suspense fallback={<LoadingFallback label="Cargando submódulos..." />}>
      <Submodulos getSubmodulo={promise} permisos={{ agregar: true, editar: true }} />
    </Suspense>
  );
}

function AccionPage({ promise }: { promise: Promise<IAccion[]> }) {
  return (
    <Suspense fallback={<LoadingFallback label="Cargando acciones..." />}>
      <Acciones permisos={{ agregar: true, editar: true }} getAccion={promise} />
    </Suspense>
  );
}

function PermisoPage({ promise }: { promise: Promise<IPermiso[]> }) {
  return (
    <Suspense fallback={<LoadingFallback label="Cargando permisos..." />}>
      <Permisos
        getPermiso={promise}
        permisos={{ agregar: true, editar: true, eliminar: true }}
      />
    </Suspense>
  );
}

interface DrawerDemoProps {
  onLogout: () => void;
}

export default function DrawerDemo({ onLogout }: DrawerDemoProps) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [moduloPromise,    setModuloPromise]    = useState<Promise<IModulo[]> | null>(null);
  const [submoduloPromise, setSubmoduloPromise] = useState<Promise<ISubmoduloListar[]> | null>(null);
  const [accionPromise,    setAccionPromise]    = useState<Promise<IAccion[]> | null>(null);
  const [permisoPromise,   setPermisoPromise]   = useState<Promise<IPermiso[]> | null>(null);

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (id === 'modulo'    && !moduloPromise)    setModuloPromise(getModuloAll());
    if (id === 'submodulo' && !submoduloPromise) setSubmoduloPromise(getSubmoduloAll());
    if (id === 'accion'    && !accionPromise)    setAccionPromise(getAccionAll());
    if (id === 'permiso'   && !permisoPromise)   setPermisoPromise(getPermisoAll());
  };

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
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.id}
              selected={activeId === item.id}
              onClick={() => handleSelect(item.id)}
              sx={{
                borderLeft: '3px solid',
                borderColor: activeId === item.id ? 'primary.main' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    variant: 'body2',
                    fontWeight: activeId === item.id ? 600 : 400,
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
        {activeId === null && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Selecciona una opción del menú lateral
            </Typography>
          </Box>
        )}

        {activeId === 'modulo'    && moduloPromise    && <ModuloPage    promise={moduloPromise} />}
        {activeId === 'submodulo' && submoduloPromise && <SubmoduloPage promise={submoduloPromise} />}
        {activeId === 'accion'    && accionPromise    && <AccionPage    promise={accionPromise} />}
        {activeId === 'permiso'   && permisoPromise   && <PermisoPage   promise={permisoPromise} />}
      </Box>

    </Box>
  );
}
