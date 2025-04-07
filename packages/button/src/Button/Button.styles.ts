/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { Theme } from "@naturacosmeticos/natds-themes";
// Importar tipos necessários de buildTheme ou do pacote de temas
import buildTheme, { Brand, ThemeMode } from "../ThemeProvider/buildTheme";
// Importar tipos específicos do Button definidos no .props
import {
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  IconPosition,
  mode as ButtonMode,
} from "./Button.props";
import { BrandTypes } from "../brandTypes/brandTypes";
import { tss } from "../ThemeProvider/tss"; // Importar a instância configurada do tss

// Tipo para os parâmetros que o hook useStyles receberá (baseado em ButtonProps)
export type ButtonStyleParams = Pick<
  ButtonProps,
  | "size"
  | "showIcon"
  | "iconPosition"
  | "variant"
  | "fullWidth"
  | "disabled"
  | "brand"
  | "textTransform"
  | "color"
  | "mode"
>;

// --- Funções Auxiliares ---

const getPaddingStyles = (
  theme: Theme,
  { size }: Pick<ButtonStyleParams, "size">,
) => {
  if (!size) return theme.spacing.tiny; // Fallback
  const paddingMap: Record<ButtonSize, number> = {
    semi: theme.spacing.micro,
    medium: theme.spacing.small,
    semiX: theme.spacing.tiny,
  };
  return paddingMap[size];
};

const onColorGet = (color: ButtonColor): keyof Theme["color"] | "primary" => {
  switch (color) {
    case "primary":
      return "onPrimary";
    case "onPrimary":
      return "primary";
    case "secondary":
      return "onSecondary";
    case "onSecondary":
      return "secondary";
    case "surfaceInverse":
      return "onSurfaceInverse";
    case "onSurfaceInverse":
      return "surfaceInverse";
    default:
      return "primary";
  }
};

const onColorGetOutlined = (
  color: ButtonColor,
): keyof Theme["color"] | "highlight" | "highEmphasis" => {
  switch (color) {
    case "primary":
      return "highEmphasis";
    case "onPrimary":
      return "onPrimary";
    case "secondary":
      return "highEmphasis";
    case "onSecondary":
      return "onSecondary";
    case "surfaceInverse":
      return "surfaceInverse";
    case "onSurfaceInverse":
      return "onSurfaceInverse";
    default:
      return "highlight";
  }
};

// Interface para representar os estados de cor esperados internamente
interface VariantColorStates {
  back?: string;
  border?: string;
  label?: string;
}
// Interface para o resultado combinado dos estados de cor
interface ColorVariantResult {
  enable: VariantColorStates;
  hover: VariantColorStates;
  focus: VariantColorStates;
  disable: VariantColorStates;
}

// Mapeia a estrutura do tema para VariantColorStates
const mapThemeStateToVariantState = (themeState: any): VariantColorStates => {
  return {
    back: themeState?.background ?? themeState?.back,
    border: themeState?.borderColor ?? themeState?.border,
    label: themeState?.color ?? themeState?.label,
  };
};

// Obtém as configurações de cor (enable, hover, focus, disable)
const getColorVariant = (
  theme: Theme,
  { variant, color }: Pick<ButtonStyleParams, "variant" | "color">,
): Partial<ColorVariantResult> => {
  if (!variant || !theme.button || !theme.button[variant]) {
    console.error(
      `Estilos para a variante de botão "${variant}" não encontrados no tema.`,
    );
    return {};
  }

  const variantThemeColors = theme.button[variant].color;

  // Cores base 'enable'
  let baseColorEnable: string;
  let labelColorEnable: string;
  let borderColorEnable: string = variantThemeColors.enable.border;

  if (variant === "contained") {
    baseColorEnable = color ? theme.color[color] : theme.color.primary;
    const colorOn = color ? onColorGet(color) : "onPrimary";
    labelColorEnable = theme.color[colorOn];
  } else {
    // outlined, text
    baseColorEnable = variantThemeColors.enable.background;
    const colorOutlined = color
      ? onColorGetOutlined(color)
      : variant === "outlined"
        ? "highlight"
        : "highEmphasis";
    labelColorEnable = theme.color[colorOutlined];
    if (variant === "outlined") {
      borderColorEnable = color ? theme.color[color] : theme.color.primary;
    }
  }

  return {
    enable: {
      back: baseColorEnable,
      border: borderColorEnable,
      label: labelColorEnable,
    },
    hover: mapThemeStateToVariantState(variantThemeColors.hover),
    focus: mapThemeStateToVariantState(variantThemeColors.focus),
    disable: mapThemeStateToVariantState(variantThemeColors.disable),
  };
};

// Obtém as cores usando buildTheme se uma marca específica for fornecida
const getColorBrand = (
  brand: BrandTypes,
  params: ButtonStyleParams,
): Partial<ColorVariantResult> => {
  const { variant, color, mode = "light" } = params;
  if (!brand || !variant) return {};

  const colorTheme = buildTheme(brand as Brand, mode as ThemeMode);
  return getColorVariant(colorTheme, { variant, color });
};

// --- Funções Auxiliares de Layout ---

const getLabelMargin = (
  theme: Theme,
  side: "left" | "right",
  {
    showIcon,
    iconPosition,
  }: Pick<ButtonStyleParams, "showIcon" | "iconPosition">,
) => {
  return showIcon && iconPosition === side ? theme.spacing.tiny : 0;
};

