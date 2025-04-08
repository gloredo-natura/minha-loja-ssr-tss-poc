// packages/demo-next-pages-shell-mfe/types/remotes.d.ts

// Declara o módulo exposto pelo remote 'demo_next_pages_module_mfe'
// com o alias './Button'
declare module 'demo_next_pages_module_mfe/RemoteButton' {
  // Tentamos usar o tipo exato importado da biblioteca original.
  // Isso dá melhor intellisense e type checking.
  import type { ButtonProps } from '@meu-monorepo/button';
  import type React from 'react';

  // Assume que o componente Button é um ForwardRefExoticComponent (comum para ref forwarding)
  // e que o wrapper no remote fez 'export default Button;'
  const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  export default Button;

  // --- Fallback (se importar ButtonProps der problema) ---
  // Se a linha de import type causar erros de build ou dependência circular,
  // você pode usar 'any' como um fallback mais simples, perdendo type safety:
  //
  // const Button: React.ComponentType<any>;
  // export default Button;
  //
}

// Adicione declarações para outros módulos remotos aqui, se houver.