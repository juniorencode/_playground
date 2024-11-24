import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

import animationPlugin from '../src/index.js';

const TAILWIND_BASE = '@tailwind utilities;';

export function generatePluginCSS(options) {
  const { inline = '', content = '' } = options;

  return postcss([
    tailwindcss({
      plugins: [animationPlugin],
      content: [{ raw: content }]
    })
  ])
    .process(`${TAILWIND_BASE} ${inline}`)
    .then(result => result.css);
}

console.log(
  await generatePluginCSS({
    content: '<div class="animation-delay-150 animate-zoom-in">Hello</div>'
  })
);
