import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getMisPermisos } from '../api/misPermisosApi';

interface PermisosContextType {
    misPermisos  : string[];
    cargando     : boolean;
    tienePermiso : (key: string) => boolean;
}

const PermisosContext = createContext<PermisosContextType>({
    misPermisos  : [],
    cargando     : true,
    tienePermiso : () => false,
});

export const PermisosProvider = ({ children }: { children: ReactNode }) => {
    const [misPermisos, setMisPermisos] = useState<string[]>([]);
    const [cargando,    setCargando]    = useState(true);

    useEffect(() => {
        getMisPermisos().then((p) => {
            setMisPermisos(p);
            setCargando(false);
        });
    }, []);

    const tienePermiso = (key: string) => misPermisos.includes(key);

    return (
        <PermisosContext.Provider value={{ misPermisos, cargando, tienePermiso }}>
            {children}
        </PermisosContext.Provider>
    );
};

export const usePermisos = () => useContext(PermisosContext);
