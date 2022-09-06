import linariaRoot from '@linaria/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

//
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const linaria = linariaRoot.default;

const isDevelopment = process.env.NODE_ENV !== 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), linaria({ sourceMap: isDevelopment })],
});
