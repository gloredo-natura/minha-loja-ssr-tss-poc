// packages/button/vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json'; // Para ler peerDependencies

export default defineConfig({
  plugins: [
    react(), // Processa JSX, etc.
    dts({ // Gera arquivos .d.ts automaticamente
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true, // Recomendado para debug da lib
    // Configuração ESSENCIAL para modo biblioteca:
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Ponto de entrada da lib
      name: 'MeuMonorepoButton', // Nome global para UMD
      formats: ['es', 'umd'], // Formatos de saída
      fileName: (format) => `button.${format === 'umd' ? 'umd.cjs' : 'js'}`, // Nomenclatura dos arquivos
    },
    // Configuração ESSENCIAL para externalizar dependências:
    rollupOptions: {
      // Não empacota as peerDependencies (React, etc.)
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        // Mapeia as dependências externalizadas para globais no formato UMD
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          // Adicione outros peer deps aqui se tiver
        },
      },
    },
  },
});