import { Suspense } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon    from '@mui/icons-material/Inventory';
import OutputIcon       from '@mui/icons-material/Output';
import ReceiptLongIcon  from '@mui/icons-material/ReceiptLong';
import TuneIcon         from '@mui/icons-material/Tune';
import { ListSkeleton } from '../components/ListSkeleton';
import type { SeguridadRoute } from './seguridad.routes';

import Compras from '../../pages/Core/Compra/Compra';
import { getCompraAll } from '../../pages/Core/Compra/api/getCompras.action';
import type { ICompra } from '../../pages/Core/Compra/interface/ICompra.interface';

import Stock from '../../pages/Core/Stock/Stock';
import { getStockAll } from '../../pages/Core/Stock/api/getStock.action';
import type { IStock } from '../../pages/Core/Stock/interface/IStock.interface';

import Salidas from '../../pages/Core/Salida/Salida';
import { getSalidaAll } from '../../pages/Core/Salida/api/getSalidas.action';
import type { ISalida } from '../../pages/Core/Salida/interface/ISalida.interface';

import Kardex from '../../pages/Core/Kardex/Kardex';
import { getKardexAll } from '../../pages/Core/Kardex/api/getKardex.action';
import type { IKardex } from '../../pages/Core/Kardex/interface/IKardex.interface';

import Ajustes from '../../pages/Core/Ajuste/Ajuste';
import { getAjusteAll } from '../../pages/Core/Ajuste/api/getAjustes.action';
import type { IAjuste } from '../../pages/Core/Ajuste/interface/IAjuste.interface';

export const coreRoutes: SeguridadRoute[] = [
  {
    id:         'compra',
    path:       '/compra',
    label:      'Compra',
    icon:       <ShoppingCartIcon fontSize="small" />,
    permisoKey: 'CORE|COMPRA',
    fetcher:    getCompraAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={8} />}>
        <Compras getCompra={p as Promise<ICompra[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'stock',
    path:       '/stock',
    label:      'Stock',
    icon:       <InventoryIcon fontSize="small" />,
    permisoKey: 'CORE|STOCK',
    fetcher:    getStockAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={7} />}>
        <Stock getStock={p as Promise<IStock[]>} permisos={{ editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'salida',
    path:       '/salida',
    label:      'Salida',
    icon:       <OutputIcon fontSize="small" />,
    permisoKey: 'CORE|SALIDA',
    fetcher:    getSalidaAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={4} />}>
        <Salidas getSalida={p as Promise<ISalida[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
  {
    id:         'kardex',
    path:       '/kardex',
    label:      'Kardex',
    icon:       <ReceiptLongIcon fontSize="small" />,
    permisoKey: 'CORE|KARDEX',
    fetcher:    getKardexAll as () => Promise<unknown>,
    render:     (p, _permisos) => (
      <Suspense fallback={<ListSkeleton rows={8} cols={9} />}>
        <Kardex getKardex={p as Promise<IKardex[]>} />
      </Suspense>
    ),
  },
  {
    id:         'ajuste',
    path:       '/ajuste',
    label:      'Ajuste',
    icon:       <TuneIcon fontSize="small" />,
    permisoKey: 'CORE|AJUSTE',
    fetcher:    getAjusteAll as () => Promise<unknown>,
    render:     (p, permisos) => (
      <Suspense fallback={<ListSkeleton rows={6} cols={4} />}>
        <Ajustes getAjuste={p as Promise<IAjuste[]>} permisos={{ agregar: permisos.agregar ?? false, editar: permisos.editar ?? false }} />
      </Suspense>
    ),
  },
];
