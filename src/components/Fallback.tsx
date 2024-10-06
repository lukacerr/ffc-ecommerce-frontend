import { CircularProgress, Container, LinearProgress, Paper, Skeleton } from '@mui/material';

import logoPng from '@/assets/logo.png';

export default function Fallback({ circular = false }) {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: circular ? 'calc(100vh - 240px + 8em)' : '100vh',
        overflow: 'hidden',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: '4em',
          width: circular ? '12em' : '32em',
          display: 'flex',
          gap: 4,
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Skeleton sx={{ position: 'absolute', top: '-50%' }} variant="rectangular" width={'100%'} height={'100vh'} />
        {circular ? (
          <CircularProgress size={'4em'} />
        ) : (
          <>
            <img src={logoPng} alt="Logo" style={{ width: '8em' }} />
            <LinearProgress sx={{ width: '100%', height: '0.375em' }} />
          </>
        )}
      </Paper>
    </Container>
  );
}
