import { Suspense, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ListSkeleton } from '../components/ListSkeleton';
import ViewModuleIcon    from '@mui/icons-material/ViewModule';
import FolderIcon        from '@mui/icons-material/Folder';
import BoltIcon          from '@mui/icons-material/Bolt';
import LockIcon          from '@mui/icons-material/Lock';
import AssignmentIcon    from '@mui/icons-material/Assignment';
import BusinessIcon      from '@mui/icons-material/Business';
import PersonIcon        from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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

import ActividadesOperario from '../../pages/Seguridad/ActividadOperario/ActividadOperario';
import { getActividadOperarioAll } from '../../pages/Seguridad/ActividadOperario/api/getActividadesOperario.action';
import type { IActividadOperario } from '../../pages/Seguridad/ActividadOperario/interface/IActividadOperario.interface';

import Proveedores from '../../pages/Seguridad/Proveedor/Proveedor';
import { getProveedorAll } from '../../pages/Seguridad/Proveedor/api/getProveedores.action';
import type { IProveedor } from '../../pages/Seguridad/Proveedor/interface/IProveedor.interface';

import Usuarios from '../../pages/Seguridad/Usuario/Usuario';
import { getUsuarioAll } from '../../pages/Seguridad/Usuario/api/getUsuarios.action';
import type { IUsuario } from '../../pages/Seguridad/Usuario/interface/IUsuario.interface';

import { UsuarioPermiso } from '../../pages/Seguridad/UsuarioPermiso/Pages/UsuarioPermiso';

export function LoadingFallback({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export interface RoutePermisos {
  agregar?  : boolean;
  editar?   : boolean;
  eliminar? : boolean;
}

export interface SeguridadRoute {
  id         : string;
  path       : string;
  label      : string;
  icon       : ReactNode;
  permisoKey : string;
  fetcher    : () => Promise<unknown>;
  render     : (promise: Promise<unknown>, permisos: RoutePermisos) => ReactNode;
}

export const seguridadRoutes: SeguridadRoute[] = [
  {
    id:         'modulo',
    path:       '/modulo',
    label:      'Módulo',
    icon:       <ViewModuleIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|MODULO',
    fetcher:    getModuloAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={3} />}>
        <Modulos getModulo={p as Promise<IModulo[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'submodulo',
    path:       '/submodulo',
    label:      'SubMódulo',
    icon:       <FolderIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|SUBMODULO',
    fetcher:    getSubmoduloAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={3} />}>
        <Submodulos getSubmodulo={p as Promise<ISubmoduloListar[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'accion',
    path:       '/accion',
    label:      'Acción',
    icon:       <BoltIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|ACCION',
    fetcher:    getAccionAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={3} />}>
        <Acciones getAccion={p as Promise<IAccion[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'permiso',
    path:       '/permiso',
    label:      'Permiso',
    icon:       <LockIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|PERMISO',
    fetcher:    getPermisoAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={4} />}>
        <Permisos getPermiso={p as Promise<IPermiso[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false, eliminar: permisos.eliminar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'actividad-operario',
    path:       '/actividad-operario',
    label:      'Actividad Operario',
    icon:       <AssignmentIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|ACTIVIDAD-OPERARIO',
    fetcher:    getActividadOperarioAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={3} />}>
        <ActividadesOperario getActividadOperario={p as Promise<IActividadOperario[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false, eliminar: permisos.eliminar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'proveedor',
    path:       '/proveedor',
    label:      'Proveedor',
    icon:       <BusinessIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|PROVEEDOR',
    fetcher:    getProveedorAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={5} />}>
        <Proveedores getProveedor={p as Promise<IProveedor[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'usuario',
    path:       '/usuario',
    label:      'Usuario',
    icon:       <PersonIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|USUARIO',
    fetcher:    getUsuarioAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={6} />}>
        <Usuarios getUsuario={p as Promise<IUsuario[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false, eliminar: permisos.eliminar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'usuario-permiso',
    path:       '/usuario-permiso',
    label:      'Usuario Permiso',
    icon:       <ManageAccountsIcon fontSize="small" />,
    permisoKey: 'SEGURIDAD|USUARIO-PERMISO',
    fetcher:    getPermisoAll as () => Promise<unknown>,
    render:     (p, _permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={2} />}>
        <UsuarioPermiso getPermiso={p as Promise<IPermiso[]>} />
      </Suspense>
    ),
  },
];
