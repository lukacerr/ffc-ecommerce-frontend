import { Box } from '@mui/material';
import AvatarButton from '../AvatarButton';
import ColorIconButton from '../ColorIconButton';

export default function SideButtons() {
  return (
    <Box display="flex" gap={{ lg: 2, sm: 1 }}>
      <AvatarButton />
      <ColorIconButton />
    </Box>
  );
}
