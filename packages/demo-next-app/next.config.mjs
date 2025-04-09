// packages/demo-next-app/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpilar a lib local e seus temas é necessário
  transpilePackages: [
    '@meu-monorepo/button',
    '@naturacosmeticos/natds-themes', // Adicione se a lib button importar diretamente daqui
  ],
};

export default nextConfig;