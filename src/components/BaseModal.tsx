import { Modal, Box, ModalProps, SxProps } from '@mui/material';
import React from 'react';

export interface IBaseModal extends ModalProps {
  boxSx?: SxProps;
}

export default function BaseModal({ children, boxSx, open, ...props }: React.PropsWithChildren<IBaseModal>) {
  return (
    <Modal open={open} disableAutoFocus {...props}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper',
          width: { xs: '100%', md: '62.5%', xl: '37.5%' },
          height: { xs: '100%', md: 'auto' },
          maxHeight: { xs: '100vh', md: '80vh' },
          overflowY: 'auto',
          mx: 'auto',
          my: 'auto',
          p: 4,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          ...boxSx,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
