import { Box, Drawer } from '@mui/material';
import { DRAWER_WIDTH, NavPage } from './constants';
import NavDrawer from './NavDrawer';

interface IMainMenuProps {
  id: NavPage;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainMenu({ id, mobileOpen, setMobileOpen }: IMainMenuProps) {
  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      {/* xs+ (celular) */}
      <Drawer
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(!mobileOpen)}
        ModalProps={{ keepMounted: true }}
      >
        <NavDrawer id={id} />
      </Drawer>
      {/* md+ (tablet, pc, etc) */}
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
        variant="permanent"
        open
      >
        <NavDrawer id={id} />
      </Drawer>
    </Box>
  );
}
