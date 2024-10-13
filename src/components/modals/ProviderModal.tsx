import { Box, Button, ModalProps, TextField, Typography } from '@mui/material';
import BaseModal from './BaseModal';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid2';
import Proveedor from '@/types/proveedor.interface';
import FormValidation, { Validation } from '@/utils/form-validation.utils';
import { IUseConfirmModal } from '@/hooks/useConfirmModal.hook';

export interface IProvierModal extends Partial<ModalProps> {
  handler: IUseConfirmModal<Partial<Proveedor>>;
}

export default function ProviderModal({ handler, ...props }: IProvierModal) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    validation: Validation = Validation.NONE
  ) =>
    FormValidation(validation)(e.target.value) &&
    handler.setMetadata((pv) => ({ ...pv, [e.target.id]: e.target.value }));

  return (
    <BaseModal {...props} open={handler.open}>
      <>
        <Typography variant="h6">{handler.metadata?.idProveedor ? 'Editar' : 'Crear'} proveedor</Typography>
        <Grid p={2} container spacing={2} width={'100%'} display="flex" justifyContent="center" alignItems="center">
          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              onChange={handleChange}
              label="Nombre"
              id="nombre"
              value={handler.metadata?.nombre}
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <TextField
              onChange={(e) => handleChange(e, Validation.NUMBER)}
              label="Cuit"
              id="cuit"
              value={handler.metadata?.cuit}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Box gap={4} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Button fullWidth disabled={handler.loading} onClick={handler.close} variant="outlined">
            Cancelar
          </Button>
          <LoadingButton
            disabled={!handler.metadata?.nombre || !FormValidation(Validation.CUIT)(handler.metadata?.cuit)}
            fullWidth
            variant="contained"
            color="success"
            loading={handler.loading}
            onClick={() => handler.onConfirm()}
          >
            Guardar
          </LoadingButton>
        </Box>
      </>
    </BaseModal>
  );
}
