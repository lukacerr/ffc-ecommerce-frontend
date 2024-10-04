import { useUserStore } from '@/stores/user.store';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AvatarButton() {
  const navigate = useNavigate();
  const u = useUserStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // TODO: Llenar con más data del user u

  return (
    <div>
      <IconButton onClick={handleMenu} children={<AccountCircle />}></IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
      >
        <MenuItem onClick={() => [handleClose(), u.logout(navigate)]}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
}
