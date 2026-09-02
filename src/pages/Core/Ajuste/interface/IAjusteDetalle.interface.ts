export interface IAjusteDetalleItem {
    codigoAlmacen  : string;
    codigoProducto : string;
    cantidadSistema: number;
    cantidadFisica : number;
    comentario     : string;
    estado         : boolean;
}

export interface IAjusteDetalleMasivo {
    codigoAjuste    : string;
    items           : IAjusteDetalleItem[];
    usuarioRegistro : null;
    ipv4Registro    : null;
    ipv6Registro    : null;
}

export interface IAjusteDetalleListItem {
    idAjusteDetalle     : string;
    codigoAjuste        : string;
    codigoProducto      : string;
    descripcionProducto : string | null;
    codigoAlmacen       : string;
    cantidadSistema     : number;
    cantidadFisica      : number;
    diferencia          : number;
    comentario          : string | null;
    estado              : boolean;
}
