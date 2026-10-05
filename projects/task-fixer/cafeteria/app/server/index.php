<?php
declare(strict_types=1);
require __DIR__ . '/private/http.php';
try {
    $dir=boot();
    if (!is_file($dir.'/config.json')) page('Falta activar el acceso','<p>El propietario debe completar la instalación privada.</p>');
    $c=config($dir); $error='';
    if ($_SERVER['REQUEST_METHOD']==='POST') {
        csrf((string)($_POST['csrf']??''));
        if (login_attempt($dir,$c,(string)($_POST['username']??''),(string)($_POST['password']??''))) {
            session_regenerate_id(true); $_SESSION['authAt']=time(); $_SESSION['csrf']=bin2hex(random_bytes(32)); header('Location: ./index.php',true,303); exit;
        }
        $error='<p class="error" role="alert">Revisa el usuario y la contraseña.</p>';
    }
    if (!authenticated()) page('Entrar a mi cafetería',$error.'<form method="post"><input type="hidden" name="csrf" value="'.escaped($_SESSION['csrf']).'"><label>Usuario</label><input name="username" autocomplete="username" required maxlength="80"><label>Contraseña</label><input type="password" name="password" autocomplete="current-password" required maxlength="200"><button>Entrar</button></form><p>Acceso privado. Necesitas conexión para abrir la app.</p>');
    $html=file_get_contents(__DIR__.'/private/app.html');
    if ($html===false) throw new RuntimeException('Falta el archivo de la aplicación.');
    $context=json_encode(['csrf'=>$_SESSION['csrf'],'api'=>'./api.php','id'=>substr(hash('sha256',__DIR__),0,16)],JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_THROW_ON_ERROR);
    header('Content-Type: text/html; charset=utf-8');
    echo str_replace('<!--SERVER_CONTEXT-->','<script>globalThis.CafeServer='.$context.';</script>',$html);
} catch (Throwable $e) { error_log('TaskFixer index: '.$e->getMessage()); http_response_code(503); page('Acceso no disponible','<p>La configuración privada de IONOS necesita revisión. Los datos de tu teléfono no se han borrado.</p>'); }
