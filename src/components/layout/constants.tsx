import { Dashboard, ShoppingCart } from '@mui/icons-material';

export const DRAWER_WIDTH = 240;

export enum NavPage {
  DASHBOARD = 'Analítica',
  PRODUCTS = 'Productos',
}

export const NAVBAR = [
  { path: '/', title: NavPage.DASHBOARD, icon: <Dashboard /> },
  { path: '/productos', title: NavPage.PRODUCTS, icon: <ShoppingCart /> },
];
