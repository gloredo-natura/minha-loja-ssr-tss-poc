// packages/demo-next-final/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
// Importa do _app.tsx
import { augmentDocumentWithEmotionCache } from './_app';

// Define Document customizado para adicionar links no Head
class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* --- Links Estáticos Globais --- */}
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
          {/* O helper do TSS injetará as tags <style> do Emotion aqui */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Aplica a lógica SSR do Emotion/TSS ao Document customizado
augmentDocumentWithEmotionCache(MyDocument);

// Exporta o Document modificado
export default MyDocument;