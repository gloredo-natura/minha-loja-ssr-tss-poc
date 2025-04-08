// packages/demo-next-pages-module-mfe/components/RemoteButtonWrapper.tsx
// Este arquivo simplesmente importa e reexporta o Button da biblioteca local.
import { Button } from '@meu-monorepo/button';

// Atenção: A exportação aqui deve ser 'default' se o lazy import no shell
// não usar desestruturação, ou nomeada se usar. Vamos usar default.
export default Button;

// Se Button não for export default na sua lib, use exportação nomeada:
// export { Button };
// E ajuste o import no shell para:
// const { Button: RemoteButton } = await import('...');
// Ou o lazy import:
// const RemoteButton = lazy(async () => {
//   const mod = await import('demo_next_pages_module_mfe/Button');
//   return { default: mod.Button };
// });
// Vamos manter o 'export default Button' por simplicidade inicial.