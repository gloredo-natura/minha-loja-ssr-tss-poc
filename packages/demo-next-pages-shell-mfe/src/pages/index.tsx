// packages/demo-next-pages-shell-mfe/src/pages/index.tsx
import React, { Suspense, lazy } from 'react'; // Importa Suspense e lazy
import Head from 'next/head';

// --- Imports de Tipos/Utils da Lib local (NÃO o componente Button) ---
import type {
  BrandTypes, ThemeMode, ButtonProps, ButtonVariant, ButtonColor, ButtonSize
} from "@meu-monorepo/button";

// --- Imports de bibliotecas externas ---
import themes from "@naturacosmeticos/natds-themes";
import type { IconName } from "@naturacosmeticos/natds-icons"; // Importa tipo

// --- Import Dinâmico do Button REMOTO com React.lazy ---
// A string 'demo_next_pages_module_mfe/Button' DEVE corresponder ao remote e ao alias exposto
const RemoteButton = lazy(() => import('demo_next_pages_module_mfe/RemoteButton'));

// --- Funções Auxiliares e Constantes (Definidas no escopo do módulo) ---
interface ThemeOption { brand: BrandTypes; mode: ThemeMode; }
const validBrandTypes = new Set<string>(["aesop", "avon", "avon_v2", "natura", "theBodyShop", "consultoriaDeBeleza", "forcaDeVendas", "natura_v2", "natura_v3", "casaEestilo", "casaEestilo_v2"]);
const isValidBrandType = (brand: string | BrandTypes): brand is BrandTypes => { return validBrandTypes.has(brand as string); };
const getAllThemes = (): ThemeOption[] => {
  const allThemes: ThemeOption[] = [];
  (Object.keys(themes) as string[]).filter((brandKey) => brandKey !== "natdsTest" && isValidBrandType(brandKey)).forEach((brandKey) => {
    const brand = brandKey as BrandTypes; const brandThemes = themes[brand as keyof typeof themes];
    if (brandThemes && typeof brandThemes === "object") {
      (Object.keys(brandThemes) as ThemeMode[]).forEach((mode) => { const modeTheme = brandThemes[mode as keyof typeof brandThemes]; if (modeTheme) { allThemes.push({ brand, mode }); } });
    }
  }); return allThemes;
};
const availableThemes = getAllThemes(); // Inicializa aqui
const buttonVariants: ButtonVariant[] = ["contained", "outlined", "text"];
const buttonColors: ButtonColor[] = ["primary", "onPrimary", "secondary", "onSecondary", "surfaceInverse", "onSurfaceInverse"];
const buttonSizes: ButtonSize[] = ["semi", "semiX", "medium"];
const buttonTextTransforms: Array<ButtonProps["textTransform"]> = ["uppercase", "lowercase", "capitalize"];

// --- Componente Auxiliar ThemeOverrideDisplay ---
interface ThemeOverrideProps { themeOption: ThemeOption; children: React.ReactNode; }
const ThemeOverrideDisplay: React.FC<ThemeOverrideProps> = ({ themeOption, children }) => {
  const containerClasses = `theme-override-item ${themeOption.mode === "dark" ? "dark-mode-background" : ""}`;
  return (<div className={containerClasses}><h4>Tema por Props: <code>{themeOption.brand}</code> / <code>{themeOption.mode}</code></h4>{children}</div>);
};

