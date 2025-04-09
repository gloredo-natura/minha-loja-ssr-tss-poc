// packages/demo-next-pages-module-mfe/next.config.mjs
import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
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