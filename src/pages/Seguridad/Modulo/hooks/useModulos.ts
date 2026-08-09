import { use, useState } from 'react';
import type { IModulo } from '../interface/IModulo.interface';
import { getModuloAll, getModuloPorId } from '../api/getModulos.action';

export const useModulos = (getModulo: Promise<IModulo[]>) => {

  const initialModulos = use(getModulo);
  const [modulos, setModulos] = useState<IModulo[]>(initialModulos);

  // --- Popup agregar ---
  const [popupVisible, setPopupVisible] = useState(false);
  const abrirPopup = () => setPopupVisible(true);
  const cerrarPopup = () => setPopupVisible(false);

  const recargarLista = async () => {
    const lista = await getModuloAll();
    setModulos(lista);
  };

  const onModuloAgregado = async (_nuevo: IModulo) => {
    await recargarLista();
    cerrarPopup();
  };

  // --- Popup editar ---
  const [moduloSeleccionado, setModuloSeleccionado] = useState<IModulo | null>(null);
  const [popupEditarVisible, setPopupEditarVisible] = useState(false);
  const [cargandoEditar,     setCargandoEditar]     = useState(false);
  const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

  const onEditar = async (modulo: IModulo) => {
    setCargandoEditar(true);
    setErrorEditar(null);
    try {
      const moduloActualizado = await getModuloPorId(modulo.id);
      setModuloSeleccionado(moduloActualizado);
      setPopupEditarVisible(true);
    } catch {
      setErrorEditar('No se pudo cargar el módulo para editar.');
    } finally {
      setCargandoEditar(false);
    }
  };

  const cerrarPopupEditar = () => setPopupEditarVisible(false);

  const onModuloActualizado = async (_actualizado: IModulo) => {
    await recargarLista();
    cerrarPopupEditar();
  };

  return {
    lista: {
      modulos,
    },
    popupAgregar: {
      visible:   popupVisible,
      abrir:     abrirPopup,
      cerrar:    cerrarPopup,
      onGuardar: onModuloAgregado,
    },
    popupEditar: {
      visible:      popupEditarVisible,
      abrir:        onEditar,
      cerrar:       cerrarPopupEditar,
      seleccionado: moduloSeleccionado,
      onGuardar:    onModuloActualizado,
      cargando:     cargandoEditar,
      error:        errorEditar,
      cerrarError:  () => setErrorEditar(null),
    },
  };
};
