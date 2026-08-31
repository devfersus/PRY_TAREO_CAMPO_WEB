export interface IUsuario {
    id               : string;
    codigo           : string;
    nombre           : string;
    apellidoPaterno  : string;
    apellidoMaterno  : string;
    email            : string;
    activo           : boolean;
    fechaCreacion    : string;
    fechaModificacion: string | null;
}
