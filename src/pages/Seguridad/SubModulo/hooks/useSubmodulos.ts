import { use, useState } from 'react';
import type { ISubmoduloListar } from '../CasoUso/Listar/interface/ISubmoduloListar.interface';
import { getSubmoduloAll, getSubmoduloPorId } from '../api/getSubmodulos.action';

export const useSubmodulos = (getSubmodulo: Promise<ISubmoduloListar[]>) => {

  const initialSubmodulos = use(getSubmodulo);
  const [submodulos, setSubmodulos] = useState<ISubmoduloListar[]>(initialSubmodulos);

  // --- Popup agregar ---
  const [popupVisible, setPopupVisible] = useState(false);
  const abrirPopup = () => setPopupVisible(true);
  const cerrarPopup = () => setPopupVisible(false);

  const recargarLista = async () => {
    const lista = await getSubmoduloAll();
    setSubmodulos(lista);
  };

  const onSubmoduloAgregado = async (_nuevo: ISubmoduloListar) => {
    await recargarLista();
    cerrarPopup();
  };

  // --- Popup editar ---
  const [submoduloSeleccionado, setSubmoduloSeleccionado] = useState<ISubmoduloListar | null>(null);
  const [popupEditarVisible,    setPopupEditarVisible]    = useState(false);
  const [cargandoEditar,        setCargandoEditar]        = useState(false);
  const [errorEditar,           setErrorEditar]           = useState<string | null>(null);

  const onEditar = async (submodulo: ISubmoduloListar) => {
    setCargandoEditar(true);
    setErrorEditar(null);
    try {
      const actualizado = await getSubmoduloPorId(submodulo.id);
      setSubmoduloSeleccionado(actualizado);
      setPopupEditarVisible(true);
    } catch {
      setErrorEditar('No se pudo cargar el submódulo para editar.');
    } finally {
      setCargandoEditar(false);
    }
  };

  const cerrarPopupEditar = () => setPopupEditarVisible(false);

  const onSubmoduloActualizado = async (_actualizado: ISubmoduloListar) => {
    await recargarLista();
    cerrarPopupEditar();
  };

  return {
    lista: {
      submodulos,
    },
    popupAgregar: {
      visible:   popupVisible,
      abrir:     abrirPopup,
      cerrar:    cerrarPopup,
      onGuardar: onSubmoduloAgregado,
    },
    popupEditar: {
      visible:      popupEditarVisible,
      abrir:        onEditar,
      cerrar:       cerrarPopupEditar,
      seleccionado: submoduloSeleccionado,
      onGuardar:    onSubmoduloActualizado,
      cargando:     cargandoEditar,
      error:        errorEditar,
      cerrarError:  () => setErrorEditar(null),
    },
  };
};
