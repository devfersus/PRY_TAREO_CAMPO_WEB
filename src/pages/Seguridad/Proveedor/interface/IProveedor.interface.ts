export interface IProveedor {
    id                : string;
    codigo            : string;
    descripcion       : string | null;
    comentario        : string | null;
    usuarioContactoId : string | null;
    estado            : boolean;
}
