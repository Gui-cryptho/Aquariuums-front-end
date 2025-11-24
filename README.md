# Aquarium Simulation

Um projeto Next.js + React que renderiza um aquário com peixes e bolhas animadas. Esta README descreve como configurar, rodar e depurar a aplicação localmente.

**Local do projeto:** `./` (raiz do workspace)

## Stack

- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- pnpm (gerenciador de pacotes recomendado)

## Requisitos

- Node.js (recomendo **Node 18+**, Node 20 é uma boa opção)
- pnpm (ou ative via Corepack)

Se você não tem `pnpm`, ative/instale usando PowerShell:

```powershell
# Ativar corepack (recomendado em Node 18+)
corepack enable
corepack prepare pnpm@latest --activate

# Ou instalar globalmente via npm
npm install -g pnpm
```

## Instalação (primeira vez)

No PowerShell, na pasta do projeto:

```powershell
pnpm install
```

Isso vai instalar todas as dependências listadas em `package.json`.

## Rodando em modo desenvolvimento

```powershell
pnpm run dev
```

Abra `http://localhost:3000` no navegador.

## Build e produção

Gerar build:

```powershell
pnpm run build
```

Executar produção (após build):

```powershell
pnpm run start
```

## Arquitetura / Principais arquivos

- `app/` – Páginas e layout (Next.js app router)
- `components/` – Componentes React usados no app
  - `aquarium.tsx` – Container principal do aquário e lógica de animação dos peixes
  - `aquarium-bubbles.tsx` – Componente das bolhas (animação)
  - `fish.tsx` – Componente do peixe
- `styles/`, `public/` – Estilos e ativos

## Problemas comuns e como depurar

1. Erro: "Hydration failed because the server rendered text didn't match the client"

   - Causa comum: renderização não determinística no servidor (uso de `Math.random()`, `Date.now()` ou checks de `window` durante a renderização). Mesmo componentes com `"use client"` podem causar mismatch se o HTML/CSS gerado no servidor for diferente do cliente.
   - Solução aplicada neste repositório: o componente `components/aquarium-bubbles.tsx` usava `Math.random()` dentro do bloco `<style>` (keyframes CSS), o que causava valores diferentes entre servidor e cliente. Eu removi `Math.random()` do CSS injetado e passei deslocamentos horizontais por bolha como variáveis CSS (`--dx50` e `--dx100`) geradas no cliente (dentro de `useEffect`).
   - Se você encontrar hidrations similares, procure por `Math.random()`, `Date.now()` e acessos a `window` usados durante a renderização (fora de `useEffect` / hooks client-only). Mova lógica randômica para `useEffect` ou gere valores determinísticos no servidor.

2. Erro: `animationRef` / `requestAnimationFrame` com TypeScript

   - Se o TypeScript reclamar de `useRef` sem inicialização, declare o ref assim:
     ```ts
     const animationRef = useRef<number | null>(null);
     // e na limpeza:
     if (animationRef.current !== null)
       cancelAnimationFrame(animationRef.current);
     ```

3. Dependências / versões
   - Se houver erros de peer-deps ou incompatibilidade, verifique sua versão do Node.js.
   - Atualizar `pnpm`/`node` costuma resolver incompatibilidades com binários nativos.

## Como contribuir

- Faça um fork / branch e abra PR com mudanças pequenas e objetivas.
- Siga o padrão TypeScript/React usado no projeto.
- Para mudança visual/UX, envie screenshots e descreva o comportamento esperado.

## Executando verificações locais

- Lint: (se configurado)
  ```powershell
  pnpm run lint
  ```

## Pontos a observar

- Se você modificar componentes que geram HTML/CSS dinamicamente, assegure que a saída seja determinística no servidor, ou então execute essa lógica apenas no cliente (usar `use client` + `useEffect`).

## Contato

Se quiser, cole aqui os erros do terminal ou prints do navegador e eu ajudo a depurar.

---

README gerado automaticamente pelo assistente para facilitar setup e debugging.
