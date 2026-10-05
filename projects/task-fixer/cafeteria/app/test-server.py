"""Exercise real PHP routes and encrypted files. Apache/IONOS .htaccess needs separate verification."""
import os,subprocess,tempfile,shutil,pathlib,json,re,time,socket,urllib.request,urllib.error,urllib.parse,http.cookies,unittest
PHP=os.environ.get('CAFE_PHP','php'); BASE=pathlib.Path(__file__).resolve().parent
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None
class Client:
    def __init__(self,url): self.url=url;self.cookies={};self.opener=urllib.request.build_opener(NoRedirect())
    def req(self,path,method='GET',body=None,headers=None):
        h={'Cookie':'; '.join(k+'='+v for k,v in self.cookies.items()),**(headers or {})}
        if isinstance(body,dict): body=urllib.parse.urlencode(body).encode();h['Content-Type']='application/x-www-form-urlencoded'
        try: r=self.opener.open(urllib.request.Request(self.url+path,data=body,headers=h,method=method),timeout=8)
        except urllib.error.HTTPError as e: r=e
        for v in r.headers.get_all('Set-Cookie',[]):
            c=http.cookies.SimpleCookie();c.load(v)
            for k,m in c.items(): self.cookies[k]=m.value
        return r.code,r.headers,r.read().decode()
    def api(self,b,csrf):
        status,h,body=self.req('/api.php','POST',json.dumps(b).encode(),{'Content-Type':'application/json','X-CSRF-Token':csrf})
        return status,json.loads(body)
