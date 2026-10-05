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
    if (!authenticated()) page('Entrar a mi cafetería',$error.'<form method="post"><input type="hidden" name="csrf" value="'.escaped($_SESSION['csrf']).'"><label>Usuario</label><input name="username" autocomplete="username" required maxlength="80"><label>Contraseña</label><input type="password" name="password" autocomplete="current-password" required maxlength="200"><button>Entrar</button></form><p>Acceso privado. Para abrir sin conexión, usa la app preparada y tu clave local.</p>');
    header('Location: ./app.php',true,303);exit;
} catch (Throwable $e) { error_log('TaskFixer index: '.$e->getMessage()); http_response_code(503); page('Acceso no disponible','<p>La configuración privada de IONOS necesita revisión. Los datos de tu teléfono no se han borrado.</p>'); }
