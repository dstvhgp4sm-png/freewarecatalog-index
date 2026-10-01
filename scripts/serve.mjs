import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const port=Number(process.env.PORT||4174);
createServer(async(req,res)=>{
  try {
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname.endsWith('/'))pathname+='index.html';
    const path=resolve(root,`.${pathname}`);
    if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const content=await readFile(path);
    res.writeHead(200,{'content-type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'})[extname(path)]||'application/octet-stream'});res.end(content);
  } catch {res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}`));
