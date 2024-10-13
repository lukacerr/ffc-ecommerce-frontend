import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import routes from '~react-pages';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Fallback from './components/Fallback';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://ecom-back-loadbalancer-2091081332.us-east-1.elb.amazonaws.com';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

export default function App() {
  return <Suspense fallback={<Fallback />}>{useRoutes(routes)}</Suspense>;
}
