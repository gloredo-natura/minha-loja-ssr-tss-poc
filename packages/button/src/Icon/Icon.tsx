import React from "react";
import { icons, IconName } from "@naturacosmeticos/natds-icons";
import { IconProps } from "./Icon.props";
// Importa o hook useStyles gerado pelo tss
import { useStyles } from "./Icon.styles";

// Função auxiliar para verificar se o nome do ícone existe
export const checkIcon = (iconName: string | undefined): IconName => {
  // Retorna um ícone padrão se o nome for undefined ou não existir no objeto icons
  const defaultIcon = "outlined-default-mockup";
  if (!iconName || !(iconName in icons)) {
    console.warn(
      `Ícone "${iconName}" não encontrado. Usando "${defaultIcon}".`,
    );
    return defaultIcon as IconName;
  }
  return iconName as IconName;
};

const Icon = React.forwardRef<HTMLElement, IconProps>(
  (
    {
      ariaHidden = true,
      ariaLabel,
      className = "",
      color = "highlight", // Default color key
      brand,
      name,
      role = "img",
      size = "standard", // Default size key
      testID, // Mantém testID se não for passado em ...rest
      ...props // Captura atributos HTML restantes (ex: data-*)
    },
    ref,
  ) => {
    // Chama o hook useStyles passando os parâmetros relevantes
    // O hook agora retorna classes, cx e theme (embora theme não seja usado aqui)
    const { classes, cx } = useStyles({ size, color, brand });

    // Determina o nome da classe do ícone a ser usado
    const checkedIconName = checkIcon(name);
    const iconClassName = `natds-icons-${checkedIconName}`;
    const finalTestID = testID ?? `icon-${checkedIconName}`; // Usa nome verificado no testID padrão

    return (
      <i
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        // Usa cx para combinar as classes:
        // 1. Classe base do hook (classes.icon)
        // 2. Classe externa (className)
        // 3. Classes fixas da biblioteca de ícones (natds-icons, iconClassName)
        // 4. Classe estática opcional (Icon-gaya)
        className={cx(
          classes.icon,
          "natds-icons", // Classe base da fonte de ícones
          iconClassName, // Classe específica do ícone
          "Icon-gaya", // Classe estática adicional
          className, // Classe externa do usuário (prioridade mais alta se houver conflitos com cx)
        )}
        data-testid={finalTestID}
        ref={ref}
        role={role}
        {...props} // Aplica atributos HTML restantes
      />
    );
  },
);

export default Icon;
