import { use, useState } from 'react';
import type { IUsuario } from '../interface/IUsuario.interface';
import { getUsuarioAll, getUsuarioPorId } from '../api/getUsuarios.action';
import { deleteUsuario } from '../api/deleteUsuario.action';

export const useUsuarios = (getUsuario: Promise<IUsuario[]>) => {

    const initialUsuarios = use(getUsuario);
    const [usuarios, setUsuarios] = useState<IUsuario[]>(initialUsuarios);

    const recargarLista = async () => {
        const lista = await getUsuarioAll();
        setUsuarios(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onUsuarioAgregado = async (_nuevo: IUsuario) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [usuarioSeleccionado,  setUsuarioSeleccionado]  = useState<IUsuario | null>(null);
    const [popupEditarVisible,   setPopupEditarVisible]   = useState(false);
    const [cargandoEditar,       setCargandoEditar]       = useState(false);
    const [errorEditar,          setErrorEditar]          = useState<string | null>(null);

    const onEditar = async (usuario: IUsuario) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizado = await getUsuarioPorId(usuario.id);
            setUsuarioSeleccionado(actualizado);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar el usuario para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onUsuarioActualizado = async (_actualizado: IUsuario) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Eliminar ---
    const onEliminar = async (id: string) => {
        await deleteUsuario(id);
        await recargarLista();
    };

    return {
        lista: {
            usuarios,
        },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onUsuarioAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: usuarioSeleccionado,
            onGuardar:    onUsuarioActualizado,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
        onEliminar,
    };
};
