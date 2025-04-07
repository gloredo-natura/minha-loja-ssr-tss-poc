// packages/demo-tss-minimal/pages/index.tsx
// Corrigido: Adiciona valor padrão para params na desestruturação

import React from 'react';
import Head from 'next/head';
import { tss } from "tss-react";

// 1. Define os estilos usando tss.create
const useStyles = tss.create(
    // CORREÇÃO: Adiciona '= { color: "" }' para fornecer um valor padrão
    // caso o segundo argumento (params) seja undefined durante SSR.
    (_theme, { color } = { color: "" }) => ({
        styledDiv: {
            padding: '20px',
            margin: '20px',
            border: '2px solid darkcyan',
            // Usa 'color'. Se params era undefined, 'color' será "" (string vazia),
            // e 'lightyellow' será usado como fallback.
            backgroundColor: color || 'lightyellow',
            color: 'black',
            fontSize: '1.2em',
            '&:hover': {
                borderColor: 'purple',
                cursor: 'pointer'
            }
        }
    })
);

// 2. Cria um componente simples que usa os estilos
const MinimalStyledComponent: React.FC<{ color: string }> = ({ color }) => {
    // Passa os parâmetros normalmente. A correção está na definição de useStyles.
    const { classes } = useStyles({ color });

    return (
        <div className={classes.styledDiv}>
            Este é um componente estilizado com tss.create (cor: {color}).
        </div>
    );
};


// 3. Componente da Página Principal
export default function MinimalTssPage() {
    return (
        <>
            <Head>
                <title>Teste Mínimo TSS SSR (tss.create)</title>
            </Head>
            <main>
                <h1>Teste Mínimo Isolado - TSS-React SSR (tss.create)</h1>
                <p>
                    Renderizando um componente definido localmente que usa tss-react (API recomendada):
                </p>

                {/* Renderiza o componente estilizado */}
                <MinimalStyledComponent color="lightblue" />
                <MinimalStyledComponent color="lightcoral" />

                <hr />
                <p>Verifique se os estilos foram aplicados corretamente via SSR.</p>
                <p>Verifique os consoles por erros.</p>
            </main>
        </>
    );
}