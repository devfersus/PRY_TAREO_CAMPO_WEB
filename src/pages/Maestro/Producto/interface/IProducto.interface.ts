export interface IProducto {
    id                : string;
    codigo            : string;
    idCategoria       : string | null;
    idProveedor       : string | null;
    precio            : number;
    descripcion       : string | null;
    comentario        : string | null;
    usuarioContactoId : string | null;
    estado            : boolean;
}
