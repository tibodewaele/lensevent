import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.lensevent.be',
  outDir: process.env.LENS_OUTDIR || './dist',
  output: 'static',
  adapter: vercel(),
});
