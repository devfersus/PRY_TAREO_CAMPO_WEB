export interface IStock {
    idStock            : string;
    codigoProducto     : string;
    codigoAlmacen      : string;
    stockActual        : number;
    stockMinimo        : number;
    stockMaximo        : number;
    fechaActualizacion : string | null;
}
