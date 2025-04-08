// packages/demo-next-pages-module-mfe/next.config.mjs
import NextFederationPlugin from '@module-federation/nextjs-mf';

const MFE_PORT = 3001; // Porta para este MFE

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        // Nome único global para este remote (use underscores)
        name: 'demo_next_pages_module_mfe',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {},
        exposes: {
          // Alias de import -> Caminho do arquivo
          './RemoteButton': './components/RemoteButton.tsx',
        },
        shared: {
          '@emotion/react': { 
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: { debugger: true },
      })
    );
    return config;
  },
};
export default nextConfig;