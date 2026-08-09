import { use, useState } from 'react';
import type { IAccion } from '../interface/IAccion.interface';
import { getAccionAll, getAccionPorId } from '../api/getAccions.action';

export const useAcciones = (getAccion: Promise<IAccion[]>) => {

  const initialAcciones = use(getAccion);
  const [acciones, setAcciones] = useState<IAccion[]>(initialAcciones);

  // --- Popup agregar ---
  const [popupVisible, setPopupVisible] = useState(false);
  const abrirPopup = () => setPopupVisible(true);
  const cerrarPopup = () => setPopupVisible(false);

  const recargarLista = async () => {
    const lista = await getAccionAll();
    setAcciones(lista);
  };

  const onAccionAgregada = async (_nueva: IAccion) => {
    await recargarLista();
    cerrarPopup();
  };

  // --- Popup editar ---
  const [accionSeleccionada, setAccionSeleccionada] = useState<IAccion | null>(null);
  const [popupEditarVisible, setPopupEditarVisible] = useState(false);
  const [cargandoEditar,     setCargandoEditar]     = useState(false);
  const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

  const onEditar = async (accion: IAccion) => {
    setCargandoEditar(true);
    setErrorEditar(null);
    try {
      const accionActualizada = await getAccionPorId(accion.id);
      setAccionSeleccionada(accionActualizada);
      setPopupEditarVisible(true);
    } catch {
      setErrorEditar('No se pudo cargar la acción para editar.');
    } finally {
      setCargandoEditar(false);
    }
  };

  const cerrarPopupEditar = () => setPopupEditarVisible(false);

  const onAccionActualizada = async (_actualizada: IAccion) => {
    await recargarLista();
    cerrarPopupEditar();
  };

  return {
    lista: {
      acciones,
    },
    popupAgregar: {
      visible:   popupVisible,
      abrir:     abrirPopup,
      cerrar:    cerrarPopup,
      onGuardar: onAccionAgregada,
    },
    popupEditar: {
      visible:      popupEditarVisible,
      abrir:        onEditar,
      cerrar:       cerrarPopupEditar,
      seleccionada: accionSeleccionada,
      onGuardar:    onAccionActualizada,
      cargando:     cargandoEditar,
      error:        errorEditar,
      cerrarError:  () => setErrorEditar(null),
    },
  };
};
