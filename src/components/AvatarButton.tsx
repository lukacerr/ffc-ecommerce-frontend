import { useUsuarioStore } from '@/stores/usuario.store';
import { AccountCircle } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AvatarButton() {
  const navigate = useNavigate();
  const u = useUsuarioStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
        <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} disabled>
          {u.nombreUsuario}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => [handleClose(), u.logout(navigate)]}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
}
