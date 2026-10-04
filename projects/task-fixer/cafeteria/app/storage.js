(function(root){
'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
function validate(r){
 if(!r||![1,2,3].includes(r.schema)||!Number.isSafeInteger(r.revision)||r.revision<1||!r.state||!['students','products','events','seen'].every(k=>Array.isArray(r.state[k])))throw Error('Los datos guardados no son compatibles. No se han reemplazado.');
 if(!r.state.config||typeof r.state.config.name!=='string'||!['MXN','USD'].includes(r.state.config.currency)||typeof r.state.config.timezone!=='string'||typeof r.state.config.cycle!=='string'||typeof r.state.config.initialized!=='boolean')throw Error('Configuración local inválida.');
 try{new Intl.DateTimeFormat('es',{timeZone:r.state.config.timezone});}catch(e){throw Error('Zona horaria inválida en el guardado.');}
 const state=r.state,bad=()=>{throw Error('El registro local contiene datos inválidos. No se ha reemplazado.');};
 const ids=list=>{if(new Set(list.map(x=>x?.id)).size!==list.length||list.some(x=>!x||typeof x.id!=='string'||! /^[a-zA-Z0-9_-]+$/.test(x.id)))bad();};
 ids(state.students);ids(state.products);ids(state.events);
 if(state.students.some(x=>typeof x.name!=='string'||typeof x.group!=='string'||!Number.isSafeInteger(x.opening)))bad();
 if(state.students.some(a=>(a.level!==undefined&&!['','kinder','primaria','secundaria','preparatoria'].includes(a.level))||(a.firstName!==undefined&&typeof a.firstName!=='string')||(a.surnames!==undefined&&typeof a.surnames!=='string')||(a.firstName!==undefined&&a.surnames!==undefined&&a.name!==[a.firstName,a.surnames].filter(Boolean).join(' '))))bad();
 if([...state.students,...state.products].some(a=>a.archived!==undefined&&typeof a.archived!=='boolean'))bad();
 if(state.products.some(p=>p.initialStock!==undefined&&p.initialStock!==null&&(!Number.isSafeInteger(p.initialStock)||p.initialStock<0||typeof p.stockCountedAt!=='string'||Number.isNaN(Date.parse(p.stockCountedAt)))))bad();
 if(state.products.some(x=>typeof x.name!=='string'||!Number.isSafeInteger(x.price)||x.price<=0))bad();
 if(state.events.some(e=>!(r.schema===3?['cash','sale','payment','opening','reverse','refund-credit','refund-cash']:['cash','sale','payment']).includes(e.kind)||!Number.isSafeInteger(e.total)||e.total<=0||!['cash','reverse','refund-cash'].includes(e.kind)&&!state.students.some(a=>a.id===e.student)))bad();
 if(state.seen.length!==state.events.length||new Set(state.seen).size!==state.seen.length||state.events.some(e=>!state.seen.includes(e.id)))bad();
 if(r.schema>=2){
  if(typeof state.config.school!=='string'||typeof state.config.location!=='string'||!Array.isArray(state.categories))bad();ids(state.categories);
  if(state.categories.some(c=>typeof c.name!=='string'||!c.name.trim()))bad();
  if(state.products.some(p=>typeof p.description!=='string'||!state.categories.some(c=>c.id===p.categoryId)))bad();
  if(state.students.some(a=>!(a.grade===null||Number.isInteger(a.grade)&&a.grade>=1&&a.grade<=6)||!(a.groupLetter===null||/^[A-F]$/.test(a.groupLetter))))bad();
 }
 if(r.schema===3){
  if(!['sessions','cashMoves','documents'].every(k=>Array.isArray(state[k])))bad();ids(state.sessions);ids(state.cashMoves);ids(state.documents);
  if(state.sessions.filter(x=>!x.closedAt).length>1)bad();
  const time=v=>typeof v==='string'&&!Number.isNaN(Date.parse(v));
  if(state.sessions.some(x=>!Number.isSafeInteger(x.fund)||x.fund<0||!time(x.openedAt)||(x.closedAt&&(!time(x.closedAt)||!Number.isSafeInteger(x.counted)||x.counted<0||!Number.isSafeInteger(x.difference)||!x.snapshot))))bad();
  if(state.cashMoves.some(x=>!state.sessions.some(y=>y.id===x.sessionId)||!['in','out'].includes(x.direction)||!Number.isSafeInteger(x.total)||x.total<=0||typeof x.reason!=='string'||!x.reason.trim()||!time(x.occurredAt)))bad();
  const reversals=new Set();
  for(const e of state.events){
   if(e.student&&!state.students.some(a=>a.id===e.student))bad();
   if(e.sessionId&&!state.sessions.some(x=>x.id===e.sessionId))bad();
   if(e.sequence!==undefined&&(!time(e.occurredAt)||!Number.isSafeInteger(e.sequence)))bad();
   if(['cash','sale'].includes(e.kind)){if(!Array.isArray(e.items)||!e.items.length||e.items.some(p=>!Number.isSafeInteger(p.qty)||p.qty<1||!Number.isSafeInteger(p.price)||p.price<0))bad();const t=e.items.reduce((n,p)=>n+p.qty*p.price,0);if(!Number.isSafeInteger(t)||t!==e.total)bad();}
   if(['cash','payment','refund-cash','refund-credit'].includes(e.kind)&&e.sequence!==undefined&&!['cash','transfer'].includes(e.method))bad();
   if(e.kind==='opening'&&(!['debt','credit'].includes(e.direction)||!e.reason?.trim()))bad();
   if(e.kind==='reverse'){const t=state.events.find(x=>x.id===e.target);if(!t||!['cash','sale','payment','opening'].includes(t.kind)||e.total!==t.total||reversals.has(t.id)||e.student!==(t.student||null)||!e.reason?.trim())bad();reversals.add(t.id);}
   if(e.kind==='refund-credit'&&(!e.delivered||!e.reason?.trim()))bad();
   if(e.kind==='refund-cash'){const t=state.events.find(x=>x.id===e.target);if(!t||t.kind!=='cash'||!e.delivered||!e.reason?.trim())bad();}
  }
  for(const t of state.events.filter(e=>e.kind==='cash')){const refunded=state.events.filter(e=>e.kind==='refund-cash'&&e.target===t.id).reduce((n,e)=>n+e.total,0);if(!Number.isSafeInteger(refunded)||refunded>t.total||refunded&&!state.events.some(e=>e.kind==='reverse'&&e.target===t.id))bad();}
  if(state.documents.some(d=>!state.students.some(a=>a.id===d.student)||typeof d.name!=='string'||typeof d.group!=='string'||!Array.isArray(d.rows)||d.rows.some(x=>typeof x.label!=='string'||!Number.isSafeInteger(x.amount))||!Number.isSafeInteger(d.balance)||!Number.isSafeInteger(d.previous)||typeof d.folio!=='string'||!d.business||!['MXN','USD'].includes(d.business.currency)||typeof d.business.name!=='string'||typeof d.business.timezone!=='string'||!time(d.issuedAt)))bad();
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
 async function transact(change,seed,expected){
  const db=await open();return new Promise((resolve,reject)=>{
   let result,problem;
   const tx=db.transaction('state','readwrite'),store=tx.objectStore('state'),req=store.get('current');
   tx.oncomplete=()=>resolve(clone(result));
   tx.onabort=()=>reject(problem||tx.error||Error('No se guardó la operación. Intenta de nuevo.'));
   tx.onerror=()=>{};
   req.onsuccess=()=>{try{
    let record=req.result;
    if(record===undefined){record={schema:3,revision:1,state:clone(seed())};store.put(record,'current');}
    validate(record);
    if(record.schema===1){
     if(record.revision===Number.MAX_SAFE_INTEGER)throw Error('No se puede migrar la versión de datos.');
     store.put(clone(record),'before-schema-2');
     const upgraded=clone(record.state);upgraded.config.school??='';upgraded.config.location??='';upgraded.categories=seed().categories;
     for(const p of upgraded.products){p.categoryId='uncategorized';p.description='';}
     for(const a of upgraded.students){const match=a.group.match(/^([1-6])\s*[°º]?\s*([A-F])$/i);a.grade=match?Number(match[1]):null;a.groupLetter=match?match[2].toUpperCase():null;}
     record={schema:2,revision:record.revision+1,state:upgraded};validate(record);store.put(record,'current');
    }
    if(record.schema===2){if(record.revision===Number.MAX_SAFE_INTEGER)throw Error('No se puede migrar la versión de datos.');store.put(clone(record),'before-schema-3');const upgraded=clone(record.state);upgraded.sessions=[];upgraded.cashMoves=[];upgraded.documents=[];record={schema:3,revision:record.revision+1,state:upgraded};validate(record);store.put(record,'current');}
    if(change&&expected!==undefined&&expected!==record.revision)throw Error('Hay cambios desde otra pestaña. Recarga antes de continuar; tu borrador no se ha guardado.');
    const draft=clone(record.state),changed=change?change(draft)!==false:false;
    if(changed){if(record.revision===Number.MAX_SAFE_INTEGER)throw Error('No se puede avanzar la versión de datos.');record={schema:3,revision:record.revision+1,state:draft};validate(record);store.put(record,'current');}
    result={...record,changed};
   }catch(e){problem=e;tx.abort();}};
  });
 }
 async function restore(imported,seed,expected){
  validate(imported);if(imported.schema!==3)throw Error('Primero actualiza el equipo que generó ese respaldo.');
  const db=await open();return new Promise((resolve,reject)=>{let result,problem;const tx=db.transaction('state','readwrite'),store=tx.objectStore('state'),req=store.get('current');tx.oncomplete=()=>resolve(clone(result));tx.onabort=()=>reject(problem||tx.error||Error('No se restauró el respaldo.'));tx.onerror=()=>{};req.onsuccess=()=>{try{const old=validate(req.result);if(old.revision!==expected)throw Error('La instalación cambió. Recarga y revisa antes de restaurar.');if(old.revision===Number.MAX_SAFE_INTEGER)throw Error('Revisión fuera de rango.');store.put(clone(old),'before-restore');result={schema:3,revision:old.revision+1,state:clone(imported.state),changed:true};validate(result);store.put(result,'current');}catch(e){problem=e;tx.abort();}};});
 }
 return {load:seed=>transact(null,seed),update:(change,seed,expected)=>transact(change,seed,expected),restore};
}
const api={create,validate};if(typeof module!=='undefined')module.exports=api;else root.CafeStorage=api;
})(globalThis);
