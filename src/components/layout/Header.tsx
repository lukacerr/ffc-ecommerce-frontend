import { AppBar, Toolbar, IconButton, Typography, Box, Slide } from '@mui/material';
import { DRAWER_WIDTH, NAVBAR, NavPage } from './constants';
import { Menu } from '@mui/icons-material';
import SideButtons from './SideButtons';
import { useMemo } from 'react';

interface IHeaderProps {
  id: NavPage;
  header: React.ReactNode;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ id, header, mobileOpen, setMobileOpen }: IHeaderProps) {
  const PageIcon = useMemo(() => NAVBAR.find((v) => v.title === id)?.icon, [id]);

  return (
    <AppBar sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
      <Toolbar>
        <IconButton
          children={<Menu />}
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ mr: 2, display: { sm: 'none' } }}
        />
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" overflow="auto">
          <Slide in={true} unmountOnExit>
            <Typography variant="h6" fontWeight={900} pr={2} noWrap display="flex" alignItems="center" gap={1}>
              {PageIcon} {header}
            </Typography>
          </Slide>
          <SideButtons />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
