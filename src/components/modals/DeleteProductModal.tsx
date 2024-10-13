import { IBaseModal } from './BaseModal';
import Producto from '@/types/producto.class';
import { IUseConfirmModal } from '@/hooks/useConfirmModal.hook';
import ConfirmModal from './ConfirmModal';

export interface IDeleteProductModal extends Partial<IBaseModal> {
  handler: IUseConfirmModal<Partial<Producto>>;
}

export default function DeleteProductModal({ handler, ...props }: IDeleteProductModal) {
  return (
    <ConfirmModal
      handler={handler}
      headline="¿Estás seguro que deseas borrar este producto?"
      confirmText="Borrar"
      confirmationColor="error"
      {...props}
    />
  );
}
