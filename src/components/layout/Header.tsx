import { AppBar, Toolbar, IconButton, Typography, Box, Drawer } from '@mui/material';
import { DRAWER_WIDTH, NAVBAR, NavPage } from './constants';
import { Menu } from '@mui/icons-material';
import NavDrawer from './NavDrawer';
import { useState } from 'react';
import SideButtons from './SideButtons';

interface IHeaderProps {
  id: NavPage;
  header: React.ReactNode;
}

export default function Header({ id, header }: IHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const PageIcon = NAVBAR.find((v) => v.title === id)?.icon;

  return (
    <>
      <AppBar color="primary" sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" overflow="auto">
            <Typography variant="h6" fontWeight={900} pr={2} noWrap display="flex" alignItems="center" gap={1}>
              {PageIcon} {header}
            </Typography>
            <SideButtons />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          <NavDrawer id={id} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          <NavDrawer id={id} />
        </Drawer>
      </Box>
    </>
  );
}
