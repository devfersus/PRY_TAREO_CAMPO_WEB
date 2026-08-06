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

  const onEditar = async (accion: IAccion) => {
    const accionActualizada = await getAccionPorId(accion.id);
    setAccionSeleccionada(accionActualizada);
    setPopupEditarVisible(true);
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
    },
  };
};
