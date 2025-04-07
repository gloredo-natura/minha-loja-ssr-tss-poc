// packages/button-tss/src/index.ts (CORRIGIDO)

// Exporta o componente Button e seus tipos/props
export { default as Button } from "./Button/Button";
export * from "./Button/Button.props";

// Exporta o componente Icon e seus tipos/props
export { default as Icon } from "./Icon/Icon";
export * from "./Icon/Icon.props";

// Exporta o componente Ripple e seus tipos/props
export { default as Ripple } from "./Ripple/Ripple";
export * from "./Ripple/Ripple.props";

// Exporta o ThemeProvider, buildTheme e tipos relacionados
export { default as ThemeProvider } from "./ThemeProvider/ThemeProvider";
export { default as buildTheme } from "./ThemeProvider/buildTheme";
export * from "./ThemeProvider/ThemeProvider.props";

// packages/button/src/index.ts

// ... outras exportações ...

// ADICIONE ou VERIFIQUE estas linhas (ajuste os caminhos!):
export type { BrandTypes } from './brandTypes/brandTypes'; // Exemplo de caminho
export type { ThemeMode } from './ThemeProvider/buildTheme'; // Exemplo de caminho
// Certifique-se que Brand também é exportado se necessário:
// export type { Brand } from './ThemeProvider/buildTheme';

// Exporte outros componentes ou utilitários se necessário
