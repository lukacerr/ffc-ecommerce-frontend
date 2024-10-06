import { Typography, Box, Button } from '@mui/material';
import BaseModal, { IBaseModal } from '../BaseModal';
import Producto from '@/types/producto.class';
import { IUseConfirmModal } from '@/hooks/useConfirmModal.hook';
import { LoadingButton } from '@mui/lab';

export interface IDeleteProductModal extends Partial<IBaseModal> {
  handler: IUseConfirmModal<Producto>;
}

export default function DeleteProductModal({ handler, ...props }: IDeleteProductModal) {
  return (
    <BaseModal open={handler.open} {...props}>
      <>
        <Typography variant="h6">¿Estás seguro de que deseas borrar este producto?</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Esta acción no se puede deshacer.
        </Typography>
        <Box gap={4} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <LoadingButton
            loading={handler.loading}
            variant="contained"
            color="error"
            onClick={() => handler.onConfirm()}
            fullWidth
          >
            Borrar
          </LoadingButton>
          <Button disabled={handler.loading} variant="outlined" color="primary" onClick={handler.close} fullWidth>
            Cancelar
          </Button>
        </Box>
      </>
    </BaseModal>
  );
}
