import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';

export default function ProductosPage() {
  return (
    <Layout id={NavPage.PRODUCTS} header="Gestión de productos" metadata={{ title: 'Productos' }}>
      <span>Acá va la sección de gestión de productos</span>
    </Layout>
  );
}
