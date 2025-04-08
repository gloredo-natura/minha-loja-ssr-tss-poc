// packages/demo-next-final/pages/_app.tsx
import type { AppProps, AppType } from 'next/app';
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

// Importa da sua biblioteca local
import { ThemeProvider, buildTheme } from '@meu-monorepo/button';

// Importa os estilos globais
import '../styles/globals.css';

// --- Configuração do TSS Helper ---
const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ key: "css" });

export { augmentDocumentWithEmotionCache };

// --- Componente App Customizado ---
const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  // Cria tema padrão (pode vir de contexto/config no futuro)
  const defaultTheme = buildTheme("natura", "light");

  return (
    // Aplica o ThemeProvider da sua biblioteca
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// --- Exportação Padrão ---
// Envolve o App customizado com o HOC do TSS para o Cache Provider
export default withAppEmotionCache(MyApp);