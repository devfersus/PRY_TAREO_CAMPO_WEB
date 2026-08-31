import { Suspense } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ListSkeleton } from '../components/ListSkeleton';
import type { SeguridadRoute } from './seguridad.routes';

import Compras from '../../pages/Core/Compra/Compra';
import { getCompraAll } from '../../pages/Core/Compra/api/getCompras.action';
import type { ICompra } from '../../pages/Core/Compra/interface/ICompra.interface';

export const coreRoutes: SeguridadRoute[] = [
  {
    id:      'compra',
    path:    '/compra',
    label:   'Compra',
    icon:    <ShoppingCartIcon fontSize="small" />,
    fetcher: getCompraAll as () => Promise<unknown>,
    render:  (p) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={8} />}>
        <Compras getCompra={p as Promise<ICompra[]>} permisos={{ agregar: true, editar: true }} />
      </Suspense>
    ),
  },
];
