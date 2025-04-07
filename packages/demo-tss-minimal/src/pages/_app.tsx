// packages/demo-tss-minimal/pages/_app.tsx
// Mínimo _app.tsx para teste SSR tss-react

import App from "next/app"; // App base
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ key: "css" });

export { augmentDocumentWithEmotionCache };

// Exporta App base envolvido pelo HOC
export default withAppEmotionCache(App);