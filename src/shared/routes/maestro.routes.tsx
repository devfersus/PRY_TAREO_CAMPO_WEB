import { Suspense } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ListSkeleton } from '../components/ListSkeleton';
import type { SeguridadRoute } from './seguridad.routes';

import Categorias from '../../pages/Maestro/Categoria/Categoria';
import { getCategoriaAll } from '../../pages/Maestro/Categoria/api/getCategorias.action';
import type { ICategoria } from '../../pages/Maestro/Categoria/interface/ICategoria.interface';

import Productos from '../../pages/Maestro/Producto/Producto';
import { getProductoAll } from '../../pages/Maestro/Producto/api/getProductos.action';
import type { IProducto } from '../../pages/Maestro/Producto/interface/IProducto.interface';

export const maestroRoutes: SeguridadRoute[] = [
  {
    id:      'categoria',
    path:    '/categoria',
    label:   'Categoría',
    icon:    <CategoryIcon fontSize="small" />,
    fetcher: getCategoriaAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={5} />}>
        <Categorias getCategoria={p as Promise<ICategoria[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
  {
    id:      'producto',
    path:    '/producto',
    label:   'Producto',
    icon:    <InventoryIcon fontSize="small" />,
    fetcher: getProductoAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={6} />}>
        <Productos getProducto={p as Promise<IProducto[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
];
