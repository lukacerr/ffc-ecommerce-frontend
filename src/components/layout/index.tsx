import React, { memo, useEffect, useState } from 'react';
import { Box, Container, Fade, SxProps, Theme, Toolbar } from '@mui/material';
import { DRAWER_WIDTH, NavPage } from './constants';
import Header from './Header';
import Metadata, { IMetadataProps } from './Metadata';
import { useUsuarioStore } from '@/stores/usuario.store';
import { useNavigate } from 'react-router';
import MainMenu from './MainMenu';
import Fallback from '../Fallback';
import axios from 'axios';

interface ILayoutProps {
  id: NavPage;
  header: React.ReactNode;
  metadata: IMetadataProps;
  sx?: SxProps<Theme>;
  error: Error | null;
  loading?: boolean;
}

export default memo(function Layout({
  id,
  header,
  metadata,
  children,
  sx,
  error,
  loading,
}: React.PropsWithChildren<ILayoutProps>) {
  const navigate = useNavigate();

  useEffect(() => (error ? [console.error(error), navigate('/error')][0] : undefined), [navigate, error]);

  const logout = useUsuarioStore((state) => state.logout);
  useEffect(() => {
    axios.interceptors.response.use(
      (r) => r,
      (error) => (error.response && error.response.status === 403 ? logout(navigate) : Promise.reject(error))
    );
  }, [logout, navigate]);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Metadata {...metadata} />
      <Box sx={{ display: 'flex' }}>
        <Header header={header} id={id} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <MainMenu id={id} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
          <Toolbar />
          {loading ? (
            <Fallback circular />
          ) : (
            <Fade in={true} mountOnEnter unmountOnExit>
              <Container sx={{ ...sx }}>{children}</Container>
            </Fade>
          )}
        </Box>
      </Box>
    </>
  );
});
