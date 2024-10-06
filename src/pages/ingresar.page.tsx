import { useState } from 'react';
import { TextField, Typography, Paper, Container, Box, Alert, InputAdornment, IconButton, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { useUsuarioStore } from '@/stores/usuario.store';
import logoPng from '@/assets/logo.png';
import useHandler from '@/hooks/useHandler.hook';
import ColorIconButton from '@/components/ColorIconButton';
import { LockOutlined, MailOutline, Visibility, VisibilityOff } from '@mui/icons-material';

export default function IngresarPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = useUsuarioStore((state) => state.login);
  const navigate = useNavigate();
  const { submit, error, loading } = useHandler(() => login(email, password, navigate));

  return (
    <Fade in={true}>
      <Container
        component="main"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
      >
        <ColorIconButton absolute />
        <Paper sx={{ padding: 4 }}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <img src={logoPng} alt="Logo" style={{ width: 120, height: 120 }} />
            <Typography variant="h4" fontWeight={700} align="center">
              E-Commerce
            </Typography>
          </Box>
          <form onSubmit={submit}>
            <TextField
              required
              label="Correo Electrónico"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline color="success" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              required
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="success" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="success" onClick={() => setShowPassword((v) => !v)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <LoadingButton loading={loading} type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Iniciar Sesión
            </LoadingButton>
          </form>
          {error && (
            <Alert sx={{ mt: 2 }} severity="error">
              Ocurrió un error. Por favor vuelva a intentarlo.
            </Alert>
          )}
        </Paper>
      </Container>
    </Fade>
  );
}
