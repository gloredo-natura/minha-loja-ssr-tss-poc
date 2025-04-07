// packages/demo-vite/src/dev.tsx
import React from "react";
import ReactDOM from "react-dom/client";

// --- Imports da SUA biblioteca ---
// Certifique-se que TODOS estes são exportados de 'packages/button/src/index.ts'
import {
  ThemeProvider,
  buildTheme,
  Button,
  BrandTypes, // Necessário exportar da lib
  ThemeMode,  // Necessário exportar da lib
  ButtonProps,
  ButtonVariant,
  ButtonColor, // Exporte se for um tipo específico, senão pode definir como string literal
  ButtonSize,  // Exporte se for um tipo específico, senão pode definir como string literal
  // Brand,    // Importe 'Brand' se precisar dele diretamente
} from "@meu-monorepo/button"; // Importa do pacote da biblioteca local

// --- Imports de bibliotecas externas ---
import themes from "@naturacosmeticos/natds-themes";
// Importa o tipo IconName para usar na prop iconName do Button
import { IconName } from "@naturacosmeticos/natds-icons";

// --- Helper para obter todos os temas ---
interface ThemeOption {
  brand: BrandTypes;
  mode: ThemeMode;
}

// Define as marcas válidas que o componente Button aceita (baseado no código anterior)
// Mantenha esta lista sincronizada com as BrandTypes suportadas pelo seu buildTheme/componente
const validBrandTypes = new Set<string>([
  "aesop", "avon", "avon_v2", "natura", "theBodyShop",
  "consultoriaDeBeleza", "forcaDeVendas", "natura_v2", "natura_v3",
  "casaEestilo", "casaEestilo_v2",
]);

// Função para verificar se uma string é uma BrandType válida
const isValidBrandType = (brand: string | BrandTypes): brand is BrandTypes => {
  // A implementação exata pode variar se BrandTypes for mais complexo que string
  return validBrandTypes.has(brand as string);
};

// Função para gerar a lista de opções de tema (brand/mode) válidas
const getAllThemes = (): ThemeOption[] => {
  const allThemes: ThemeOption[] = [];
  (Object.keys(themes) as string[]) // Itera sobre as chaves como string
    .filter(
      (brandKey) => brandKey !== "natdsTest" && isValidBrandType(brandKey)
    )
    .forEach((brandKey) => {
      const brand = brandKey as BrandTypes; // Cast seguro após validação
      const brandThemes = themes[brand as keyof typeof themes]; // Acesso seguro ao objeto de temas
      if (brandThemes && typeof brandThemes === "object") {
        (Object.keys(brandThemes) as ThemeMode[]).forEach((mode) => {
          const modeTheme = brandThemes[mode as keyof typeof brandThemes];
          if (modeTheme) {
            allThemes.push({ brand, mode });
          }
        });
      }
    });
  return allThemes;
};

// Obtém a lista de temas disponíveis para iterar na UI
const availableThemes = getAllThemes();

// --- Listas de Variações para Iterar (Button) ---
// Define os valores possíveis diretamente ou use os tipos importados se forem específicos
const buttonVariants: ButtonVariant[] = ["contained", "outlined", "text"];
const buttonColors: ButtonColor[] = [
  "primary", "onPrimary", "secondary", "onSecondary",
  "surfaceInverse", "onSurfaceInverse",
];
const buttonSizes: ButtonSize[] = ["semi", "semiX", "medium"];
const buttonTextTransforms: Array<ButtonProps["textTransform"]> = [ // Usando o tipo da prop
  "uppercase", "lowercase", "capitalize",
];

// --- Componente de Demonstração para um Único Tema Override ---
interface ThemeOverrideProps {
  themeOption: ThemeOption;
  children: React.ReactNode;
}

// Componente para exibir um bloco de exemplos dentro de um tema específico
const ThemeOverrideDisplay: React.FC<ThemeOverrideProps> = ({
  themeOption,
  children,
}) => {
  const containerClasses = `theme-override-item ${
    themeOption.mode === "dark" ? "dark-mode-background" : ""
  }`;
  return (
    <div className={containerClasses}>
      <h4>
        Tema por Props: <code>{themeOption.brand}</code> /{" "}
        <code>{themeOption.mode}</code>
      </h4>
      {children}
    </div>
  );
};

