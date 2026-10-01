import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { site, pages, apps } from '../site.config.mjs';
import { render } from '../src/render.mjs';
const root = new URL('../', import.meta.url);
const base = new URL(site.url);
if (!base.pathname.endsWith('/') || base.search || base.hash || base.protocol !== 'https:') throw new Error('SITE_URL must be a clean HTTPS directory URL ending in /.');
const output = new URL('dist/', root);
await mkdir(new URL('assets/', output), {recursive:true});
for (const page of pages) {
  await mkdir(new URL(page.path, output), {recursive:true});
  await writeFile(new URL(`${page.path}index.html`, output), render(page, site, apps));
}
for (const file of ['site.css','site.js','mark.svg','social.svg']) await copyFile(new URL(`assets/${file}`,root),new URL(`assets/${file}`,output));
await writeFile(new URL('sitemap.xml',output),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${new URL(p.path,base).href}</loc><lastmod>${site.modified}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(new URL(`${site.indexNowKey}.txt`,output),`${site.indexNowKey}\n`);
await writeFile(new URL('.nojekyll',output),'');
console.log(`Built ${pages.length} pages and ${apps.length} tool cards. Canonical base: ${base.href}`);
