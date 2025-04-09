// packages/demo-next-app/app/layout.tsx
import type { Metadata } from "next";
import React from 'react';

// Importa o Provider específico do TSS para App Router
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

// Importa seu ThemeProvider e theme builder da biblioteca local
import { ThemeProvider, buildTheme } from '@meu-monorepo/button-with-directives';

// Importa CSS Global (assumindo que está em /styles/globals.css)
import './globals.css';

// Metadata para a página (substitui <Head> de _app/_document)
export const metadata: Metadata = {
  title: "Next App Router - Demo Completa TSS",
  description: "Demonstração completa com App Router e tss-react",
};

// Cria o tema padrão
const defaultTheme = buildTheme("natura", "light"); // Use seu tema padrão

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Adiciona links estáticos (fontes, ícones) diretamente no head */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@naturacosmeticos/natds-icons@latest/dist/natds-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* O NextAppDirEmotionCacheProvider cuidará da injeção de <style> */}
      </head>
      <body>
        {/* Provider do TSS/Emotion para App Router */}
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          {/* Seu ThemeProvider da biblioteca */}
          <ThemeProvider theme={defaultTheme}>
            {/* Conteúdo das páginas será renderizado aqui */}
            {children}
          </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}