// --- Componente Principal da Aplicação de Demonstração ---
function DevApp() {
  // Define um tema padrão para o ThemeProvider principal
  const defaultTheme = buildTheme("natura", "light");

  // Função de exemplo para o onClick dos botões
  const handleButtonClick = (label: string) => {
    console.log(`Botão "${label}" clicado!`);
  };

  return (
    // Envolve toda a demo com o ThemeProvider da sua biblioteca
    <ThemeProvider theme={defaultTheme}>
      {/* ================================================================== */}
      {/* Seção Principal para Botões (Button)                               */}
      {/* ================================================================== */}
      <section className="component-section">
        <h2>Botões (Button)</h2>

        {/* --- Exemplos usando o Tema Padrão (do Provider) --- */}
        <h3 className="section-subtitle">
          Variações com Tema Padrão (do Provider: {defaultTheme.toString()})
          {/* Assumindo que buildTheme retorna um objeto com toString ou uma propriedade name/id */}
        </h3>
        <div className="component-group">
          <Button
            onClick={() => handleButtonClick("Provider Primary Contained")}
            color="primary"
            variant="contained"
          >
            Primary Contained
          </Button>
          <Button
            onClick={() => handleButtonClick("Provider Secondary Outlined")}
            color="secondary"
            variant="outlined"
          >
            Secondary Outlined
          </Button>
          <Button
            onClick={() => handleButtonClick("Provider Text Disabled")}
            color="primary"
            variant="text"
            disabled
          >
            Text Disabled
          </Button>
          <Button
            onClick={() => handleButtonClick("Provider Medium Size")}
            color="primary"
            variant="contained"
            size="medium"
          >
            Medium Size
          </Button>
          <Button
            onClick={() => handleButtonClick("Provider Contained c/ Ícone")}
            color="primary"
            variant="contained"
            showIcon
            iconName={"outlined-default-mockup" as IconName} // Cast para IconName
          >
            Contained c/ Ícone
          </Button>
        </div>

        {/* --- Exemplos com Overrides por Props (Todos os Temas e Variações) --- */}
        <div className="theme-override-section">
          <h3 className="section-subtitle">
            Variações Completas com Overrides por Props (`brand`/`mode`)
          </h3>

          {/* Itera sobre todos os temas disponíveis */}
          {availableThemes.map((themeOpt) => (
            <ThemeOverrideDisplay
              key={`${themeOpt.brand}-${themeOpt.mode}`}
              themeOption={themeOpt}
            >
              {/* Itera sobre as variantes de botão */}
              {buttonVariants.map((variant) => (
                <React.Fragment key={variant}>
                  <h4 className="variant-title">
                    Variante: <code>{variant}</code>
                  </h4>

                  {/* Subseção: Cores (Normal e Disabled) */}
                  <h5 className="variation-title">Cores</h5>
                  <div className="component-group">
                    {/* Itera sobre as cores */}
                    {buttonColors.map((color) => (
                      <Button
                        key={`${variant}-${color}-enabled`}
                        onClick={() =>
                          handleButtonClick(
                            `${themeOpt.brand}/${themeOpt.mode} ${variant} ${color}`,
                          )
                        }
                        variant={variant}
                        color={color}
                        brand={themeOpt.brand} // Override de tema
                        mode={themeOpt.mode}   // Override de tema
                        size="semiX" // Tamanho fixo para consistência na demo
                      >
                        {color}
                      </Button>
                    ))}
                    <span className="variation-separator">| Disabled:</span>
                    {/* Itera sobre as cores novamente para estado disabled */}
                    {buttonColors.map((color) => (
                      <Button
                        key={`${variant}-${color}-disabled`}
                        onClick={() =>
                          handleButtonClick(
                            `${themeOpt.brand}/${themeOpt.mode} ${variant} ${color} Disabled`,
                          )
                        }
                        variant={variant}
                        color={color}
                        brand={themeOpt.brand}
                        mode={themeOpt.mode}
                        size="semiX"
                        disabled // Habilita estado disabled
                      >
                        {color}
                      </Button>
                    ))}
                  </div>

                  {/* Subseção: Tamanhos (com cor primária) */}
                  <h5 className="variation-title">Tamanhos (Cor: Primary)</h5>
                  <div className="component-group">
                    {/* Itera sobre os tamanhos */}
                    {buttonSizes.map((size) => (
                      <Button
                        key={`${variant}-primary-${size}`}
                        onClick={() =>
                          handleButtonClick(
                            `${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${size}`,
                          )
                        }
                        variant={variant}
                        color="primary" // Cor fixa para exemplos de tamanho
                        brand={themeOpt.brand}
                        mode={themeOpt.mode}
                        size={size} // Aplica o tamanho
                      >
                        {size}
                      </Button>
                    ))}
                  </div>

                  {/* Subseção: Com Ícone */}
                  <h5 className="variation-title">Com Ícone</h5>
                  <div className="component-group">
                    <Button
                      key={`${variant}-primary-icon-enabled`}
                      onClick={() =>
                        handleButtonClick(
                          `${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon`,
                        )
                      }
                      variant={variant}
                      color="primary"
                      brand={themeOpt.brand}
                      mode={themeOpt.mode}
                      size="semiX"
                      showIcon // Habilita ícone
                      iconName={"filled-action-love" as IconName} // Usa um nome de ícone válido
                    >
                      Primary
                    </Button>
                    <Button
                      key={`${variant}-primary-icon-disabled`}
                      onClick={() =>
                        handleButtonClick(
                          `${themeOpt.brand}/${themeOpt.mode} ${variant} primary Icon Disabled`,
                        )
                      }
                      variant={variant}
                      color="primary"
                      brand={themeOpt.brand}
                      mode={themeOpt.mode}
                      size="semiX"
                      showIcon
                      iconName={"filled-action-love" as IconName}
                      disabled // Estado disabled com ícone
                    >
                      Primary Disabled
                    </Button>
                    {/* Repete para cor secundária */}
                    <Button
                      key={`${variant}-secondary-icon-enabled`}
                      onClick={() =>
                        handleButtonClick(
                          `${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon`,
                        )
                      }
                      variant={variant}
                      color="secondary"
                      brand={themeOpt.brand}
                      mode={themeOpt.mode}
                      size="semiX"
                      showIcon
                      iconName={"filled-navigation-arrowright" as IconName}
                    >
                      Secondary
                    </Button>
                    <Button
                      key={`${variant}-secondary-icon-disabled`}
                      onClick={() =>
                        handleButtonClick(
                          `${themeOpt.brand}/${themeOpt.mode} ${variant} secondary Icon Disabled`,
                        )
                      }
                      variant={variant}
                      color="secondary"
                      brand={themeOpt.brand}
                      mode={themeOpt.mode}
                      size="semiX"
                      showIcon
                      iconName={"filled-navigation-arrowright" as IconName}
                      disabled
                    >
                      Secondary Disabled
                    </Button>
                  </div>

                  {/* Subseção: Text Transform */}
                  <h5 className="variation-title">
                    Text Transform (Cor: Primary)
                  </h5>
                  <div className="component-group">
                    {/* Itera sobre as opções de textTransform */}
                    {buttonTextTransforms.map((transform) => (
                      <Button
                        key={`${variant}-primary-${transform}`}
                        onClick={() =>
                          handleButtonClick(
                            `${themeOpt.brand}/${themeOpt.mode} ${variant} primary ${transform || 'default'}`, // Adiciona default se transform for undefined
                          )
                        }
                        variant={variant}
                        color="primary"
                        brand={themeOpt.brand}
                        mode={themeOpt.mode}
                        size="semiX"
                        textTransform={transform} // Aplica a transformação
                      >
                        {transform || 'default'} {/* Exibe o valor ou 'default' */}
                      </Button>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </ThemeOverrideDisplay>
          ))}
        </div>
      </section>
    </ThemeProvider>
  );
}

// --- Renderiza a Aplicação ---
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // StrictMode ajuda a encontrar problemas potenciais na aplicação
    <React.StrictMode>
      <DevApp />
    </React.StrictMode>,
  );
} else {
  // Erro caso o elemento #root não exista no index.html
  console.error("Elemento com id 'root' não encontrado no index.html");
}