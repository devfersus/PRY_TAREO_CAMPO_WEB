import { Suspense } from 'react';
import CategoryIcon   from '@mui/icons-material/Category';
import InventoryIcon  from '@mui/icons-material/Inventory';
import StraightenIcon from '@mui/icons-material/Straighten';
import WarehouseIcon  from '@mui/icons-material/Warehouse';
import { ListSkeleton } from '../components/ListSkeleton';
import type { SeguridadRoute } from './seguridad.routes';

import Categorias from '../../pages/Maestro/Categoria/Categoria';
import { getCategoriaAll } from '../../pages/Maestro/Categoria/api/getCategorias.action';
import type { ICategoria } from '../../pages/Maestro/Categoria/interface/ICategoria.interface';

import Productos from '../../pages/Maestro/Producto/Producto';
import { getProductoAll } from '../../pages/Maestro/Producto/api/getProductos.action';
import type { IProducto } from '../../pages/Maestro/Producto/interface/IProducto.interface';

import UnidadesMedida from '../../pages/Maestro/UnidadMedida/UnidadMedida';
import { getUnidadMedidaAll } from '../../pages/Maestro/UnidadMedida/api/getUnidadesMedida.action';
import type { IUnidadMedida } from '../../pages/Maestro/UnidadMedida/interface/IUnidadMedida.interface';

import Almacenes from '../../pages/Maestro/Almacen/Almacen';
import { getAlmacenAll } from '../../pages/Maestro/Almacen/api/getAlmacenes.action';
import type { IAlmacen } from '../../pages/Maestro/Almacen/interface/IAlmacen.interface';

export const maestroRoutes: SeguridadRoute[] = [
  {
    id:         'categoria',
    path:       '/categoria',
    label:      'Categoría',
    icon:       <CategoryIcon fontSize="small" />,
    permisoKey: 'MAESTRO|CATEGORIA',
    fetcher:    getCategoriaAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={5} />}>
        <Categorias getCategoria={p as Promise<ICategoria[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'producto',
    path:       '/producto',
    label:      'Producto',
    icon:       <InventoryIcon fontSize="small" />,
    permisoKey: 'MAESTRO|PRODUCTO',
    fetcher:    getProductoAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={6} />}>
        <Productos getProducto={p as Promise<IProducto[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'unidad-medida',
    path:       '/unidad-medida',
    label:      'Unidad de Medida',
    icon:       <StraightenIcon fontSize="small" />,
    permisoKey: 'MAESTRO|UNIDAD-MEDIDA',
    fetcher:    getUnidadMedidaAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={4} />}>
        <UnidadesMedida getUnidadMedida={p as Promise<IUnidadMedida[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'almacen',
    path:       '/almacen',
    label:      'Almacén',
    icon:       <WarehouseIcon fontSize="small" />,
    permisoKey: 'MAESTRO|ALMACEN',
    fetcher:    getAlmacenAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={4} />}>
        <Almacenes getAlmacen={p as Promise<IAlmacen[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
];
