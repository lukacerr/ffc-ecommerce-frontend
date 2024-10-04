import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';
import { PlusOne } from '@mui/icons-material';
import { Chip, Divider, Paper, Skeleton, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

function Dial() {
  return (
    <SpeedDial
      ariaLabel="Acciones generales"
      sx={{ position: 'absolute', bottom: 16, right: 16, p: { xs: 0, sm: 2, lg: 4 } }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction key={'plus-one'} icon={<PlusOne />} tooltipTitle={'Crear nuevo'} />
    </SpeedDial>
  );
}
function Filters() {
  return <Paper sx={{ p: 4 }}>SECCIÓN CON FILTROS</Paper>;
}

function MainTable({ loading = true }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      {loading ? <Skeleton variant="rounded" height={480} /> : <span>hola!</span>}
    </Paper>
  );
}

export default function ProductosPage() {
  return (
    <Layout id={NavPage.PRODUCTS} header="Gestión de productos" metadata={{ title: 'Productos' }}>
      <Filters />
      <Divider sx={{ py: 4 }}>
        <Chip label="23 resultados" size="small" color="success" />
      </Divider>
      <MainTable />
      <Dial />
    </Layout>
  );
}
