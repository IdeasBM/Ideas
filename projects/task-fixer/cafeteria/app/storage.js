(function(root){
'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
function validate(r){
 if(!r||![1,2].includes(r.schema)||!Number.isSafeInteger(r.revision)||r.revision<1||!r.state||!['students','products','events','seen'].every(k=>Array.isArray(r.state[k])))throw Error('Los datos guardados no son compatibles. No se han reemplazado.');
 if(!r.state.config||typeof r.state.config.name!=='string'||!['MXN','USD'].includes(r.state.config.currency)||typeof r.state.config.timezone!=='string'||typeof r.state.config.cycle!=='string'||typeof r.state.config.initialized!=='boolean')throw Error('Configuración local inválida.');
 const state=r.state,bad=()=>{throw Error('El registro local contiene datos inválidos. No se ha reemplazado.');};
 const ids=list=>{if(new Set(list.map(x=>x?.id)).size!==list.length||list.some(x=>!x||typeof x.id!=='string'||! /^[a-zA-Z0-9_-]+$/.test(x.id)))bad();};
 ids(state.students);ids(state.products);ids(state.events);
 if(state.students.some(x=>typeof x.name!=='string'||typeof x.group!=='string'||!Number.isSafeInteger(x.opening)))bad();
 if(state.students.some(a=>(a.level!==undefined&&!['','kinder','primaria','secundaria','preparatoria'].includes(a.level))||(a.firstName!==undefined&&typeof a.firstName!=='string')||(a.surnames!==undefined&&typeof a.surnames!=='string')||(a.firstName!==undefined&&a.surnames!==undefined&&a.name!==[a.firstName,a.surnames].filter(Boolean).join(' '))))bad();
 if(state.products.some(x=>typeof x.name!=='string'||!Number.isSafeInteger(x.price)||x.price<=0))bad();
 if(state.events.some(e=>!['cash','sale','payment'].includes(e.kind)||!Number.isSafeInteger(e.total)||e.total<=0||e.kind!=='cash'&&!state.students.some(a=>a.id===e.student)))bad();
 if(state.seen.length!==state.events.length||new Set(state.seen).size!==state.seen.length||state.events.some(e=>!state.seen.includes(e.id)))bad();
 if(r.schema===2){
  if(typeof state.config.school!=='string'||typeof state.config.location!=='string'||!Array.isArray(state.categories))bad();ids(state.categories);
  if(state.categories.some(c=>typeof c.name!=='string'||!c.name.trim()))bad();
  if(state.products.some(p=>typeof p.description!=='string'||!state.categories.some(c=>c.id===p.categoryId)))bad();
  if(state.students.some(a=>!(a.grade===null||Number.isInteger(a.grade)&&a.grade>=1&&a.grade<=6)||!(a.groupLetter===null||/^[A-F]$/.test(a.groupLetter))))bad();
 }
 return r;
}
function create(indexedDB,name='task-fixer-cafeteria-beta'){
 let connection;
 function open(){if(connection)return connection;connection=new Promise((resolve,reject)=>{
  if(!indexedDB){reject(Error('Este navegador no permite guardar los datos.'));return;}
  const req=indexedDB.open(name,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('state'))req.result.createObjectStore('state');};
  req.onerror=()=>reject(req.error||Error('No se pudo abrir el guardado local.'));
  req.onblocked=()=>reject(Error('Cierra las otras pestañas de esta app y vuelve a abrirla.'));
  req.onsuccess=()=>{req.result.onversionchange=()=>{req.result.close();connection=null;};resolve(req.result);};
 });return connection;}
 async function transact(change,seed){
  const db=await open();return new Promise((resolve,reject)=>{
   let result,problem;
   const tx=db.transaction('state','readwrite'),store=tx.objectStore('state'),req=store.get('current');
   tx.oncomplete=()=>resolve(clone(result));
   tx.onabort=()=>reject(problem||tx.error||Error('No se guardó la operación. Intenta de nuevo.'));
   tx.onerror=()=>{};
   req.onsuccess=()=>{try{
    let record=req.result;
    if(record===undefined){record={schema:2,revision:1,state:clone(seed())};store.put(record,'current');}
    validate(record);
    if(record.schema===1){
     if(record.revision===Number.MAX_SAFE_INTEGER)throw Error('No se puede migrar la versión de datos.');
     store.put(clone(record),'before-schema-2');
     const upgraded=clone(record.state);upgraded.config.school??='';upgraded.config.location??='';upgraded.categories=seed().categories;
     for(const p of upgraded.products){p.categoryId='uncategorized';p.description='';}
     for(const a of upgraded.students){const match=a.group.match(/^([1-6])\s*[°º]?\s*([A-F])$/i);a.grade=match?Number(match[1]):null;a.groupLetter=match?match[2].toUpperCase():null;}
     record={schema:2,revision:record.revision+1,state:upgraded};validate(record);store.put(record,'current');
    }
    const draft=clone(record.state),changed=change?change(draft)!==false:false;
    if(changed){if(record.revision===Number.MAX_SAFE_INTEGER)throw Error('No se puede avanzar la versión de datos.');record={schema:2,revision:record.revision+1,state:draft};validate(record);store.put(record,'current');}
    result={...record,changed};
   }catch(e){problem=e;tx.abort();}};
  });
 }
 return {load:seed=>transact(null,seed),update:(change,seed)=>transact(change,seed)};
}
const api={create,validate};if(typeof module!=='undefined')module.exports=api;else root.CafeStorage=api;
})(globalThis);
