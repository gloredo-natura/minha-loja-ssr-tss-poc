import { Theme } from "@naturacosmeticos/natds-themes";
// Importar tipos necessários de buildTheme ou do pacote de temas
import buildTheme, { Brand } from "../ThemeProvider/buildTheme";
// Importar tipos específicos do Ripple definidos no .props
import { RippleProps, RippleColors } from "./Ripple.props";
// **CORREÇÃO:** Importação correta do tss
import { tss } from "../ThemeProvider/tss";
import { keyframes } from "@emotion/react";

// Tipo para os parâmetros que o hook useStyles receberá
// **CORREÇÃO:** Remove 'mode' pois não existe em RippleProps
export type RippleStyleParams = Pick<
  RippleProps,
  | "color"
  | "hideOverflow"
  | "disabled"
  | "fullWidth"
  | "showHover"
  | "animationDuration"
  | "brand"
  // | "mode" // Removido
>;

// --- Funções Auxiliares (Adaptadas ou Inlined) ---

const getRippleColorValue = (
  theme: Theme,
  params: RippleStyleParams,
): string | undefined => {
  // **CORREÇÃO:** Remove 'mode' da desestruturação, assume 'light' para buildTheme
  const { brand, color = "highlight" } = params;
  if (brand) {
    // Assume 'light' como mode padrão para buildTheme aqui
    const brandTheme = buildTheme(brand as Brand, "light");
    // Acessa a cor usando RippleColors
    return brandTheme.color[color as RippleColors];
  }
  // Acessa a cor usando RippleColors
  return theme.color[color as RippleColors];
};

const getRippleBorderRadius = (
  theme: Theme,
  params: RippleStyleParams,
): number | string => {
  // **CORREÇÃO:** Remove 'mode' da desestruturação, assume 'light' para buildTheme
  const { brand } = params;
  if (brand) {
    // Assume 'light' como mode padrão para buildTheme aqui
    const brandTheme = buildTheme(brand as Brand, "light");
    return brandTheme.button?.borderRadius ?? theme.button?.borderRadius ?? 0;
  }
  return theme.button?.borderRadius ?? 0;
};

// **CORREÇÃO:** Remove parâmetro 'variant' não existente em RippleProps

// --- Hook Principal de Estilos ---
export const useStyles = tss
  .withParams<RippleStyleParams>()
  .create(({ theme, ...params }) => {
    // **CORREÇÃO:** Remove 'mode' da desestruturação
    const {
      hideOverflow = true,
      disabled = false,
      fullWidth = false,
      showHover = false,
      animationDuration = 300,
      // mode // Removido
    } = params;

    // Passa 'params' que agora não inclui 'mode'
    const finalColor = getRippleColorValue(theme, params);
    const finalBorderRadius = getRippleBorderRadius(theme, params);
    // Passa 'theme' que agora não inclui 'variant'

    const rippleAnimation = keyframes`
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: ${theme.opacity.low};
            }
            75% {
                transform: translate(-50%, -50%) scale(1);
                opacity: ${theme.opacity.low};
            }
            100% {
                opacity: ${theme.opacity.transparent};
            }
        `;

    const sharedPseudoStyles = {
      content: '" "',
      height: "100%",
      left: 0,
      position: "absolute" as const,
      top: 0,
      width: "100%",
      zIndex: -1,
      borderRadius: finalBorderRadius,
    };

    return {
      wrapper: {
        flexBasis: fullWidth ? "100%" : undefined,
        cursor: disabled ? "default" : "pointer",
        display: fullWidth ? "block" : "inline-block",
        position: "relative",
        alignSelf: fullWidth ? "stretch" : "start",
        outline: "none",
        height: "fit-content",

        "&:focus:after": {
          ...sharedPseudoStyles,
          backgroundColor: !disabled ? finalColor : "transparent",
          opacity: !disabled ? theme.opacity.mediumLow : 0,
          transition: "opacity 0.2s ease-in-out",
        },

        "&:hover:after": {
          ...sharedPseudoStyles,
          backgroundColor: !disabled && showHover ? finalColor : "transparent",
          opacity: !disabled && showHover ? theme.opacity.mediumLow : 0,
          transition: "opacity 0.2s ease-in-out",
        },
      },

      rippleContainer: {
        inset: 0,
        overflow: hideOverflow ? "hidden" : "visible",
        position: "absolute",
        borderRadius: finalBorderRadius,
        pointerEvents: "none",
      },

      ripple: {
        backgroundColor: finalColor,
        borderRadius: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        pointerEvents: "none",
        // borderWidth e borderStyle podem ser adicionados se necessário
        // borderWidth: borderWidth,
        // borderStyle: 'solid',
      },

      rippleActive: {
        animation: `${rippleAnimation} ${animationDuration}ms ease-out forwards`,
      },
    };
  });
