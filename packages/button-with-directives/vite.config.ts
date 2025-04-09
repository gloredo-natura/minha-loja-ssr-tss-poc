// packages/button/vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives'; // Importa o plugin
import * as packageJson from './package.json'; // Para ler peerDependencies

export default defineConfig({
  plugins: [ // Plugins principais do Vite
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
      formats: ['es'], // Formatos de saída
      // Nomenclatura dos arquivos de bundle
      fileName: () => `button-with-directives.js`,
    },
    // Configuração ESSENCIAL para externalizar dependências:
    rollupOptions: { // Opções específicas do Rollup
      // Não empacota as peerDependencies (React, etc.)
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        preserveModules: true,
        inlineDynamicImports: false,
        // Mapeia as dependências externalizadas para globais no formato UMD
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          // Adicione outros peer deps aqui se tiver
        },
        // Sem a opção 'banner' conforme solicitado
      },
      plugins: [ // Plugins específicos do Rollup
        // Adiciona o plugin preserveDirectives aqui
        preserveDirectives(),
      ],
    },
  },
});