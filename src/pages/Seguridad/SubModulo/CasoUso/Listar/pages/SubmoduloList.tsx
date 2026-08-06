import { type ISubmoduloListar } from "../interface/ISubmoduloListar.interface";

interface Props {
  submodulos: ISubmoduloListar[];
}

export const SubmoduloLista = ({ submodulos }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {submodulos.map((submodulo) => (
        <div key={submodulo.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{submodulo.id}</h2>
          <p className="text-gray-700">{submodulo.descripcion}</p>
          <p className="text-gray-700">{submodulo.activo}</p>
        </div>
      ))}
    </div>
  );
};