import { Container, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logoPng from '@/assets/logo.png';
import ColorIconButton from '@/components/ColorIconButton';

export default function ErrorPage() {
  return (
    <Container
      component="main"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <ColorIconButton absolute />
      <Paper sx={{ padding: 4, textAlign: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={logoPng} alt="Logo" style={{ width: 120, height: 120 }} />
          <Typography variant="h4" fontWeight={700} color="error">
            Oops! Algo salió mal.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Ha ocurrido un error inesperado. Por favor, vuelve a intentarlo más tarde.
          </Typography>
          <Link to="/" style={{ marginTop: '20px', textDecoration: 'none' }}>
            <Typography variant="button" color="primary">
              Volver al inicio
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}