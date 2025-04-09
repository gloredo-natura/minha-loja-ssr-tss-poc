import React, { useEffect, useState, useRef, useCallback, JSX } from "react";
// Importa o hook e o tipo de parâmetros de estilo
import { useStyles } from "./Ripple.styles";
import type { RippleStyleParams } from "./Ripple.styles"; // Importa o tipo explicitamente
import { RippleProps } from "./Ripple.props";

// Tipos internos
type Size = { width: number; height: number };

// Função auxiliar para obter o maior lado (para tamanho do ripple)
export const getBiggestSide = ({ width, height }: Size): number =>
  width > height ? width : height;

const Ripple = (props: RippleProps): JSX.Element => {
  // Desestrutura props
  const {
    brand,
    animationDuration = 300,
    children,
    color = "highlight",
    disabled = false,
    focus = false, // Usado para tabIndex
    fullWidth = false,
    hideOverflow = true,
    isCentered = false, // Usado para cálculo de posição inline
    showHover = false,
  } = props;

  // Estado interno
  const [isRippling, setIsRippling] = useState(false); // Controla se a animação está ativa
  const [rippleStyle, setRippleStyle] = useState({}); // Estilos inline para o ripple (tamanho/posição)
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref para o elemento wrapper

  // Cria o objeto de parâmetros para o hook useStyles
  const styleParams: RippleStyleParams = {
    animationDuration,
    brand,
    color,
    disabled,
    fullWidth,
    hideOverflow,
    showHover,
  };

  // Chama o hook useStyles com os parâmetros corretos
  const { classes, cx } = useStyles(styleParams);

  // Callback para iniciar a animação do ripple
  const startRipple = useCallback(
    (
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.FocusEvent<HTMLDivElement>,
    ) => {
      if (disabled || !wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const size = getBiggestSide(rect); // Usa o tamanho do wrapper

      let rippleX = 0;
      let rippleY = 0;

      if ("pageX" in event && "pageY" in event && !isCentered) {
        // Calcula a posição do clique relativa ao wrapper
        rippleX = event.pageX - rect.left - window.scrollX;
        rippleY = event.pageY - rect.top - window.scrollY;
      } else {
        // Centraliza se isCentered for true ou se for evento de foco
        rippleX = rect.width / 2;
        rippleY = rect.height / 2;
      }

      // Define os estilos inline para o novo ripple
      setRippleStyle({
        left: rippleX,
        top: rippleY,
        width: size,
        height: size,
      });
      setIsRippling(true); // Ativa a animação (adiciona a classe rippleActive)
    },
    [disabled, isCentered],
  ); // Dependências do useCallback

  // Efeito para remover a classe de animação após a duração
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isRippling) {
      timeoutId = setTimeout(() => {
        setIsRippling(false); // Desativa a animação (remove a classe)
        // Opcional: resetar rippleStyle se quiser que desapareça completamente
        // setRippleStyle({});
      }, animationDuration);
    }
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRippling, animationDuration]);

  // Determina o tabIndex baseado na prop 'focus'
  const tabIndex = focus && !disabled ? 0 : -1;

  return (
    <div
      ref={wrapperRef} // Adiciona a ref ao wrapper
      className={classes.wrapper} // Aplica classe do wrapper
      onClick={startRipple} // Inicia ripple no clique
      onFocus={startRipple} // Inicia ripple no foco (se tabIndex permitir)
      data-testid="ripple-wrapper"
      tabIndex={tabIndex} // Controla a focabilidade
    >
      {/* Container que controla o overflow e border-radius */}
      <div className={classes.rippleContainer}>
        {/* Elemento do Ripple - classe base + classe ativa + estilos inline */}
        <div
          // Aplica a classe base e a classe ativa condicionalmente
          className={cx(classes.ripple, isRippling && classes.rippleActive)}
          // Aplica os estilos inline calculados (posição e tamanho)
          style={rippleStyle}
          data-testid="ripple-animation"
        />
      </div>
      {/* Renderiza o conteúdo filho */}
      {children}
    </div>
  );
};

export default Ripple;
