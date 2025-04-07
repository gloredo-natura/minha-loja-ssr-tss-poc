// packages/demo-vite/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react() // Plugin principal para aplicações React
  ],
  // Opcional, mas recomendado para monorepos:
  // Ajuda o Vite a lidar melhor com a dependência local linkada (workspace:*)
  optimizeDeps: {
    include: [
      // Inclui explicitamente a biblioteca local para pré-bundle
      '@meu-monorepo/button',
      // Pode ser necessário incluir dependências da sua lib aqui também,
      // por exemplo, 'tss-react/mui' se causar problemas
      // 'tss-react/mui'
    ],
  },
  // Opcional: Pode ser necessário se a lib ou suas dependências usarem CJS
  // ou acessarem variáveis como process.env
  build: {
    commonjsOptions: {
      include: [/@meu-monorepo\/button/, /node_modules/],
    },
  },
  // Opcional: Se precisar de um proxy para API, etc.
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000'
  //   }
  // }
})