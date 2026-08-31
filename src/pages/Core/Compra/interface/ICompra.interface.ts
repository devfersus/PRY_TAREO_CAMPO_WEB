export interface ICompra {
    idCompra             : string;
    codigoCompra         : string;
    codigoProveedor      : string;
    descripcionProveedor : string | null;
    estado               : boolean;
}