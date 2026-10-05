<?php
declare(strict_types=1);
require_once __DIR__ . '/core.php';
function respond(array $data, int $code=200): never { http_response_code($code); header('Content-Type: application/json; charset=utf-8'); echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR); exit; }
function boot(): string {
    ini_set('display_errors', '0'); umask(0077);
    header('Cache-Control: no-store, private, max-age=0'); header('Pragma: no-cache');
    header('X-Content-Type-Options: nosniff'); header('X-Frame-Options: DENY'); header('Referrer-Policy: no-referrer');
    header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') respond(['error'=>'Usa la dirección HTTPS de Task Fixer.'], 403);
    $dir = storage_dir();
    if (!is_dir($dir . '/sessions') && !mkdir($dir . '/sessions', 0700)) throw new RuntimeException('Sesiones no disponibles.');
    ini_set('session.use_strict_mode', '1'); ini_set('session.use_only_cookies', '1'); ini_set('session.gc_maxlifetime', '43200');
    session_save_path($dir . '/sessions'); session_name('TASKFIXER_CAFE');
    $path = rtrim(str_replace('\\','/',dirname($_SERVER['SCRIPT_NAME'])), '/') . '/';
    session_set_cookie_params(['lifetime'=>0,'path'=>$path,'secure'=>true,'httponly'=>true,'samesite'=>'Strict']);
    session_start(); $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
    return $dir;
}
function authenticated(): bool { return isset($_SESSION['authAt']) && time() - $_SESSION['authAt'] < 43200; }
function csrf(string $token): void { if (!hash_equals($_SESSION['csrf'] ?? '', $token)) respond(['error'=>'La sesión cambió. Vuelve a entrar.'],403); }
function json_body(): array {
    if (!str_starts_with($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) respond(['error'=>'Tipo de solicitud inválido.'],415);
    $raw = file_get_contents('php://input', false, null, 0, 8388609);
    if ($raw === false || strlen($raw)>8388608) respond(['error'=>'El respaldo supera 8 MB. Conserva el respaldo manual y consulta soporte.'],413);
    try { $r = json_decode($raw, true, 128, JSON_THROW_ON_ERROR); if (!is_array($r)) throw new Exception(); return $r; }
    catch (Throwable $e) { respond(['error'=>'Solicitud inválida.'],400); }
}
function login_attempt(string $dir, array $c, string $username, string $password): bool {
    return with_lock($dir, function() use ($dir,$c,$username,$password) {
        $file = $dir . '/login-throttle.json'; $rate = is_file($file)?read_json($file):['start'=>time(),'count'=>0];
        if (time()-$rate['start']>=900) $rate=['start'=>time(),'count'=>0];
        if ($rate['count']>=10) respond(['error'=>'Demasiados intentos. Espera 15 minutos antes de volver a intentar.'],429);
        $valid = password_verify($password,$c['passwordHash']) && hash_equals($c['username'],$username);
        $rate['count'] = $valid?0:$rate['count']+1; atomic_write($file,json_encode($rate,JSON_THROW_ON_ERROR)); return $valid;
    });
}
function page(string $title, string $body): never {
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'.htmlspecialchars($title).'</title><style>body{font:16px system-ui;background:#eef3e9;color:#183b36;margin:0;padding:24px}main{max-width:440px;margin:6vh auto;background:white;padding:28px;border-radius:24px;box-shadow:0 8px 28px #183b3612}h1{font-size:28px}label{display:block;margin:18px 0 8px}input,button{font:inherit;box-sizing:border-box;min-height:50px;width:100%;border:1px solid #b8ccba;border-radius:12px;padding:12px}button{margin-top:22px;background:#1b6656;color:white;font-weight:700}p{line-height:1.6}.error{color:#8c392b}</style><main><p>Task Fixer · Cafetería</p><h1>'.htmlspecialchars($title).'</h1>'.$body.'</main></html>'; exit;
}
function escaped(string $v): string { return htmlspecialchars($v, ENT_QUOTES, 'UTF-8'); }
