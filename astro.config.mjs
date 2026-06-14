import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Pas dit aan naar je eigen domein (gebruikt voor sitemap & canonical URLs)
  site: 'https://www.lensevent.be',
  outDir: process.env.LENS_OUTDIR || './dist',
});
