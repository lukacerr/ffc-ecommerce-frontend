import React, { useEffect, useState } from 'react';
import { Box, Container, Fade, SxProps, Theme, Toolbar } from '@mui/material';
import { DRAWER_WIDTH, NavPage } from './constants';
import Header from './Header';
import Metadata, { IMetadataProps } from './Metadata';
import { useUserStore } from '@/stores/user.store';
import { useNavigate } from 'react-router';
import MainMenu from './MainMenu';

interface ILayoutProps {
  id: NavPage;
  header: React.ReactNode;
  metadata: IMetadataProps;
  sx?: SxProps<Theme>;
}

export default function Layout({ id, header, metadata, children, sx }: React.PropsWithChildren<ILayoutProps>) {
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => (!token ? navigate('/ingresar') : undefined), [navigate, token]);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Metadata {...metadata} />
      <Box sx={{ display: 'flex' }}>
        <Header header={header} id={id} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <MainMenu id={id} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
          <Toolbar />
          <Fade in={true} mountOnEnter unmountOnExit>
            <Container sx={{ ...sx }}>{children}</Container>
          </Fade>
        </Box>
      </Box>
    </>
  );
}
