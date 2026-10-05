<?php
declare(strict_types=1);
require __DIR__.'/private/http.php';
try {
    $dir=boot();
    if (!authenticated()) respond(['error'=>'Vuelve a entrar para respaldar. Lo capturado permanece en este teléfono.'],401);
    $c=config($dir); $key=base64_decode($c['key'],true);
    if ($_SERVER['REQUEST_METHOD']!=='POST') respond(['error'=>'Método no permitido.'],405);
    csrf($_SERVER['HTTP_X_CSRF_TOKEN']??''); $b=json_body(); $action=$b['action']??'';
    if ($action==='logout') { $_SESSION=[]; session_destroy(); $params=session_get_cookie_params();unset($params['lifetime']);setcookie(session_name(),'',array_merge($params,['expires'=>time()-3600])); respond(['ok'=>true]); }
    if ($action==='authorize') {
        if(!is_string($b['device']??null)||!preg_match('/^[a-f0-9]{32}$/D',$b['device'])||!is_int($b['base']??null))respond(['error'=>'Dispositivo inválido.'],400);
        with_lock($dir,function()use($dir,$key,$b){$r=latest($dir,$key);if($r){if($r['device']!==$b['device']||$r['head']!==$b['base'])throw new DomainException('Otro equipo tomó el control o hay una copia más reciente. Captura detenida; recupera desde IONOS.');}else{$f=$dir.'/writer.json';$owner=is_file($f)?read_json($f):null;if($owner&&$owner['device']!==$b['device'])throw new DomainException('Otro equipo está preparando esta instalación.');if(!$owner)atomic_write($f,json_encode(['device'=>$b['device']],JSON_THROW_ON_ERROR));}});
        respond(['allowed'=>true,'offlineUntil'=>(time()+86400)*1000]);
    }
    if ($action==='status' || $action==='download') { $r=latest($dir,$key); respond($r?['head'=>$r['head'],'savedAt'=>$r['savedAt'],'revision'=>$r['record']['revision'],'record'=>$action==='download'?$r['record']:null]:['head'=>0,'savedAt'=>null,'record'=>null]); }
    if ($action==='save') {
        if (!is_array($b['record']??null) || !is_string($b['device']??null) || !is_int($b['base']??null)) respond(['error'=>'Solicitud inválida.'],400);
        $r=save_snapshot($dir,$key,$b['record'],$b['device'],$b['base']); respond(['head'=>$r['head'],'savedAt'=>$r['savedAt'],'revision'=>$r['record']['revision']]);
    }
    if ($action==='claim') {
        if (!login_attempt($dir,$c,$c['username'],(string)($b['password']??''))) respond(['error'=>'Contraseña incorrecta.'],403);
        if (!is_string($b['device']??null) || !is_int($b['base']??null)) respond(['error'=>'Solicitud inválida.'],400);
        $r=claim_snapshot($dir,$key,$b['device'],$b['base']); respond(['head'=>$r['head'],'savedAt'=>$r['savedAt']]);
    }
    respond(['error'=>'Acción no admitida.'],400);
} catch (DomainException $e) { respond(['error'=>$e->getMessage()],409); }
catch (InvalidArgumentException $e) { respond(['error'=>$e->getMessage()],422); }
catch (Throwable $e) { error_log('TaskFixer API: '.$e->getMessage()); respond(['error'=>'IONOS no pudo completar el respaldo. El guardado del teléfono permanece.'],503); }
