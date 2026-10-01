import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { site,pages,apps } from '../site.config.mjs';
const dist=new URL('../dist/',import.meta.url);
test('Every page is crawlable, canonical and semantically structured',async()=>{
  for(const page of pages) {
    const html=await readFile(new URL(`${page.path}index.html`,dist),'utf8');
    assert.equal([...html.matchAll(/<h1[ >]/g)].length,1);
    assert(html.includes(`<link rel="canonical" href="${new URL(page.path,site.url)}">`));
    assert(html.includes('<meta name="description"'));
    assert(!/noindex/.test(html));
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.url,new URL(page.path,site.url).href);
    for(const [,src] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      if(/^(https:|mailto:)/.test(src))continue;
      const clean=src.split('#')[0];if(clean==='./'||clean==='../')continue;
      const resource=new URL(page.path+clean,dist);
      await readFile(clean.endsWith('/')?new URL('index.html',resource):resource);
    }
  }
});
test('The shelf matches its data source and links to real programme routes',async()=>{
  const html=await readFile(new URL('index.html',dist),'utf8');
  assert.equal([...html.matchAll(/class="tool"/g)].length,apps.length);
  assert.equal(new Set(apps.map(a=>a.slug)).size,apps.length);
  for(const app of apps)assert(html.includes(`https://freewarecatalog.com/programs/${app.slug}/`));
  assert(!html.includes('aggregateRating'));
});
test('Sitemap and IndexNow proof share the correct project scope',async()=>{
  const sitemap=await readFile(new URL('sitemap.xml',dist),'utf8');
  const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.deepEqual(urls,pages.map(p=>new URL(p.path,site.url).href));
  assert.equal((await readFile(new URL(`${site.indexNowKey}.txt`,dist),'utf8')).trim(),site.indexNowKey);
});
