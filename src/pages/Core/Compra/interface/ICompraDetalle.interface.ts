export interface ICompraDetalleItem {
  unidad        : number;
  cantidad      : number;
  codigoProducto: string;
  comentario    : string;
  estado        : boolean;
}

export interface ICompraDetalleMasivo {
  codigoCompra: string;
  items       : ICompraDetalleItem[];
}

export interface ICompraDetalleListItem {
  idCompraDetalle    : string;
  codigoCompra       : string;
  codigoProducto     : string;
  descripcionProducto: string | null;
  unidad             : number;
  cantidad           : number;
  comentario         : string | null;
  estado             : boolean;
}
