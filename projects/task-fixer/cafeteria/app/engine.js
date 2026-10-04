(function(root){
function seed(){return {config:{name:'',school:'',location:'',currency:'MXN',timezone:'America/Mexico_City',cycle:'',initialized:false},categories:[{id:"food",name:"Alimentos"},{id:"drinks",name:"Bebidas"},{id:"snacks",name:"Botanas"},{id:"desserts",name:"Postres"},{id:"uncategorized",name:"Sin categoría"}],students:[],products:[],events:[],seen:[]};}
function balance(s,id){let a=s.students.find(x=>x.id===id);if(!a)throw Error('Selecciona un alumno.');return a.opening+s.events.filter(e=>e.student===id&&e.kind!=='cash').reduce((n,e)=>n+(e.kind==='sale'?e.total:-e.total),0);}
function total(items){if(!items.length)throw Error('Agrega un producto.');let sum=0;for(const x of items){if(!Number.isSafeInteger(x.price)||x.price<0||!Number.isSafeInteger(x.qty)||x.qty<1)throw Error('Revisa cantidad y precio.');sum+=x.qty*x.price;}if(!Number.isSafeInteger(sum)||sum<=0)throw Error('Revisa el total.');return sum;}
function post(s,e){if(!e.id)throw Error('Falta identificar la operación.');if(s.seen.includes(e.id))return false;if(!['cash','sale','payment'].includes(e.kind))throw Error('Operación no admitida.');let amount=e.kind==='payment'?e.total:total(e.items);if(!Number.isSafeInteger(amount)||amount<=0)throw Error('Introduce un importe mayor que cero.');if(e.kind!=='cash'||e.student)balance(s,e.student);const copy=JSON.parse(JSON.stringify({...e,total:amount}));s.events.push(copy);s.seen.push(e.id);return true;}
function summary(s){return {sales:s.events.filter(e=>e.kind==='cash'||e.kind==='sale').reduce((n,e)=>n+e.total,0),receipts:s.events.filter(e=>e.kind==='cash'||e.kind==='payment').reduce((n,e)=>n+e.total,0)};}
function day(e,timezone){if(!e.occurredAt||Number.isNaN(Date.parse(e.occurredAt)))return null;const parts=new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(e.occurredAt));const get=k=>parts.find(p=>p.type===k).value;return get('year')+'-'+get('month')+'-'+get('day');}
function report(s,f={}){
 if(f.from&&f.to&&f.from>f.to)throw Error('La fecha inicial debe ser anterior o igual a la final.');
 const search=(f.search||'').trim().toLocaleLowerCase('es');
 const students=s.students.filter(a=>(!search||a.name.toLocaleLowerCase('es').includes(search))&&(!f.level||(f.level==='undefined'?!a.level:a.level===f.level))&&(!f.grade||String(a.grade)===f.grade)&&(!f.group||a.groupLetter===f.group)&&(!f.student||a.id===f.student));const ids=new Set(students.map(a=>a.id)),restricted=!!(f.level||f.grade||f.group||f.student||search);
 const events=s.events.filter(e=>{const d=day(e,s.config.timezone);return (!restricted||ids.has(e.student))&&(!f.kind||e.kind===f.kind)&&(!f.from||d&&d>=f.from)&&(!f.to||d&&d<=f.to);});
 const atCutoff=s.events.filter(e=>!f.to||(day(e,s.config.timezone)&&day(e,s.config.timezone)<=f.to));
 const accounts=students.map(a=>({student:a,balance:balance({...s,events:atCutoff},a.id)}));
 return {events,accounts,sales:events.filter(e=>e.kind==='cash'||e.kind==='sale').reduce((n,e)=>n+e.total,0),receipts:events.filter(e=>e.kind==='cash'||e.kind==='payment').reduce((n,e)=>n+e.total,0),debt:accounts.reduce((n,a)=>n+Math.max(0,a.balance),0),credit:accounts.reduce((n,a)=>n+Math.max(0,-a.balance),0)};
}
const api={seed,balance,total,post,summary,day,report};if(typeof module!=='undefined')module.exports=api;else root.CafeDemo=api;
})(globalThis);
