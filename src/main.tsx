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

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

export default function App() {
  return <Suspense fallback={<Fallback />}>{useRoutes(routes)}</Suspense>;
}
