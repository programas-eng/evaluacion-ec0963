import {getStore} from '@netlify/blobs';
import {timingSafeEqual} from 'node:crypto';
export default async(request)=>{
 if(request.method!=='GET')return Response.json({error:'Método no permitido'},{status:405});
 const secret=process.env.ADMIN_KEY||'';const provided=(request.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');
 const a=Buffer.from(provided),b=Buffer.from(secret);
 if(!secret||a.length!==b.length||!timingSafeEqual(a,b))return Response.json({error:'No autorizado'},{status:401,headers:{'Cache-Control':'no-store'}});
 try{const store=getStore('ec0963-respuestas');const responses=[];let cursor;
 do{const page=await store.list({paginate:true,cursor});for(const item of page.blobs){const entry=await store.get(item.key,{type:'json'});if(entry)responses.push(entry)}cursor=page.cursor}while(cursor);
 responses.sort((a,b)=>a.date.localeCompare(b.date));return Response.json({responses},{headers:{'Cache-Control':'no-store'}})
 }catch(e){console.error(e);return Response.json({error:'No fue posible recuperar los datos'},{status:500})}
};
