import { useActionState } from 'react';
import { type ISubmoduloAgregar } from '../interface/ISubmoduloAgregar.interface';
import { createSubmoduloForm } from '../../../api/getSubmodulos.action';

interface Props {
  onAddSubmodulo: (submodulo: ISubmoduloAgregar) => void;
}

export const AddSubmoduloForm = ({ onAddSubmodulo }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const submodulo: ISubmoduloAgregar = await createSubmoduloForm(prevState, queryData);
      onAddSubmodulo(submodulo);
    }, null
  );

  return (
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>
      <input
        type="text"
        placeholder="moduloId (UUID)"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="moduloId"
        required
      />
      <input
        type="text"
        placeholder="descripción"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="descripcion"
        required
      />
      <input
        type="checkbox"
        placeholder="Activo"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="activo"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded flex-1 sm:flex-none"
        disabled={isPending}
      >
        Agregar Submodulo
      </button>
    </form>
  );
};