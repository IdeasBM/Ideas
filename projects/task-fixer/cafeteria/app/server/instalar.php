<?php
declare(strict_types=1);
require __DIR__.'/private/http.php';
try {
    $dir=boot();
    if (is_file($dir.'/config.json')) { http_response_code(404); page('Instalación cerrada','<p>El acceso ya está configurado.</p>'); }
    $tokenFile=__DIR__.'/private/setup-token.php';
    if (!is_file($tokenFile)) throw new RuntimeException('Falta el código privado de instalación.');
    $expected=require $tokenFile; $error='';
    if ($_SERVER['REQUEST_METHOD']==='POST') {
        csrf((string)($_POST['csrf']??''));
        // Global fail-closed throttle also covers installation-code guessing.
        $accepted=with_lock($dir,function() use ($dir,$expected) {
            $rateFile=$dir.'/setup-throttle.json'; $rate=is_file($rateFile)?read_json($rateFile):['start'=>time(),'count'=>0];
            if (time()-$rate['start']>=900) $rate=['start'=>time(),'count'=>0];
            if ($rate['count']>=10) respond(['error'=>'Espera 15 minutos antes de intentar de nuevo.'],429);
            $ok=is_string($expected)&&hash_equals($expected,(string)($_POST['code']??'')); $rate['count']++; atomic_write($rateFile,json_encode($rate,JSON_THROW_ON_ERROR)); return $ok;
        });
        $u=trim((string)($_POST['username']??'')); $pw=(string)($_POST['password']??'');
        if (!$accepted) $error='Revisa el código de instalación.';
        elseif (!preg_match('/^[a-zA-Z0-9_.-]{3,80}$/D',$u) || strlen($pw)<12 || strlen($pw)>72 || $pw!==(string)($_POST['repeat']??'')) $error='Usuario de 3 a 80 letras/números. Contraseña igual en ambos campos, de 12 a 72 bytes.';
        else {
            with_lock($dir,function() use ($dir,$u,$pw) {
                if (is_file($dir.'/config.json')) throw new RuntimeException('La instalación ya se completó.');
                $c=['username'=>$u,'passwordHash'=>password_hash($pw,PASSWORD_DEFAULT),'key'=>base64_encode(random_bytes(32)),'createdAt'=>gmdate('c')];
                atomic_write($dir.'/config.json',json_encode($c,JSON_THROW_ON_ERROR));
            });
            unlink($tokenFile); page('Acceso preparado','<p>Ya puedes entrar con tu usuario y contraseña.</p><p><a href="./index.php">Abrir mi cafetería</a></p><p>Elimina instalar.php y el archivo local con tu código. No borres la carpeta privada de IONOS.</p>');
        }
    }
    page('Activar acceso privado',($error?'<p class="error">'.escaped($error).'</p>':'').'<form method="post"><input type="hidden" name="csrf" value="'.escaped($_SESSION['csrf']).'"><label>Código de instalación</label><input name="code" autocomplete="off" required><label>Tu usuario</label><input name="username" autocomplete="username" required><label>Tu contraseña (mínimo 12 caracteres)</label><input name="password" type="password" autocomplete="new-password" required minlength="12" maxlength="72"><label>Repetir contraseña</label><input name="repeat" type="password" autocomplete="new-password" required minlength="12" maxlength="72"><button>Activar acceso</button></form><p>Escribe la contraseña aquí; no hace falta compartirla en el chat.</p>');
} catch (Throwable $e) { error_log('TaskFixer setup: '.$e->getMessage()); http_response_code(503); page('Instalación detenida','<p>Se requiere PHP 8.1 o posterior, OpenSSL, sesiones y permiso para crear almacenamiento fuera de la carpeta pública. Ningún dato del teléfono se borró.</p>'); }
