// Importar tipos necessários de buildTheme ou do pacote de temas
import buildTheme, { Brand } from "../ThemeProvider/buildTheme";
// Importar tipos específicos do Icon definidos no .props
import { IconProps, IconSize } from "./Icon.props";
import { tss } from "../ThemeProvider/tss"; // Importar a instância configurada do tss

// Tipo para os parâmetros que o hook useStyles receberá (baseado em IconProps)
// Usaremos diretamente Pick<IconProps, ...> ou definimos um tipo se for mais complexo
type IconStyleParams = Pick<IconProps, "size" | "color" | "brand">; // Adiciona 'mode' se buildTheme precisar

// --- Hook Principal de Estilos ---
export const useStyles = tss
  .withParams<IconStyleParams>() // Define que o hook aceita parâmetros deste tipo
  .create(({ theme, ...params }) => {
    // Desestrutura os parâmetros recebidos
    const { size = "standard", color = "highlight", brand } = params;

    // Lógica para determinar a cor (anteriormente em getColorThemeIcon)
    let finalColorValue: string | undefined;
    if (brand) {
      // Se uma marca for fornecida, constrói o tema específico da marca/modo
      const brandTheme = buildTheme(brand as Brand, "light");
      // Acessa a cor no tema da marca (com fallback para highlight se color for undefined)
      finalColorValue = brandTheme.color[color ?? "highlight"];
    } else {
      // Se não houver marca, usa a cor do tema global (com fallback)
      finalColorValue = theme.color[color ?? "highlight"];
    }

    // Lógica para determinar o tamanho da fonte
    const finalFontSize = size
      ? theme.size[size as IconSize]
      : theme.size.standard;

    return {
      // Estilos para o ícone
      icon: {
        color: finalColorValue, // Usa a cor determinada
        fontFamily: "natds-icons", // Fonte definida para os ícones
        fontSize: finalFontSize, // Usa o tamanho determinado
        pointerEvents: "none", // Ícones geralmente não são interativos por si só
        userSelect: "none", // Previne seleção de texto do ícone
        // Adicionar outros estilos base se necessário
        display: "inline-block", // Garante comportamento adequado de bloco em linha
        lineHeight: 1, // Ajusta a altura da linha para o tamanho do ícone
      },
    };
  });

// Remove a exportação padrão do estilo JSS
// export default styles;
