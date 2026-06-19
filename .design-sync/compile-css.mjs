// Compiles the repo's Tailwind v4 globals.css into a static stylesheet for
// design-sync's cfg.cssEntry. The showroom styles components with Tailwind
// utility classes + arbitrary values + var(--ds-*) tokens; the raw globals.css
// only has `@import "tailwindcss"`, so it must be compiled (utilities emitted,
// tokens inlined) before the converter can scrape it.
//
// Run from the repo root: `node .design-sync/compile-css.mjs`
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url)); // .design-sync
const wrapperPath = join(here, '.tw-entry.css');
// Pull in the real tokens + custom utilities (globals.css) and tell Tailwind to
// scan src/ for used classes (explicit @source, not just auto-detection).
const wrapper = `@import "../src/app/globals.css";\n@source "../src";\n`;
writeFileSync(wrapperPath, wrapper);

const result = await postcss([tailwind()]).process(wrapper, { from: wrapperPath });
let css = result.css;

// The app supplies Geist / Geist Mono at runtime via next/font, so the raw
// stylesheet only references --font-geist-sans/-mono (never defines them) and
// previews would fall back to Arial. Load Geist from Google Fonts for parity
// and define the vars. The @import must sit after the leading @layer
// statements but before the first @layer block (CSS @import ordering rule).
const fontImport =
  "@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');\n";
const layerStmt = '@layer theme, base, components, utilities;';
css = css.includes(layerStmt)
  ? css.replace(layerStmt, layerStmt + '\n' + fontImport)
  : fontImport + css;
css +=
  '\n/* Geist brand font: next/font at runtime in-app; loaded above for preview/design parity. */\n' +
  ':root {\n' +
  '  --font-geist-sans: "Geist", system-ui, -apple-system, "Segoe UI", sans-serif;\n' +
  '  --font-geist-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;\n' +
  '}\n';

const outPath = join(here, 'compiled.css');
writeFileSync(outPath, css);
console.error(`[css] wrote ${outPath} (${css.length} bytes)`);
