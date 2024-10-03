import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';

export default function IndexPage() {
  return (
    <Layout id={NavPage.DASHBOARD} header="Balances y analítica" metadata={{ title: 'Analítica' }}>
      <span>Acá va la sección de analítica</span>
    </Layout>
  );
}
