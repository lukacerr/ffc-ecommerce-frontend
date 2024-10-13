import { IUseConfirmModal } from '@/hooks/useConfirmModal.hook';
import ConfirmModal from './ConfirmModal';
import { IBaseModal } from './BaseModal';
import Proveedor from '@/types/proveedor.interface';

export interface IDeleteProviderModal extends Partial<IBaseModal> {
  handler: IUseConfirmModal<Partial<Proveedor>>;
}

export default function DeleteProviderModal({ handler, ...props }: IDeleteProviderModal) {
  return (
    <ConfirmModal
      handler={handler}
      headline="¿Estás seguro que deseas borrar este proveedor?"
      confirmText="Borrar"
      confirmationColor="error"
      {...props}
    />
  );
}
