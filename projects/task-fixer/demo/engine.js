/* Simulación local: sin red, clientes ni mensajes reales. */
(function(root){
function create(){return {day:0,requests:[],events:[],log:[]};}
function act(s,type,p={}){
 const note=t=>s.log.unshift(`Día ${s.day}: ${t}`);
 if(type==='receive'){
  if(!p.eventId)throw Error('Falta la identificación de esta entrada.');
  if(s.events.includes(p.eventId)){note('Entrada repetida: se conserva la solicitud existente.');return;}
  s.events.push(p.eventId);s.requests.push({id:p.eventId,name:p.name||'Ejemplo',work:p.work||'Pintura',zone:p.zone||'',contact:p.contact||'',owner:'',amount:null,approved:false,state:'new',sentDay:null,followed:false});note('Solicitud recibida.');return;
 }
 if(type==='advance'){s.day++;note('Avanzó un día de la simulación.');return;}
 const r=s.requests.find(x=>x.id===p.id);if(!r)throw Error('Elige una solicitud.');
 const ready=()=>{if(!r.zone||!r.contact||!r.owner)throw Error('Primero completa zona, contacto y responsable.');};
 if(type==='complete'){if(r.state!=='new')throw Error('Esta solicitud ya pasó a envío.');r.zone=p.zone;r.contact=p.contact;r.owner=p.owner;r.approved=false;note('Datos revisados; falta aprobar la cotización.');}
 else if(type==='approve'){ready();if(r.state!=='new')throw Error('La cotización ya está en proceso.');if(!Number.isFinite(p.amount)||p.amount<=0)throw Error('Introduce un importe mayor que cero.');r.amount=p.amount;r.approved=true;note('El dueño aprobó el importe y el envío de esta cotización.');}
 else if(type==='send'){
  ready();if(!r.approved)throw Error('El dueño debe aprobar primero.');
  if(!['new','failed'].includes(r.state))throw Error('No se puede volver a enviar en este estado.');
  if(p.outcome==='fail'){r.state='failed';note('Fallo confirmado antes del envío: queda pendiente reintentar.');}
  else if(p.outcome==='unknown'){r.state='review';note('Resultado de envío incierto: revisar antes de cualquier reintento.');}
  else{r.state='sent';r.sentDay=s.day;note('Envío simulado confirmado.');}
 }
 else if(type==='resolve'){if(r.state!=='review')throw Error('No hay envío incierto para revisar.');if(p.delivered){r.state='sent';r.sentDay=s.day;note('Revisión manual: se confirmó el envío simulado.');}else{r.state='failed';note('Revisión manual: se confirmó que no salió.');}}
 else if(type==='follow'){if(r.state!=='sent'||r.followed||s.day-r.sentDay<2)throw Error('El seguimiento corresponde a los dos días y solo una vez.');if(!p.authorized)throw Error('Autoriza este seguimiento primero.');r.followed=true;note('Seguimiento simulado autorizado por el dueño.');}
 else if(type==='close'){if(r.state!=='sent')throw Error('Primero confirma que la cotización salió.');r.state='closed';note('El cliente respondió: solicitud cerrada.');}
 else throw Error('Acción desconocida.');
}
const api={create,act};if(typeof module!=='undefined')module.exports=api;else root.TaskFixer=api;
})(globalThis);
