import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

import animationPlugin from '../src/index.js';

const TAILWIND_BASE = '@tailwind utilities;';

export function generatePluginCSS(options) {
  return postcss([
    tailwindcss({
      plugins: [animationPlugin]
    })
  ])
    .process(`${TAILWIND_BASE} .content { @apply animate-fade-in }`)
    .then(result => result.css);
}

console.log(await generatePluginCSS());
