// Simulador de contrato IndexedDB para pruebas Node; no sustituye un navegador.
const clone=x=>x===undefined?undefined:JSON.parse(JSON.stringify(x));
module.exports=function(){
 const databases=new Map();let fail=false;
 return {failNext(){fail=true;},corrupt(name,value){databases.get(name).value=value;},open(name){
  const req={};queueMicrotask(()=>{
   const fresh=!databases.has(name);if(fresh)databases.set(name,{value:undefined,tail:Promise.resolve()});const data=databases.get(name);
   req.result={objectStoreNames:{contains(){return !fresh;}},createObjectStore(){},close(){},transaction(){
    let release;const before=data.tail;data.tail=new Promise(r=>release=r);let candidate,aborted=false;
    const tx={error:null,abort(){aborted=true;},objectStore(){return {get(){const read={};before.then(()=>{candidate=clone(data.value);read.result=clone(candidate);read.onsuccess();queueMicrotask(()=>{if(fail){fail=false;aborted=true;tx.error=Error('Espacio insuficiente');}if(aborted)tx.onabort();else{data.value=clone(candidate);tx.oncomplete();}release();});});return read;},put(v){candidate=clone(v);}};}};return tx;
   }};
   if(fresh)req.onupgradeneeded();req.onsuccess();
  });return req;
 }};
};
