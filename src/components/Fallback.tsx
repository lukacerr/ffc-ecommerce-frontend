import { Container, LinearProgress, Paper, Skeleton } from '@mui/material';

import logoPng from '@/assets/logo.png';

export default function Fallback() {
  return (
    <Container
      component="main"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: '4em',
          width: '32em',
          display: 'flex',
          gap: 4,
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Skeleton sx={{ position: 'absolute', top: '-50%' }} variant="rectangular" width={'100%'} height={'100vh'} />
        <img src={logoPng} alt="Logo" style={{ width: '8em' }} />
        <LinearProgress sx={{ width: '100%', height: '0.375em' }} />
      </Paper>
    </Container>
  );
}
