// packages/demo-next-final/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Necessário para compilar a lib local e temas no monorepo
  transpilePackages: [
    '@meu-monorepo/button',
    '@naturacosmeticos/natds-themes', // Adicione se necessário
  ],
};

export default nextConfig;