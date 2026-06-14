import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BRuuhGsz.mjs';
import { manifest } from './manifest_T22kUjVh.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/approve.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/templates.astro.mjs');
const _page4 = () => import('./pages/photobooth-huren-_stad_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/approve.ts", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/templates.astro", _page3],
    ["src/pages/photobooth-huren-[stad].astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "da210b5e-e8e2-4455-9340-614eb65985fc",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