class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory();cls.root=pathlib.Path(cls.tmp.name);cls.web=cls.root/'public';shutil.copytree(BASE/'server',cls.web)
        cls.router=cls.root/'router.php';cls.router.write_text("<?php $_SERVER['HTTPS']=($_SERVER['HTTP_X_TEST_HTTPS']??'1')==='1'?'on':'off';return false;")
        sock=socket.socket();sock.bind(('127.0.0.1',0));port=sock.getsockname()[1];sock.close();cls.url=f'http://127.0.0.1:{port}'
        cls.log=open(cls.root/'php.log','w');cls.proc=subprocess.Popen([PHP,'-n','-S',f'127.0.0.1:{port}','-t',str(cls.web),str(cls.router)],stdout=cls.log,stderr=cls.log)
        for _ in range(60):
            try: urllib.request.urlopen(cls.url+'/index.php',timeout=.2);break
            except Exception: time.sleep(.05)
        else: raise RuntimeError('PHP test server did not start')
        raw=subprocess.check_output(['node','-e',"const E=require('./engine.js');let s=E.seed();s.config.initialized=true;s.config.name='Prueba privada';console.log(JSON.stringify({schema:3,revision:1,state:s}));"],cwd=BASE)
        cls.record=json.loads(raw)
    @classmethod
    def tearDownClass(cls): cls.proc.terminate();cls.proc.wait(timeout=5);cls.log.close();cls.tmp.cleanup()
    def setUp(self):
        for d in self.root.glob('taskfixer-private-*'): shutil.rmtree(d)
        (self.web/'private/setup-token.php').write_text("<?php return '"+'a'*64+"';")
        self.client=Client(self.url);code,_,body=self.client.req('/instalar.php');self.assertEqual(code,200);token=self.csrf(body)
        code,_,body=self.client.req('/instalar.php','POST',{'csrf':token,'code':'a'*64,'username':'operador','password':'test-password-123','repeat':'test-password-123'});self.assertEqual(code,200);self.assertIn('Acceso preparado',body)
        self.data=next(self.root.glob('taskfixer-private-*'))
    def csrf(self,body): return re.search(r'name="csrf" value="([a-f0-9]+)"',body).group(1)
    def login(self):
        _,_,body=self.client.req('/index.php');csrf=self.csrf(body)
        code,h,_=self.client.req('/index.php','POST',{'csrf':csrf,'username':'operador','password':'test-password-123'});self.assertEqual(code,303)
        self.login_headers=h
        code,_,body=self.client.req('/index.php');self.assertEqual(code,303);code,_,body=self.client.req('/context.php');self.assertEqual(code,200);return json.loads(body)['csrf']
    def save(self,csrf,base=0,device='1'*32,record=None): return self.client.api({'action':'save','base':base,'device':device,'record':record or self.record},csrf)
    def test_anonymous_denied_and_https_required(self):
        code,data=self.client.api({'action':'download'},'');self.assertEqual(code,401);self.assertNotIn('record',data)
        code,_,body=self.client.req('/index.php',headers={'X-Test-Https':'0'});self.assertEqual(code,403)
        code,_,body=self.client.req('/index.php');self.assertIn('Entrar a mi cafetería',body);self.assertNotIn('globalThis.CafeServer',body)
    def test_installation_one_use_and_secrets_outside_public(self):
        code,_,_=self.client.req('/instalar.php');self.assertEqual(code,404);self.assertFalse((self.web/'private/setup-token.php').exists())
        config=json.loads((self.data/'config.json').read_text());self.assertNotEqual(config['passwordHash'],'test-password-123');self.assertFalse(str(self.data).startswith(str(self.web)))
    def test_wrong_password_throttle_and_session_rotation(self):
        self.client=Client(self.url);_,h,body=self.client.req('/index.php');csrf=self.csrf(body);before=self.client.cookies['TASKFIXER_CAFE'];self.assertIn('secure',h['Set-Cookie'].lower());self.assertIn('httponly',h['Set-Cookie'].lower());self.assertIn('samesite=strict',h['Set-Cookie'].lower())
        code,_,body=self.client.req('/index.php','POST',{'csrf':csrf,'username':'operador','password':'wrong'});self.assertIn('Revisa el usuario',body)
        self.login();self.assertNotEqual(before,self.client.cookies['TASKFIXER_CAFE'])
        # Independent invalid attempts from a new unauthenticated session are globally limited.
        attacker=Client(self.url);_,_,body=attacker.req('/index.php');token=self.csrf(body)
        for _ in range(10): attacker.req('/index.php','POST',{'csrf':token,'username':'operador','password':'wrong'})
        code,_,_=attacker.req('/index.php','POST',{'csrf':token,'username':'operador','password':'wrong'});self.assertEqual(code,429)
    def test_csrf_and_method_rejected(self):
        csrf=self.login();code,_=self.save('bad');self.assertEqual(code,403);code,_,_=self.client.req('/api.php');self.assertEqual(code,405)
        code,_=self.client.api({'action':'download'},csrf);self.assertEqual(code,200)
    def test_backup_encryption_replay_and_download(self):
        csrf=self.login();code,r=self.save(csrf);self.assertEqual(code,200);self.assertEqual(r['head'],1)
        code,r=self.save(csrf);self.assertEqual(r['head'],1)
        self.assertNotIn('Prueba privada',(self.data/'latest.enc').read_text())
        code,r=self.client.api({'action':'download'},csrf);self.assertEqual(r['record'],self.record)
    def test_conflict_cannot_replace_newer_or_other_device(self):
        csrf=self.login();self.save(csrf);new=json.loads(json.dumps(self.record));new['revision']=2
        code,_=self.save(csrf,base=1,record=new);self.assertEqual(code,200)
        code,_=self.save(csrf,base=0,record=self.record);self.assertEqual(code,409)
        code,_=self.save(csrf,base=2,device='2'*32,record=new);self.assertEqual(code,409)
        _,r=self.client.api({'action':'download'},csrf);self.assertEqual(r['head'],2);self.assertEqual(r['record']['revision'],2)
    def test_recovery_claim_requires_password_and_current_head(self):
        csrf=self.login();self.save(csrf)
        code,_=self.client.api({'action':'claim','base':1,'device':'2'*32,'password':'wrong'},csrf);self.assertEqual(code,403)
        code,_=self.client.api({'action':'claim','base':0,'device':'2'*32,'password':'test-password-123'},csrf);self.assertEqual(code,409)
        code,r=self.client.api({'action':'claim','base':1,'device':'2'*32,'password':'test-password-123'},csrf);self.assertEqual(code,200);self.assertEqual(r['head'],2)
        new=json.loads(json.dumps(self.record));new['revision']=3
        code,_=self.save(csrf,base=2,record=new);self.assertEqual(code,409)
        code,_=self.save(csrf,base=2,device='2'*32,record=new);self.assertEqual(code,200)
    def test_invalid_or_tampered_backup_fails_closed(self):
        csrf=self.login();self.save(csrf);bad=json.loads(json.dumps(self.record));bad['state']['config']['currency']='BAD'
        code,_=self.save(csrf,base=1,record=bad);self.assertEqual(code,422)
        v=json.loads((self.data/'latest.enc').read_text());v['tag']='AAAAAAAAAAAAAAAAAAAAAA==';(self.data/'latest.enc').write_text(json.dumps(v))
        code,_=self.client.api({'action':'download'},csrf);self.assertEqual(code,503)
        code,_=self.save(csrf,base=1);self.assertEqual(code,503)
    def test_writer_authorization_detects_transfer_and_reserves_empty_installation(self):
        csrf=self.login();code,r=self.client.api({'action':'authorize','device':'1'*32,'base':0},csrf);self.assertEqual(code,200);self.assertGreater(r['offlineUntil'],time.time()*1000)
        code,_=self.client.api({'action':'authorize','device':'2'*32,'base':0},csrf);self.assertEqual(code,409)
        code,_=self.save(csrf,device='2'*32);self.assertEqual(code,409)
        self.save(csrf);code,_=self.client.api({'action':'claim','device':'2'*32,'base':1,'password':'test-password-123'},csrf);self.assertEqual(code,200)
        code,_=self.client.api({'action':'authorize','device':'1'*32,'base':1},csrf);self.assertEqual(code,409)
        code,_=self.client.api({'action':'authorize','device':'2'*32,'base':2},csrf);self.assertEqual(code,200)
    def test_generic_shell_has_no_session_and_context_needs_login(self):
        anonymous=Client(self.url);code,_,body=anonymous.req('/app.php');self.assertEqual(code,200);self.assertIn('CafeBoot',body);self.assertNotIn('globalThis.CafeServer={',body)
        code,_,_=anonymous.req('/context.php');self.assertEqual(code,401)
        self.login();code,_,body=self.client.req('/context.php');self.assertTrue(json.loads(body)['database'].startswith('task-fixer-cafeteria-'))
    def test_separate_folder_has_separate_account_context_and_backup(self):
        main=self.login();self.save(main)
        folder=self.web/'cafeteria-tio';shutil.copytree(BASE/'server',folder);(folder/'private/setup-token.php').write_text("<?php return '"+'b'*64+"';")
        other=Client(self.url+'/cafeteria-tio');_,_,body=other.req('/instalar.php');token=self.csrf(body)
        code,_,body=other.req('/instalar.php','POST',{'csrf':token,'code':'b'*64,'username':'otro-operador','password':'test-password-456','repeat':'test-password-456'});self.assertEqual(code,200)
        _,_,body=other.req('/index.php');token=self.csrf(body)
        code,_,_=other.req('/index.php','POST',{'csrf':token,'username':'operador','password':'test-password-123'});self.assertEqual(code,200)
        code,_,_=other.req('/index.php','POST',{'csrf':token,'username':'otro-operador','password':'test-password-456'});self.assertEqual(code,303)
        _,_,body=other.req('/context.php');context=json.loads(body)
        _,_,body=self.client.req('/context.php');original=json.loads(body)
        self.assertNotEqual(context['id'],original['id']);self.assertNotEqual(context['database'],original['database'])
        code,data=other.api({'action':'download'},context['csrf']);self.assertEqual(code,200);self.assertIsNone(data['record']);self.assertEqual(data['head'],0)
        _,data=self.client.api({'action':'download'},main);self.assertEqual(data['record'],self.record)
    def test_nine_hour_cookie_session_and_offline_grant(self):
        csrf=self.login();code,h,_=self.client.req('/context.php')
        self.assertIn('Max-Age=32400', '\n'.join(self.login_headers.get_all('Set-Cookie',[])))
        code,data=self.client.api({'action':'authorize','device':'1'*32,'base':0},csrf);self.assertEqual(code,200)
        self.assertLessEqual(abs(data['offlineUntil']/1000-time.time()-32400),2)
        session=self.data/'sessions'/('sess_'+self.client.cookies['TASKFIXER_CAFE'])
        original=session.read_text()
        session.write_text(re.sub(r'authAt\|i:\d+;', 'authAt|i:'+str(int(time.time())-32340)+';',original))
        self.assertEqual(self.client.req('/context.php')[0],200)
        session.write_text(re.sub(r'authAt\|i:\d+;', 'authAt|i:'+str(int(time.time())-32400)+';',original))
        self.assertEqual(self.client.req('/context.php')[0],401)
    def test_expired_session_cannot_read_or_backup(self):
        csrf=self.login();session=self.data/'sessions'/('sess_'+self.client.cookies['TASKFIXER_CAFE'])
        body=session.read_text();body=re.sub(r'authAt\|i:\d+;', 'authAt|i:1;',body);session.write_text(body)
        code,_=self.client.api({'action':'download'},csrf);self.assertEqual(code,401)
        code,_=self.save(csrf);self.assertEqual(code,401)
    def test_versions_retained_and_logout_blocks_api(self):
        csrf=self.login()
        for n in range(1,33):
            record=json.loads(json.dumps(self.record));record['revision']=n;code,_=self.save(csrf,base=n-1,record=record);self.assertEqual(code,200)
        self.assertEqual(len(list(self.data.glob('snapshot-*.enc'))),30)
        code,_=self.client.api({'action':'logout'},csrf);self.assertEqual(code,200)
        code,_=self.client.api({'action':'download'},csrf);self.assertEqual(code,401)
        _,_,body=self.client.req('/index.php');self.assertIn('Entrar a mi cafetería',body)
if __name__=='__main__':unittest.main(verbosity=2)
