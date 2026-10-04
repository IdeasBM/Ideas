const {test}=require('node:test'),assert=require('node:assert/strict');
const Storage=require('./storage.js'),Engine=require('./engine.js'),fake=require('./idb-test-double.cjs');
const sale={id:'venta-1',kind:'sale',student:'a',items:[{price:2500,qty:1}],date:'demo'};
test('recupera venta y abono tras abrir otra conexión; reintento no duplica',async()=>{
 const idb=fake(),a=Storage.create(idb);await a.load(Engine.seed);await a.update(s=>Engine.post(s,sale),Engine.seed);await a.update(s=>Engine.post(s,{id:'p1',kind:'payment',student:'a',total:8000}),Engine.seed);
 const b=Storage.create(idb),r=await b.load(Engine.seed);assert.equal(Engine.balance(r.state,'a'),-1000);assert.equal(r.state.events.length,2);const duplicate=await b.update(s=>Engine.post(s,sale),Engine.seed);assert.equal(duplicate.changed,false);assert.equal(duplicate.revision,r.revision);
});
test('aborto después de la solicitud conserva versión y permite reintento',async()=>{
 const idb=fake(),store=Storage.create(idb);await store.load(Engine.seed);idb.failNext();await assert.rejects(store.update(s=>Engine.post(s,sale),Engine.seed),/Espacio/);let r=await store.load(Engine.seed);assert.equal(r.revision,1);assert.equal(r.state.events.length,0);r=await store.update(s=>Engine.post(s,sale),Engine.seed);assert.equal(r.state.events.length,1);
});
test('dos escrituras concurrentes leen la última versión y no pisan datos',async()=>{
 const idb=fake(),a=Storage.create(idb),b=Storage.create(idb);await a.load(Engine.seed);await Promise.all([a.update(s=>Engine.post(s,sale),Engine.seed),b.update(s=>Engine.post(s,{...sale,id:'venta-2'}),Engine.seed)]);const r=await b.load(Engine.seed);assert.equal(r.state.events.length,2);assert.equal(r.revision,3);
});
test('rechaza esquema incompatible sin sustituirlo por datos demo',async()=>{
 const idb=fake(),a=Storage.create(idb);await a.load(Engine.seed);idb.corrupt('task-fixer-cafeteria-demo',{schema:99});await assert.rejects(a.load(Engine.seed),/compatibles/);await assert.rejects(a.load(Engine.seed),/compatibles/);
});
test('sin IndexedDB detiene captura en lugar de fingir guardado',async()=>{await assert.rejects(Storage.create(null).load(Engine.seed),/no permite/);});

test('rechaza estructura interna dañada y conserva copia para diagnóstico',async()=>{const idb=fake(),a=Storage.create(idb);await a.load(Engine.seed);const state=Engine.seed();state.students[0].opening='incorrecto';idb.corrupt('task-fixer-cafeteria-demo',{schema:1,revision:2,state});await assert.rejects(a.load(Engine.seed),/inválidos/);});
