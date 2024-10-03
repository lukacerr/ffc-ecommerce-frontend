import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';
import { NAVBAR, NavPage } from './constants';
import logoPng from '@/assets/logo.png';

export default function NavDrawer({ id }: React.PropsWithoutRef<{ id: NavPage }>) {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <img src={logoPng} alt="Logo" style={{ width: 90, height: 90 }} />
      </Toolbar>
      <Divider />
      <List>
        {NAVBAR.map((v) => (
          <ListItemButton selected={v.title === id} key={v.path} onClick={() => navigate(v.path)}>
            <ListItemIcon>{v.icon}</ListItemIcon>
            <ListItemText primary={v.title} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
