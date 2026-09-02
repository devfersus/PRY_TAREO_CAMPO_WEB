export interface ISalidaDetalleItem {
    codigoAlmacen : string;
    codigoProducto: string;
    unidad        : number;
    cantidad      : number;
    comentario    : string;
    estado        : boolean;
}

export interface ISalidaDetalleMasivo {
    codigoSalida    : string;
    usuarioRegistro : null;
    ipv4Registro    : null;
    ipv6Registro    : null;
    items           : ISalidaDetalleItem[];
}

export interface ISalidaDetalleListItem {
    idSalidaDetalle     : string;
    codigoSalida        : string;
    codigoProducto      : string;
    descripcionProducto : string | null;
    codigoAlmacen       : string;
    unidad              : number;
    cantidad            : number;
    comentario          : string | null;
    estado              : boolean;
}
