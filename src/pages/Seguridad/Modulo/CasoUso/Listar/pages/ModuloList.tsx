import { type IModuloListar } from "../interface/IModuloListar.interface";

interface Props {
  modulos: IModuloListar[];
}

export const ModuloLista = ({ modulos }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {modulos.map((modulo) => (
        <div key={modulo.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold" >{modulo.id}</h2>
          <p className="text-gray-700">{modulo.descripcion}</p>
          <p className="text-gray-700">{modulo.activo}</p>
        </div>
      ))}
    </div>
  );
};