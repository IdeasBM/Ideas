(function(root){
'use strict';
function create({context,getRecord,store,onStatus,request,setTimer=setTimeout,clearTimer=clearTimeout,online=()=>true,grant=async()=>{},offlineAllowed=async()=>false,onRevoked=()=>{},random=()=>root.crypto.getRandomValues(new Uint8Array(16))}){
 const key='task-fixer-cloud-'+context.id;let identity;
 try{identity=JSON.parse(store.getItem(key)||'null');if(!identity||! /^[a-f0-9]{32}$/.test(identity.device)||!Number.isSafeInteger(identity.head)||identity.head<0){identity={device:Array.from(random(),x=>x.toString(16).padStart(2,'0')).join(''),head:0,savedAt:null,revision:0};store.setItem(key,JSON.stringify(identity));}}
 catch(e){throw Error('El navegador no permite conservar la identidad del respaldo.');}
 let timer=null,running=null,checking=null,paused=false,blocked=identity.recoveryPending===true||identity.revoked===true;
 const report=t=>onStatus(t),remember=()=>store.setItem(key,JSON.stringify(identity));if(identity.revoked){onRevoked('Otro equipo tomó el control.');report('Captura detenida · recupera desde IONOS.');}else if(blocked)report('Recuperación pendiente · revisa y completa el respaldo de IONOS antes de continuar.');
 async function api(action,data={}){return request({action,...data});}
 async function revoke(message){blocked=true;identity.revoked=true;remember();await grant(0);onRevoked(message);report('Captura detenida · '+message);}
 async function guard(){if(checking)return checking;checking=guardImpl();try{return await checking;}finally{checking=null;}}
 async function guardImpl(){if(!context.guard)return;if(blocked)throw Error('Captura detenida. Revisa y recupera el respaldo de IONOS.');await pause();try{if(blocked)throw Error('Captura detenida. Recupera desde IONOS.');if(!online()){if(!await offlineAllowed())throw Error('El permiso sin internet venció. Conecta y entra a IONOS.');return;}try{const r=await api('authorize',{device:identity.device,base:identity.head});await grant(r.offlineUntil);}catch(e){if(e.status===409){await revoke(e.message);throw e;}if(!e.status&&await offlineAllowed()){report('Sin conexión · permiso local vigente.');return;}throw e;}}finally{paused=false;}}
 async function verify(){if(!context.guard||!online()||blocked)return;await guard();}
 async function flush(){
  if(paused||blocked)return;if(running)return running;
  if(!online()){report('Respaldo pendiente · sin conexión. Guardado en este teléfono.');return;}
  running=(async()=>{try{const r=await getRecord();if(!r.state.config.initialized){report('Configura tu cafetería o recupera un respaldo de IONOS.');return;}
   report('Respaldando en IONOS…');const result=await api('save',{device:identity.device,base:identity.head,record:r});
   identity={...identity,head:result.head,savedAt:result.savedAt,revision:r.revision};remember();
   const current=await getRecord();report(current.revision===r.revision?'Respaldado en IONOS · '+result.savedAt:'Respaldo pendiente · hay nuevos cambios.');
   if(current.revision!==r.revision)queue();
  }catch(e){if(e.status===409){if(context.guard)await revoke(e.message);else{blocked=true;report('Respaldo detenido: '+e.message);}}else{report(e.status===401?'Respaldo pendiente · vuelve a entrar. Lo capturado sigue en este teléfono.':'Respaldo pendiente · '+e.message);if(!paused&&e.status!==401)timer=setTimer(()=>{timer=null;flush();},30000);}}
  finally{running=null;}})();return running;
 }
 function queue(){if(paused||blocked)return;if(timer)clearTimer(timer);report('Guardado en el teléfono · respaldo pendiente.');timer=setTimer(()=>{timer=null;flush();},1000);}
 async function pause(){paused=true;if(timer)clearTimer(timer);timer=null;if(running)await running;}
 function resume(){paused=false;queue();}
 function acceptHead(head,savedAt){identity={...identity,head,savedAt,revision:0};remember();blocked=identity.recoveryPending===true;}
 async function inspect(){await pause();try{return await api('download');}catch(e){resume();throw e;}}
 async function claim(base,password){identity={...identity,recoveryPending:true};remember();blocked=true;const r=await api('claim',{device:identity.device,base,password});acceptHead(r.head,r.savedAt);return r;}
 function completeRecovery(){identity={...identity,recoveryPending:false,revoked:false};remember();blocked=false;}
 return {flush,queue,pause,resume,guard,verify,inspect,claim,completeRecovery,request:api,identity:()=>({...identity})};
}
async function transport(context,body){if(!context.csrf&&root.CafeBoot)Object.assign(context,await root.CafeBoot.refresh());const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);try{const response=await root.fetch(context.api,{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json','X-CSRF-Token':context.csrf},body:JSON.stringify(body),signal:controller.signal});let result;try{result=await response.json();}catch(e){throw Error('El servidor no respondió correctamente.');}if(!response.ok){const error=Error(result.error||'No se pudo completar el respaldo.');error.status=response.status;throw error;}return result;}finally{clearTimeout(timer);}}
const api={create,transport};if(typeof module!=='undefined')module.exports=api;else root.CafeCloud=api;
})(globalThis);
