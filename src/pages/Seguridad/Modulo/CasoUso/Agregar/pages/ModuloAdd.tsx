import { useActionState } from 'react';
import { type IModuloAgregar } from '../interface/IModuloAgregar.interface';
import { createModuloForm } from '../../../api/getModulos.action';

interface Props {
  onAddModulo: (modulo: IModuloAgregar) => void;
}

export const AddModuloForm = ({ onAddModulo }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const modulo: IModuloAgregar = await createModuloForm(prevState, queryData);
      onAddModulo(modulo);
    }, null
  );

  return (
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>
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
        Agregar Modulo
      </button>
    </form>
  );
};