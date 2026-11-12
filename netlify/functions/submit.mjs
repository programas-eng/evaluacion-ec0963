import {getStore} from '@netlify/blobs';
export default async (request)=>{
 if(request.method!=='POST')return Response.json({error:'Método no permitido'},{status:405});
 try{
  const raw=await request.text();if(raw.length>12000)return Response.json({error:'Solicitud demasiado grande'},{status:413});
  const data=JSON.parse(raw);if(data.website)return Response.json({ok:true});
  const name=String(data.name||'').trim(),org=String(data.org||'').trim(),group=data.group;
  if(!name||name.length>120||!org||org.length>150||!['Grupo 1','Grupo 2'].includes(group)||!Array.isArray(data.answers)||data.answers.length!==13||!data.answers.every(a=>Number.isInteger(a.before)&&Number.isInteger(a.after)&&a.before>=1&&a.before<=5&&a.after>=1&&a.after<=5))return Response.json({error:'Datos incompletos o inválidos'},{status:400});
  const entry={id:crypto.randomUUID(),date:new Date().toISOString(),name,org,group,answers:data.answers};
  await getStore('ec0963-respuestas').setJSON(entry.id,entry);
  return Response.json({ok:true});
 }catch(e){console.error(e);return Response.json({error:'Error al guardar la evaluación'},{status:500})}
};
