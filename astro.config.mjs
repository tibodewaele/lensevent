import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.lensevent.be',
  outDir: process.env.LENS_OUTDIR || './dist',
  output: 'hybrid',
  adapter: vercel(),
});
