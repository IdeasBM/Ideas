// Simulador de contrato IndexedDB para Node; no sustituye pruebas en navegador.
const clone=x=>x===undefined?undefined:structuredClone(x);
module.exports=function(){
 const databases=new Map();let fail=false,failWrite=false;
 return {failNextWrite(){failWrite=true;},write(name,key,value){databases.get(name).values.set(key,clone(value));},failNext(){fail=true;},corrupt(name,value){databases.get(name).values.set('current',value);},read(name,key='current'){return clone(databases.get(name)?.values.get(key));},open(name){
  const req={};queueMicrotask(()=>{
   const fresh=!databases.has(name);if(fresh)databases.set(name,{values:new Map(),tail:Promise.resolve()});const data=databases.get(name);
   req.result={objectStoreNames:{contains(){return !fresh;}},createObjectStore(){},close(){},transaction(_name,mode){
    let release;const before=data.tail;data.tail=new Promise(r=>release=r);let candidate,aborted=false;
    const tx={error:null,abort(){aborted=true;},objectStore(){return {get(key){const read={};before.then(()=>{candidate=new Map([...data.values].map(([k,v])=>[k,clone(v)]));read.result=clone(candidate.get(key));read.onsuccess();queueMicrotask(()=>{if(fail||(failWrite&&mode==='readwrite')){fail=false;failWrite=false;aborted=true;tx.error=Error('Espacio insuficiente');}if(aborted)tx.onabort();else{data.values=candidate;tx.oncomplete();}release();});});return read;},put(v,key){candidate.set(key,clone(v));},clear(){candidate.clear();}};}};return tx;
   }};
   if(fresh)req.onupgradeneeded();req.onsuccess();
  });return req;
 }};
};
