(function(root){
'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
function safe(n){if(!Number.isSafeInteger(n))throw Error('El importe acumulado excede el rango permitido.');return n;}
function sum(xs){return xs.reduce((n,x)=>safe(n+x),0);}
function seed(){return {config:{name:'',school:'',location:'',currency:'MXN',timezone:'America/Mexico_City',cycle:'',initialized:false},categories:[{id:'food',name:'Alimentos'},{id:'drinks',name:'Bebidas'},{id:'snacks',name:'Botanas'},{id:'desserts',name:'Postres'},{id:'uncategorized',name:'Sin categoría'}],students:[],products:[],events:[],seen:[],sessions:[],cashMoves:[],documents:[]};}
function total(items){if(!items.length)throw Error('Agrega un producto.');return sum(items.map(x=>{if(!Number.isSafeInteger(x.price)||x.price<0||!Number.isSafeInteger(x.qty)||x.qty<1)throw Error('Revisa cantidad y precio.');return safe(x.qty*x.price);}));}
function signed(e,s){if(e.kind==='sale')return e.total;if(e.kind==='payment')return -e.total;if(e.kind==='opening')return e.direction==='debt'?e.total:-e.total;if(e.kind==='refund-credit')return e.total;if(e.kind==='reverse'){const t=s.events.find(x=>x.id===e.target);return -signed(t,s);}return 0;}
function balance(s,id){const a=s.students.find(x=>x.id===id);if(!a)throw Error('Selecciona un alumno.');return sum([a.opening,...s.events.filter(e=>e.student===id).map(e=>signed(e,s))]);}
function active(s){return s.sessions?.find(x=>!x.closedAt);}
function reversed(s,id){return s.events.some(e=>e.kind==='reverse'&&e.target===id);}
function receipts(e,s){if(e.kind==='cash'||e.kind==='payment')return e.total;if(['refund-cash','refund-credit'].includes(e.kind))return -e.total;if(e.kind==='reverse'){const t=s.events.find(x=>x.id===e.target);return t.kind==='payment'?-t.total:0;}return 0;}
function sales(e,s){if(['cash','sale'].includes(e.kind))return e.total;if(e.kind==='reverse'){const t=s.events.find(x=>x.id===e.target);return ['cash','sale'].includes(t.kind)?-t.total:0;}return 0;}
function post(s,e){
 if(!e.id)throw Error('Falta identificar la operación.');if(s.seen.includes(e.id))return false;
 if(!['cash','sale','payment','opening','reverse','refund-credit','refund-cash'].includes(e.kind))throw Error('Operación no admitida.');
 const a=e.student?s.students.find(a=>a.id===e.student):null;
 if(['sale','payment','opening','refund-credit'].includes(e.kind)&&!a)throw Error('Selecciona un alumno.');
 if(['sale','cash'].includes(e.kind)&&e.student&&(!a||a.archived))throw Error('El alumno está retirado; restáuralo antes de registrar ventas.');
 const now=e.occurredAt;if(!now||Number.isNaN(Date.parse(now)))throw Error('Falta fecha válida de la operación.');
 let amount=['cash','sale'].includes(e.kind)?total(e.items):e.total;
 if(e.kind==='reverse'){
  const t=s.events.find(x=>x.id===e.target);if(!t||!['sale','cash','payment','opening'].includes(t.kind))throw Error('Movimiento no corregible.');if(reversed(s,t.id))throw Error('La operación ya fue anulada.');if(!e.reason?.trim())throw Error('Escribe el motivo de la corrección.');
  amount=t.total;e={...e,student:t.student||null,method:t.kind==='payment'?t.method:null};
 }
 if(!Number.isSafeInteger(amount)||amount<=0)throw Error('Introduce un importe mayor que cero.');
 if(['cash','sale'].includes(e.kind)&&e.items.some(p=>p.id&&s.products.some(x=>x.id===p.id&&x.archived)))throw Error('El producto está retirado del menú.');
 if(e.kind==='opening'){
  if(!['debt','credit'].includes(e.direction)||!e.reason?.trim())throw Error('Revisa el saldo inicial y su motivo.');
  if(a.opening!==0||s.events.some(x=>x.student===a.id&&!(x.kind==='opening'&&reversed(s,x.id)||x.kind==='reverse'&&s.events.find(t=>t.id===x.target)?.kind==='opening')))throw Error('El saldo inicial solo se registra antes de los movimientos del alumno.');
 }
 if(e.kind==='refund-credit'&&amount>Math.max(0,-balance(s,e.student)))throw Error('La devolución excede el saldo a favor.');
 if(e.kind==='refund-cash'){
  const t=s.events.find(x=>x.id===e.target);if(!t||t.kind!=='cash'||!reversed(s,t.id))throw Error('Anula primero la venta pagada.');
  if(amount>sum([t.total,...s.events.filter(x=>x.kind==='refund-cash'&&x.target===t.id).map(x=>-x.total)]))throw Error('La devolución excede el importe pendiente.');
  e={...e,student:t.student||null,method:t.method||null};if(!t.method)throw Error('El cobro antiguo no tiene método. No se puede inventar su devolución.');
 }
 if(['refund-credit','refund-cash'].includes(e.kind)&&(!e.reason?.trim()||!e.delivered))throw Error('Confirma la entrega de dinero y escribe el motivo.');
 if(['cash','payment','refund-credit','refund-cash'].includes(e.kind)&&!['cash','transfer'].includes(e.method))throw Error('Selecciona el método de cobro o devolución.');
 // New UI commands always carry a session. Older test/history records can omit it.
 if(e.sessionId){const session=active(s);if(!session||session.id!==e.sessionId)throw Error('Abre una caja vigente antes de registrar.');}
 const copy=clone({...e,total:amount,sequence:s.events.length+1});
 s.events.push(copy);s.seen.push(e.id);
 try{if(copy.student)balance(s,copy.student);summary(s);if(copy.sessionId)cashSummary(s,copy.sessionId);}catch(error){s.events.pop();s.seen.pop();throw error;}
 return true;
}
function summary(s){return {sales:sum(s.events.map(e=>sales(e,s))),receipts:sum(s.events.map(e=>receipts(e,s)))};}
function day(e,timezone){if(!e.occurredAt||Number.isNaN(Date.parse(e.occurredAt)))return null;const parts=new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(e.occurredAt));const get=k=>parts.find(p=>p.type===k).value;return get('year')+'-'+get('month')+'-'+get('day');}
function report(s,f={}){
 if(f.from&&f.to&&f.from>f.to)throw Error('La fecha inicial debe ser anterior o igual a la final.');
 const normalize=v=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es'),search=normalize((f.search||'').trim());
 const students=s.students.filter(a=>(!search||normalize(a.name).includes(search))&&(!f.level||(f.level==='undefined'?!a.level:a.level===f.level))&&(!f.grade||String(a.grade)===f.grade)&&(!f.group||a.groupLetter===f.group)&&(!f.student||a.id===f.student));const ids=new Set(students.map(a=>a.id)),restricted=!!(f.level||f.grade||f.group||f.student||search);
 const events=s.events.filter(e=>{const d=day(e,s.config.timezone);return (!restricted||ids.has(e.student))&&(!f.kind||e.kind===f.kind)&&(!f.from||d&&d>=f.from)&&(!f.to||d&&d<=f.to);});
 const atCutoff=s.events.filter(e=>!f.to||(day(e,s.config.timezone)&&day(e,s.config.timezone)<=f.to));
 const accounts=students.map(a=>({student:a,balance:balance({...s,events:atCutoff},a.id)}));
 return {events,accounts,sales:sum(events.map(e=>sales(e,s))),receipts:sum(events.map(e=>receipts(e,s))),debt:sum(accounts.map(a=>Math.max(0,a.balance))),credit:sum(accounts.map(a=>Math.max(0,-a.balance)))};
}
function fifo(s,id){
 const a=s.students.find(a=>a.id===id);if(!a)throw Error('Alumno no encontrado.');const charges=[],credits=[],assignments=[];
 function charge(id,total){let due=total;for(const c of credits){const n=Math.min(due,c.remaining);if(n){assignments.push({charge:id,payment:c.id,total:n});c.remaining-=n;due-=n;}}charges.push({id,total,remaining:due});}
 function credit(id,total){let available=total;for(const c of charges){const n=Math.min(available,c.remaining);if(n){assignments.push({charge:c.id,payment:id,total:n});c.remaining-=n;available-=n;}}credits.push({id,total,remaining:available});}
 if(a.opening>0)charge('legacy-opening-'+id,a.opening);if(a.opening<0)credit('legacy-opening-'+id,-a.opening);
 const rows=s.events.map((e,i)=>({...e,order:i})).filter(e=>e.student===id&&e.kind!=='reverse'&&!reversed(s,e.id)).sort((a,b)=>String(a.occurredAt||'').localeCompare(String(b.occurredAt||''))||a.order-b.order||a.id.localeCompare(b.id));
 for(const e of rows){if(e.kind==='sale'||e.kind==='opening'&&e.direction==='debt')charge(e.id,e.total);if(e.kind==='payment'||e.kind==='opening'&&e.direction==='credit')credit(e.id,e.total);if(e.kind==='refund-credit')charge(e.id,e.total);}
 return {charges,credits,assignments,pending:sum(charges.map(x=>x.remaining)),credit:sum(credits.map(x=>x.remaining))};
}
function openCash(s,x){if(s.sessions.some(v=>v.id===x.id))return false;if(active(s))throw Error('Ya hay una caja abierta.');if(!Number.isSafeInteger(x.fund)||x.fund<0)throw Error('Revisa el fondo inicial.');s.sessions.push(clone({...x,closedAt:null}));return true;}
function cashSummary(s,id){const x=s.sessions.find(x=>x.id===id);if(!x)throw Error('Caja no encontrada.');const events=s.events.filter(e=>e.sessionId===id),moves=s.cashMoves.filter(e=>e.sessionId===id);let expected=x.fund;
 for(const e of events){if(e.kind==='cash'||e.kind==='payment'){if(e.method==='cash')expected=safe(expected+e.total);}else if(['refund-cash','refund-credit'].includes(e.kind)){if(e.method==='cash')expected=safe(expected-e.total);}else if(e.kind==='reverse'){const t=s.events.find(x=>x.id===e.target);if(t.kind==='payment'&&t.method==='cash'&&t.sessionId===id)expected=safe(expected-t.total);}}
 expected=safe(expected+sum(moves.map(e=>e.direction==='in'?e.total:-e.total)));
 return {expected,sales:sum(events.map(e=>sales(e,s))),receipts:sum(events.map(e=>receipts(e,s))),creditSales:sum(events.filter(e=>e.kind==='sale').map(e=>e.total)),transfers:sum(events.filter(e=>e.method==='transfer').map(e=>receipts(e,s))),pendingRefunds:sum(s.events.filter(e=>e.kind==='cash'&&reversed(s,e.id)).map(e=>safe(e.total-sum(s.events.filter(x=>x.kind==='refund-cash'&&x.target===e.id).map(x=>x.total)))))};
}
function moveCash(s,x){if(s.cashMoves.some(e=>e.id===x.id))return false;if(active(s)?.id!==x.sessionId)throw Error('Abre caja antes de registrar efectivo.');if(!['in','out'].includes(x.direction)||!Number.isSafeInteger(x.total)||x.total<=0||!x.reason?.trim())throw Error('Revisa importe y motivo.');const before=cashSummary(s,x.sessionId).expected;if(x.direction==='out'&&x.total>Math.max(0,before))throw Error('El retiro excede el efectivo esperado.');s.cashMoves.push(clone(x));return true;}
function closeCash(s,id,counted,at){const x=s.sessions.find(x=>x.id===id);if(!x||x.closedAt)throw Error('La caja ya está cerrada o no existe.');if(!Number.isSafeInteger(counted)||counted<0)throw Error('Revisa el efectivo contado.');const snapshot=cashSummary(s,id);x.counted=counted;x.difference=safe(counted-snapshot.expected);x.snapshot=clone(snapshot);x.closedAt=at;return true;}
function issue(s,x){if(s.documents.some(d=>d.id===x.id))return false;if(x.from&&x.to&&x.from>x.to)throw Error('Revisa periodo y corte.');const a=s.students.find(a=>a.id===x.student);if(!a)throw Error('Alumno no encontrado.');const cutoff={...s,events:s.events.filter(e=>!x.to||day(e,s.config.timezone)<=x.to)},previous={...s,events:cutoff.events.filter(e=>x.from&&day(e,s.config.timezone)<x.from)};
 const rows=cutoff.events.filter(e=>e.student===a.id&&e.kind!=='cash'&&e.kind!=='refund-cash'&&(!x.from||day(e,s.config.timezone)>=x.from)).map(e=>({id:e.id,label:eventLabel(e,s),date:e.date,amount:signed(e,s)}));
 const doc={...clone(x),folio:'C-'+String(s.documents.length+1).padStart(6,'0'),version:s.documents.filter(d=>d.student===a.id&&d.from===x.from&&d.to===x.to).length+1,name:a.name,group:a.group,level:a.level||null,business:clone(s.config),previous:x.from?balance(previous,a.id):a.opening,rows,balance:balance(cutoff,a.id)};s.documents.push(doc);return true;
}
function eventLabel(e,s){if(['sale','cash'].includes(e.kind))return e.items.map(p=>p.qty+' × '+p.name+' ('+p.price/100+' c/u)').join(', ');return ({payment:'Pago / anticipo',opening:'Saldo inicial de libreta',reverse:'Anulación · '+e.reason,'refund-credit':'Devolución de saldo a favor','refund-cash':'Devolución de venta pagada'})[e.kind]||e.kind;}
const api={seed,safe,sum,total,balance,post,summary,day,report,fifo,active,reversed,signed,openCash,cashSummary,moveCash,closeCash,issue,eventLabel};if(typeof module!=='undefined')module.exports=api;else root.CafeDemo=api;
})(globalThis);
