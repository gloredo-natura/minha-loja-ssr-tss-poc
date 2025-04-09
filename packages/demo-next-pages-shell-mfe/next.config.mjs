// packages/demo-next-pages-shell-mfe/next.config.mjs
// Usando ESM (.mjs) e estrutura de função para remotes

// Importa o plugin usando import
import NextFederationPlugin from '@module-federation/nextjs-mf';

// Define constantes para os remotes
const REMOTE_APP_NAME = 'demo_next_pages_module_mfe';
const REMOTE_APP_PORT = 3002;
const REMOTE_APP_URL = `http://localhost:${REMOTE_APP_PORT}`;

// Função para gerar o objeto 'remotes' dinamicamente
const createRemotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    [REMOTE_APP_NAME]: `${REMOTE_APP_NAME}@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`,
    // Adicione outros remotes aqui se necessário
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'demo_next_pages_shell_mfe', // Nome do shell
        filename: 'static/chunks/remoteEntry.js',
        remotes: createRemotes(isServer), // Usa a função para definir remotes
        exposes: {},
        shared: {
          '@emotion/react': { 
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          debugger: true, // Descomente para debug
        },
      }),
    );

    return config;
  },
};

// Exporta usando export default
export default nextConfig;