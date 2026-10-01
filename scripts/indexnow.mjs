import assert from 'node:assert/strict';
import { site } from '../site.config.mjs';
const base = new URL(site.url);
assert.notEqual(base.hostname,'example.github.io','Set SITE_URL to the real published Pages address before submission.');
const get = url => fetch(url,{redirect:'manual',signal:AbortSignal.timeout(20000)});
const sitemapResponse = await get(new URL('sitemap.xml',base));
assert.equal(sitemapResponse.status,200,'Published sitemap is unavailable.');
const sitemap = await sitemapResponse.text();
assert(sitemap.trim().startsWith('<?xml'),'Sitemap must be XML, not an HTML fallback.');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
assert(urls.length>0 && urls.length<=10000 && new Set(urls).size===urls.length,'Invalid sitemap URL list.');
for(const url of urls) {
  const u=new URL(url);assert.equal(u.origin,base.origin,'Foreign host in sitemap.');
  assert(u.pathname.startsWith(base.pathname),'URL lies outside the project key scope.');
  const r=await get(u);assert.equal(r.status,200,`Page is unavailable: ${url}`);
  assert(!/noindex/i.test(r.headers.get('x-robots-tag')||''),'Page is blocked by HTTP noindex.');
  const html=await r.text();assert(!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html),'Page is blocked by meta noindex.');
  assert(html.includes(`<link rel="canonical" href="${url}">`),'Published canonical does not match sitemap.');
}
const keyLocation=new URL(`${site.indexNowKey}.txt`,base).href;
const proof=await get(keyLocation);assert.equal(proof.status,200,'IndexNow ownership proof is not published.');
assert.equal((await proof.text()).trim(),site.indexNowKey,'Ownership proof must contain the key, not be empty.');
console.log(JSON.stringify({host:base.hostname,urls,ownershipProofVerified:true,dryRun:!process.argv.includes('--submit')}));
if(process.argv.includes('--submit')) {
  const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:base.hostname,key:site.indexNowKey,keyLocation,urlList:urls}),signal:AbortSignal.timeout(30000)});
  console.log(JSON.stringify({receivedAt:new Date().toISOString(),status:response.status,submitted:urls.length,accepted:[200,202].includes(response.status),keyValidationPending:response.status===202,indexingConfirmed:false}));
  assert([200,202].includes(response.status),`IndexNow returned HTTP ${response.status}. No automatic retry was made.`);
}
