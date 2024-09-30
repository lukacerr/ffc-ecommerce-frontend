import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: { strictPort: true, port: Number(process.env.VITE_PORT) || 3000 },
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    plugins: [react(), Pages({ extensions: ['page.tsx'] })],
  });
};
