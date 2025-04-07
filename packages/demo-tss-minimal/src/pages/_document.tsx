// packages/demo-tss-minimal/pages/_document.tsx
// Mínimo _document.tsx para teste SSR tss-react

import Document from "next/document"; // Document base
import { augmentDocumentWithEmotionCache } from "./_app"; // Importa do _app mínimo

// Augmenta o Document base
augmentDocumentWithEmotionCache(Document);

// Exporta o Document base (agora modificado)
export default Document;