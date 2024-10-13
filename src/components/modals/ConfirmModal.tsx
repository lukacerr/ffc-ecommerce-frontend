import { Typography, Box, Button } from '@mui/material';
import BaseModal, { IBaseModal } from './BaseModal';
import { IUseConfirmModal } from '@/hooks/useConfirmModal.hook';
import { LoadingButton } from '@mui/lab';

export interface IConfirmModal<T> extends Partial<IBaseModal> {
  handler: IUseConfirmModal<T>;
  headline?: React.ReactNode;
  subtitle?: React.ReactNode;
  confirmText?: string;
  confirmationColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  cancelColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export default function ConfirmModal<T>({
  handler,
  headline = '¿Estás seguro que deseas realizar esta acción?',
  confirmText = 'Confirmar',
  subtitle = 'Esta acción no se puede deshacer.',
  confirmationColor = 'success',
  cancelColor = 'primary',
  ...props
}: IConfirmModal<T>) {
  return (
    <BaseModal open={handler.open} {...props}>
      <>
        <Typography variant="h6">{headline}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
        <Box gap={4} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Button disabled={handler.loading} variant="outlined" color={cancelColor} onClick={handler.close} fullWidth>
            Cancelar
          </Button>
          <LoadingButton
            loading={handler.loading}
            variant="contained"
            color={confirmationColor}
            onClick={() => handler.onConfirm()}
            fullWidth
          >
            {confirmText}
          </LoadingButton>
        </Box>
      </>
    </BaseModal>
  );
}