// --- Componente da Página Principal ---
export default function HomePage() {
  const handleButtonClick = (label: string) => { console.log(`Botão "${label}" clicado!`); };
  // Define um componente/elemento de fallback para o Suspense
  const buttonFallback = <button disabled style={{ opacity: 0.5, margin: '4px', padding: '8px 12px', border: '1px dashed grey' }}>Carregando...</button>;

  return (
    <>
      <Head>
        <title>Shell MFE - Button Remoto (Lazy)</title>
      </Head>
      <h1>Next.js Pages Router + Module Federation</h1>
      <main>
        <section className="component-section">
          <h2>Botões (Button - Remoto)</h2>
          <h3 className="section-subtitle">Variações com Tema Padrão (do Provider)</h3>
          <div className="component-group">
            {/* Envolve CADA uso do RemoteButton com Suspense */}
            <Suspense fallback={buttonFallback}>
              <RemoteButton onClick={() => handleButtonClick("Provider Primary Contained")} color="primary" variant="contained">Primary Contained</RemoteButton>
            </Suspense>
            <Suspense fallback={buttonFallback}>
              <RemoteButton onClick={() => handleButtonClick("Provider Secondary Outlined")} color="secondary" variant="outlined">Secondary Outlined</RemoteButton>
            </Suspense>
            <Suspense fallback={buttonFallback}>
              <RemoteButton onClick={() => handleButtonClick("Provider Text Disabled")} color="primary" variant="text" disabled>Text Disabled</RemoteButton>
            </Suspense>
            <Suspense fallback={buttonFallback}>
              <RemoteButton onClick={() => handleButtonClick("Provider Medium Size")} color="primary" variant="contained" size="medium">Medium Size</RemoteButton>
            </Suspense>
            <Suspense fallback={buttonFallback}>
              <RemoteButton onClick={() => handleButtonClick("Provider Contained c/ Ícone")} color="primary" variant="contained" showIcon iconName={"outlined-default-mockup" as IconName}>Contained c/ Ícone</RemoteButton>
            </Suspense>
          </div>

          <div className="theme-override-section">
            <h3 className="section-subtitle">Variações Completas com Overrides por Props (`brand`/`mode`)</h3>
            {availableThemes.map((themeOpt) => ( // themeOpt deve ter tipo inferido corretamente agora
              <ThemeOverrideDisplay key={`${themeOpt.brand}-${themeOpt.mode}`} themeOption={themeOpt}>
                {buttonVariants.map((variant) => (
                  <React.Fragment key={variant}>
                    <h4 className="variant-title">Variante: <code>{variant}</code></h4>
                    {/* Cores */}
                    <h5 className="variation-title">Cores</h5>
                    <div className="component-group">
                      {buttonColors.map((color) => (
                        <Suspense key={`${variant}-${color}-enabled-s`} fallback={buttonFallback}>
                          <RemoteButton key={`${variant}-${color}-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} ${color}`)} variant={variant} color={color} brand={themeOpt.brand} mode={themeOpt.mode} size="semiX">{color}</RemoteButton>
                        </Suspense>
                      ))}
                      <span className="variation-separator">| Disabled:</span>
                      {buttonColors.map((color) => (
                        <Suspense key={`${variant}-${color}-disabled-s`} fallback={buttonFallback}>
                          <RemoteButton key={`${variant}-${color}-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} ${color} Disabled`)} variant={variant} color={color} brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" disabled>{color}</RemoteButton>
                        </Suspense>
                      ))}
                    </div>
                    {/* Tamanhos */}
                    <h5 className="variation-title">Tamanhos (Cor: Primary)</h5>
                    <div className="component-group">
                      {buttonSizes.map((size) => (
                        <Suspense key={`${variant}-primary-${size}-s`} fallback={buttonFallback}>
                          <RemoteButton key={`${variant}-primary-${size}`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${size}`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size={size}>{size}</RemoteButton>
                        </Suspense>
                      ))}
                    </div>
                    {/* Com Ícone */}
                    <h5 className="variation-title">Com Ícone</h5>
                    <div className="component-group">
                      <Suspense fallback={buttonFallback}><RemoteButton key={`${variant}-primary-icon-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-action-love" as IconName}>Primary</RemoteButton></Suspense>
                      <Suspense fallback={buttonFallback}><RemoteButton key={`${variant}-primary-icon-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon Disabled`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-action-love" as IconName} disabled>Primary Disabled</RemoteButton></Suspense>
                      <Suspense fallback={buttonFallback}><RemoteButton key={`${variant}-secondary-icon-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon`)} variant={variant} color="secondary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-navigation-arrowright" as IconName}>Secondary</RemoteButton></Suspense>
                      <Suspense fallback={buttonFallback}><RemoteButton key={`${variant}-secondary-icon-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon Disabled`)} variant={variant} color="secondary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-navigation-arrowright" as IconName} disabled>Secondary Disabled</RemoteButton></Suspense>
                    </div>
                    {/* Text Transform */}
                    <h5 className="variation-title">Text Transform (Cor: Primary)</h5>
                    <div className="component-group">
                      {buttonTextTransforms.map((transform) => (
                        <Suspense key={`${variant}-primary-${transform}-s`} fallback={buttonFallback}>
                          <RemoteButton key={`${variant}-primary-${transform}`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${transform || 'default'}`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" textTransform={transform}>{transform || 'default'}</RemoteButton>
                        </Suspense>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </ThemeOverrideDisplay>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}