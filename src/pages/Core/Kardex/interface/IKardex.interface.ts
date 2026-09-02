export interface IKardex {
    idKardex        : string;
    tipoMovimiento  : string;
    codigoProducto  : string;
    codigoAlmacen   : string;
    cantidad        : number;
    saldoUnidades   : number;
    referenciaTipo  : string | null;
    referenciaCodig : string | null;
    fechaMovimiento : string | null;
    usuarioRegistro : string | null;
}
