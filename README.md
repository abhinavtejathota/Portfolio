# Portfolio

Interactive pixel-art portfolio built with React, Vite, and Tailwind CSS.

## Setup

```bash
npm install
# create data/portfolio.private.json with your details (gitignored)
npm run data:encode
npm run dev
```

Private data lives in `data/portfolio.private.json` (gitignored). Run `npm run data:encode` before dev/build to generate the obfuscated bundle.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run data:encode` — regenerate obfuscated portfolio bundle