const getIconPosition = ({
  showIcon,
  iconPosition = "right",
}: Pick<ButtonStyleParams, "showIcon" | "iconPosition">) => {
  return showIcon && iconPosition === "right" ? "row" : "row-reverse";
};

const getLetterSpacing = (
  theme: Theme,
  { textTransform }: Pick<ButtonStyleParams, "textTransform">,
) => {
  if (textTransform === "capitalize" || textTransform === "lowercase") {
    return 0;
  }
  return theme.button?.label?.letterSpacing ?? "inherit";
};

const getBorderRadius = (
  theme: Theme,
  brand?: BrandTypes,
  mode?: ButtonMode,
) => {
  if (brand) {
    const brandTheme = buildTheme(brand as Brand, mode as ThemeMode);
    return brandTheme.button?.borderRadius ?? theme.button?.borderRadius ?? 4;
  }
  return theme.button?.borderRadius ?? 4;
};

// **CORREÇÃO:** Define um valor padrão para borderWidth
const getBorderWidth = (theme: Theme, variant?: ButtonVariant): number => {
  // Tenta buscar no tema global ou por variante se a estrutura for conhecida e segura
  // Exemplo: return theme.borderWidths?.button ?? 1;
  // Por enquanto, retornaremos um valor padrão, pois o acesso anterior não é seguro pela tipagem.
  return 1; // Define uma largura de borda padrão
};

// --- Hook Principal de Estilos ---
export const useStyles = tss
  .withParams<ButtonStyleParams>() // Define que o hook aceita parâmetros do tipo ButtonStyleParams
  .create(({ theme, ...params }) => {
    // Desestrutura os parâmetros recebidos (que devem ser do tipo ButtonStyleParams)
    const {
      variant = "contained",
      brand,
      color,
      mode = "light",
      size = "semiX",
      fullWidth,
      textTransform = "uppercase",
      showIcon,
      iconPosition = "right",
      disabled,
    } = params;

    // Determina as cores
    const activeColors = brand
      ? getColorBrand(brand, params)
      : getColorVariant(theme, { variant, color });

    // Garante objetos para cada estado
    const enableColors = activeColors.enable ?? {};
    const hoverColors = activeColors.hover ?? {};
    const focusColors = activeColors.focus ?? {};
    const disableColors = activeColors.disable ?? {};

    const borderRadius = getBorderRadius(theme, brand, mode);
    const borderWidth = getBorderWidth(theme, variant); // Usa a função corrigida

    return {
      // Estilos Base do Botão
      button: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        fontFamily: theme.button?.label?.primary?.fontFamily ?? "sans-serif",
        fontWeight: theme.button?.label?.primary?.fontWeight ?? 500,
        borderWidth: borderWidth, // Usa o valor obtido
        borderStyle: "solid",
        // Enable State
        backgroundColor: enableColors.back,
        borderColor: enableColors.border,
        color: enableColors.label,
        borderRadius: borderRadius,
        boxShadow: variant === "contained" ? theme.elevation.tiny : "none",
        cursor: "pointer",
        minHeight: theme.size[size],
        height: "auto",
        paddingLeft: getPaddingStyles(theme, { size }),
        paddingRight: getPaddingStyles(theme, { size }),
        paddingTop: 0,
        paddingBottom: 0,
        width: fullWidth ? "100%" : "auto",
        textDecoration: "none",
        textAlign: "center",
        outline: "none",
        position: "relative",
        overflow: "hidden",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",

        // Disabled State
        "&:disabled": {
          backgroundColor: disableColors.back,
          borderColor: disableColors.border,
          color: disableColors.label,
          boxShadow: theme.elevation.none,
          cursor: "not-allowed",
          opacity: theme.opacity?.disabled ?? 0.5,
        },

        // Hover State
        "&:hover:not([disabled])": {
          backgroundColor: hoverColors.back,
          borderColor: hoverColors.border,
          color: hoverColors.label,
        },

        // Focus Visible State
        "&:focus-visible:not([disabled])": {
          backgroundColor: focusColors.back,
          borderColor: focusColors.border,
          color: focusColors.label,
          outline: `2px solid ${theme.color.highlight}`,
          outlineOffset: "2px",
        },

        // Active State
        "&:active:not([disabled])": {
          backgroundColor: focusColors.back,
          borderColor: focusColors.border,
          color: focusColors.label,
          transform: "scale(0.98)",
        },
      },

      // Container do Label e Ícone
      labelContainer: {
        display: "inherit",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: getIconPosition({ showIcon, iconPosition }),
        width: "100%",
      },

      // Estilos do Texto (Label)
      label: {
        fontSize: theme.button?.label?.fontSize ?? 14,
        fontWeight: "inherit",
        letterSpacing: getLetterSpacing(theme, { textTransform }),
        marginLeft: getLabelMargin(theme, "left", { showIcon, iconPosition }),
        marginRight: getLabelMargin(theme, "right", { showIcon, iconPosition }),
        textAlign: "center",
        textOverflow: "ellipsis",
        textTransform: textTransform,
        userSelect: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexGrow: 1,
      },

      // Estilos para o Ícone
      icon: {
        display: "inline-flex",
        alignSelf: "center",
        flexShrink: 0,
      },
    };
  });
