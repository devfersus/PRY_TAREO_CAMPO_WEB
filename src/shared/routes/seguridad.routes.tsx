import { Suspense, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FolderIcon from '@mui/icons-material/Folder';
import BoltIcon from '@mui/icons-material/Bolt';
import LockIcon from '@mui/icons-material/Lock';

import Modulos from '../../pages/Seguridad/Modulo/Modulo';
import { getModuloAll } from '../../pages/Seguridad/Modulo/api/getModulos.action';
import type { IModulo } from '../../pages/Seguridad/Modulo/interface/IModulo.interface';

import Submodulos from '../../pages/Seguridad/SubModulo/Submodulo';
import { getSubmoduloAll } from '../../pages/Seguridad/SubModulo/api/getSubmodulos.action';
import type { ISubmoduloListar } from '../../pages/Seguridad/SubModulo/CasoUso/Listar/interface/ISubmoduloListar.interface';

import Acciones from '../../pages/Seguridad/Accion/Accion';
import { getAccionAll } from '../../pages/Seguridad/Accion/api/getAccions.action';
import type { IAccion } from '../../pages/Seguridad/Accion/interface/IAccion.interface';

import Permisos from '../../pages/Seguridad/Permiso/Permiso';
import { getPermisoAll } from '../../pages/Seguridad/Permiso/api/getPermisos.action';
import type { IPermiso } from '../../pages/Seguridad/Permiso/interface/IPermiso.interface';

export function LoadingFallback({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export interface SeguridadRoute {
  id:      string;
  path:    string;
  label:   string;
  icon:    ReactNode;
  fetcher: () => Promise<unknown>;
  render:  (promise: Promise<unknown>) => ReactNode;
}

export const seguridadRoutes: SeguridadRoute[] = [
  {
    id:      'modulo',
    path:    '/modulo',
    label:   'Módulo',
    icon:    <ViewModuleIcon fontSize="small" />,
    fetcher: getModuloAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<LoadingFallback label="Cargando módulos..." />}>
        <Modulos getModulo={p as Promise<IModulo[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
  {
    id:      'submodulo',
    path:    '/submodulo',
    label:   'SubMódulo',
    icon:    <FolderIcon fontSize="small" />,
    fetcher: getSubmoduloAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<LoadingFallback label="Cargando submódulos..." />}>
        <Submodulos getSubmodulo={p as Promise<ISubmoduloListar[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
  {
    id:      'accion',
    path:    '/accion',
    label:   'Acción',
    icon:    <BoltIcon fontSize="small" />,
    fetcher: getAccionAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<LoadingFallback label="Cargando acciones..." />}>
        <Acciones getAccion={p as Promise<IAccion[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
  {
    id:      'permiso',
    path:    '/permiso',
    label:   'Permiso',
    icon:    <LockIcon fontSize="small" />,
    fetcher: getPermisoAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<LoadingFallback label="Cargando permisos..." />}>
        <Permisos getPermiso={p as Promise<IPermiso[]>} permisos={{ agregar: true, editar: true, eliminar: true }} />
      </Suspense>
    ),
  },
];
