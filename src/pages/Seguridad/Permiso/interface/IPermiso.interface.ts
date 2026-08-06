export interface IPermiso {
    id          : string;
    descripcion : string;
    activo      : boolean;
}

export interface IPermisoModulo {
    id          : string;
    descripcion : string;
    activo      : boolean;
}

export interface IPermisoSubmodulo {
    id          : string;
    descripcion : string;
    moduloId    : string;
    activo      : boolean;
}

export interface IPermisoAccion {
    id          : string;
    descripcion : string;
    activo      : boolean;
}

export interface IPermisoDetalleItem {
    moduloId    : string;
    subModuloId : string;
    accionId    : string;
}

export interface IPermisoDetalleRequest {
    permisoId   : string;
    detalles    : IPermisoDetalleItem[];
}

export interface IPermisoDetalle {
    id                  : string;
    permisoId           : string;
    moduloId            : string;
    moduloDescripcion   : string;
    subModuloId         : string;
    subModuloDescripcion: string;
    accionId            : string;
    accionDescripcion   : string;
    activo              : boolean;
}
