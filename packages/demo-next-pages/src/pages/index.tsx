// packages/demo-next-final/pages/index.tsx
import React from 'react';
import Head from 'next/head';

// --- Imports da SUA biblioteca ---
import {
  Button,
  // buildTheme, // Não precisa mais importar aqui, está em _app
  BrandTypes,
  ThemeMode,
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from "@meu-monorepo/button";

// --- Imports de bibliotecas externas ---
import themes from "@naturacosmeticos/natds-themes";
import { IconName } from "@naturacosmeticos/natds-icons";

// --- Funções Auxiliares e Constantes ---
interface ThemeOption { brand: BrandTypes; mode: ThemeMode; }
const validBrandTypes = new Set<string>(["aesop", "avon", "avon_v2", "natura", "theBodyShop", "consultoriaDeBeleza", "forcaDeVendas", "natura_v2", "natura_v3", "casaEestilo", "casaEestilo_v2"]);
const isValidBrandType = (brand: string | BrandTypes): brand is BrandTypes => { return validBrandTypes.has(brand as string); };
const getAllThemes = (): ThemeOption[] => {
  const allThemes: ThemeOption[] = [];
  (Object.keys(themes) as string[])
    .filter((brandKey) => brandKey !== "natdsTest" && isValidBrandType(brandKey))
    .forEach((brandKey) => {
      const brand = brandKey as BrandTypes;
      const brandThemes = themes[brand as keyof typeof themes];
      if (brandThemes && typeof brandThemes === "object") {
        (Object.keys(brandThemes) as ThemeMode[]).forEach((mode) => {
          const modeTheme = brandThemes[mode as keyof typeof brandThemes];
          if (modeTheme) { allThemes.push({ brand, mode }); }
        });
      }
    });
  return allThemes;
};
const availableThemes = getAllThemes();
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

  return (
    <>
      <Head>
        <title>Next.js Pages - Demo Completa TSS</title>
      </Head>

      <h1>Demonstração Visual - Botões - Next.js Pages Router</h1>

      <main>
        <section className="component-section">
          <h2>Botões (Button)</h2>
          <h3 className="section-subtitle">Variações com Tema Padrão (do Provider)</h3>
          <div className="component-group">
             <Button onClick={() => handleButtonClick("Provider Primary Contained")} color="primary" variant="contained">Primary Contained</Button>
             <Button onClick={() => handleButtonClick("Provider Secondary Outlined")} color="secondary" variant="outlined">Secondary Outlined</Button>
             <Button onClick={() => handleButtonClick("Provider Text Disabled")} color="primary" variant="text" disabled>Text Disabled</Button>
             <Button onClick={() => handleButtonClick("Provider Medium Size")} color="primary" variant="contained" size="medium">Medium Size</Button>
             <Button onClick={() => handleButtonClick("Provider Contained c/ Ícone")} color="primary" variant="contained" showIcon iconName={"outlined-default-mockup" as IconName}>Contained c/ Ícone</Button>
          </div>
          <div className="theme-override-section">
            <h3 className="section-subtitle">Variações Completas com Overrides por Props (`brand`/`mode`)</h3>
            {availableThemes.map((themeOpt) => (
              <ThemeOverrideDisplay key={`${themeOpt.brand}-${themeOpt.mode}`} themeOption={themeOpt}>
                {buttonVariants.map((variant) => (
                  <React.Fragment key={variant}>
                    <h4 className="variant-title">Variante: <code>{variant}</code></h4>
                    {/* Cores */}
                     <h5 className="variation-title">Cores</h5>
                     <div className="component-group">
                        {buttonColors.map((color) => (<Button key={`${variant}-${color}-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} ${color}`)} variant={variant} color={color} brand={themeOpt.brand} mode={themeOpt.mode} size="semiX">{color}</Button>))}
                        <span className="variation-separator">| Disabled:</span>
                        {buttonColors.map((color) => (<Button key={`${variant}-${color}-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} ${color} Disabled`)} variant={variant} color={color} brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" disabled>{color}</Button>))}
                     </div>
                     {/* Tamanhos */}
                      <h5 className="variation-title">Tamanhos (Cor: Primary)</h5>
                      <div className="component-group">
                        {buttonSizes.map((size) => (<Button key={`${variant}-primary-${size}`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${size}`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size={size}>{size}</Button>))}
                      </div>
                      {/* Com Ícone */}
                      <h5 className="variation-title">Com Ícone</h5>
                      <div className="component-group">
                         <Button key={`${variant}-primary-icon-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-action-love" as IconName}>Primary</Button>
                         <Button key={`${variant}-primary-icon-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon Disabled`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-action-love" as IconName} disabled>Primary Disabled</Button>
                         <Button key={`${variant}-secondary-icon-enabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon`)} variant={variant} color="secondary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-navigation-arrowright" as IconName}>Secondary</Button>
                         <Button key={`${variant}-secondary-icon-disabled`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon Disabled`)} variant={variant} color="secondary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" showIcon iconName={"filled-navigation-arrowright" as IconName} disabled>Secondary Disabled</Button>
                      </div>
                      {/* Text Transform */}
                      <h5 className="variation-title">Text Transform (Cor: Primary)</h5>
                      <div className="component-group">
                         {buttonTextTransforms.map((transform) => (<Button key={`${variant}-primary-${transform}`} onClick={() => handleButtonClick(`${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${transform || 'default'}`)} variant={variant} color="primary" brand={themeOpt.brand} mode={themeOpt.mode} size="semiX" textTransform={transform}>{transform || 'default'}</Button>))}
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