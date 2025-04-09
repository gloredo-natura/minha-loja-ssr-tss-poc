import React from "react";
// Importa o tipo Color para usar como chave
import { Theme } from "@naturacosmeticos/natds-themes";
// Mantém IconColor se for um tipo específico, senão pode usar keyof Theme['color']
import { IconColor } from "../Icon/Icon.props";
// Importa ButtonStyleParams para usar na criação do objeto de parâmetros
import { ButtonProps } from "./Button.props";
import { Icon } from "../Icon";
import { Ripple } from "../Ripple";
// Importa o tipo ButtonStyleParams de Button.styles ou define localmente se necessário
import { useStyles } from "./Button.styles";
import type { ButtonStyleParams } from "./Button.styles"; // Importa o tipo explicitamente

// Define um tipo de chave de cor válido do tema para o fallback
type ThemeColorKey = keyof Theme["color"];

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    // Desestrutura as props para uso geral no componente
    const {
      children,
      className = "",
      brand,
      mode = "light",
      color,
      textTransform = "uppercase",
      disabled = false,
      fullWidth = false,
      iconPosition = "right", // Pega o valor ou default
      onClick,
      size = "semiX",
      testID,
      type = "button",
      variant = "contained",
      ariaLabel,
      showIcon, // Pega showIcon para lógica condicional e para passar aos estilos
      // iconName não é desestruturado aqui
      ...rest
    } = props;

    // **CORREÇÃO:** Cria um objeto contendo apenas as props esperadas por useStyles
    const styleParams: ButtonStyleParams = {
      size,
      showIcon, // Passa showIcon (pode ser undefined)
      iconPosition,
      variant,
      fullWidth,
      disabled,
      brand,
      textTransform,
      color,
      mode,
      // Inclui iconName aqui APENAS se showIcon for true? Não, ButtonStyleParams já o tem opcional.
      // O hook useStyles precisa saber se o ícone deve ser mostrado para aplicar margens, etc.
      // Se showIcon for true, o componente Button.tsx acessará props.iconName separadamente.
    };

    // Passa o objeto 'styleParams' criado explicitamente para useStyles
    const { classes, cx, theme } = useStyles(styleParams);

    // Determina a cor do ícone
    const fallbackIconColor: ThemeColorKey = "highEmphasis";
    let determinedIconColor: IconColor | ThemeColorKey = fallbackIconColor;

    if (variant && theme.button[variant]) {
      determinedIconColor = disabled
        ? ((theme.button[variant].color.disable.label as IconColor) ??
          fallbackIconColor)
        : ((theme.button[variant].color.enable.label as IconColor) ??
          fallbackIconColor);
    }

    return (
      <Ripple brand={brand} disabled={disabled} fullWidth={fullWidth}>
        <button
          ref={ref}
          className={cx(classes.button, className, "Button-gaya")}
          data-testid={testID}
          disabled={disabled}
          onClick={onClick}
          type={type}
          aria-label={ariaLabel}
          {...rest}
        >
          <div className={classes.labelContainer}>
            <span className={classes.label}>{children}</span>
            {/* Acessa iconName condicionalmente a partir de 'props' */}
            {props.showIcon === true && props.iconName && (
              <Icon
                name={props.iconName} // Acessa de props aqui
                color={determinedIconColor as IconColor}
                className={classes.icon}
              />
            )}
          </div>
        </button>
      </Ripple>
    );
  },
);

export default Button;
