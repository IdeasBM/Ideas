<?php
declare(strict_types=1);
require_once __DIR__ . '/runtime.php';
// Runtime secrets and snapshots live outside DOCUMENT_ROOT. Never publish that directory.
function storage_dir(): string {
    $stable = runtime_descriptor();
    if ($stable !== null) return $stable['storagePath'];
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    if (!$root || $root === DIRECTORY_SEPARATOR) throw new RuntimeException('No se pudo determinar el almacenamiento privado.');
    $dir = dirname($root) . '/taskfixer-private-' . substr(hash('sha256', __DIR__), 0, 16);
    if (!is_dir($dir) && !mkdir($dir, 0700, true)) throw new RuntimeException('IONOS no permite crear la carpeta privada.');
    $real = realpath($dir);
    if (!$real || $real === $root || str_starts_with($real, $root . DIRECTORY_SEPARATOR) || !is_writable($real)) throw new RuntimeException('Almacenamiento privado no disponible.');
    return $real;
}
function atomic_write(string $path, string $data): void {
    $tmp = $path . '.tmp-' . bin2hex(random_bytes(8));
    try {
        $h = fopen($tmp, 'xb');
        if (!$h) throw new RuntimeException('No se pudo escribir el respaldo.');
        chmod($tmp, 0600);
        try { if (fwrite($h, $data) !== strlen($data) || !fflush($h)) throw new RuntimeException('Escritura incompleta.'); }
        finally { fclose($h); }
        if (!rename($tmp, $path)) throw new RuntimeException('No se pudo confirmar el guardado.');
    } finally { if (is_file($tmp)) unlink($tmp); }
}
function with_lock(string $dir, callable $fn): mixed {
    $h = fopen($dir . '/operation.lock', 'c');
    if (!$h) throw new RuntimeException('No se pudo bloquear el almacenamiento.');
    chmod($dir . '/operation.lock', 0600);
    try { if (!flock($h, LOCK_EX)) throw new RuntimeException('Guardado ocupado.'); return $fn(); }
    finally { flock($h, LOCK_UN); fclose($h); }
}
function read_json(string $path): array {
    $raw = file_get_contents($path);
    if ($raw === false) throw new RuntimeException('No se pudo leer el archivo privado.');
    $v = json_decode($raw, true, 128, JSON_THROW_ON_ERROR);
    if (!is_array($v)) throw new RuntimeException('Archivo privado inválido.');
    return $v;
}
function config(string $dir): array {
    $v = read_json($dir . '/config.json');
    if (!isset($v['passwordHash'], $v['username'], $v['key']) || strlen(base64_decode($v['key'], true) ?: '') !== 32) throw new RuntimeException('Configuración privada inválida.');
    return $v;
}
function validate_record(array $r): void {
    if (($r['schema'] ?? null) !== 3 || !is_int($r['revision'] ?? null) || $r['revision'] < 1 || $r['revision'] > 9007199254740991 || !is_array($r['state'] ?? null)) throw new InvalidArgumentException('Formato de respaldo inválido.');
    $s = $r['state'];
    foreach (['students','products','events','seen','categories','sessions','cashMoves','documents'] as $k) {
        if (!is_array($s[$k] ?? null) || !array_is_list($s[$k]) || count($s[$k]) > 100000) throw new InvalidArgumentException('Contenido del respaldo inválido.');
        if ($k !== 'seen') {
            $ids = [];
            foreach ($s[$k] as $v) { $id = $v['id'] ?? null; if (!is_string($id) || !preg_match('/^[a-zA-Z0-9_-]{1,200}$/D', $id) || isset($ids[$id])) throw new InvalidArgumentException('Identificadores inválidos.'); $ids[$id] = true; }
        }
    }
    $c = $s['config'] ?? [];
    if (!is_string($c['name'] ?? null) || !is_bool($c['initialized'] ?? null) || !in_array($c['currency'] ?? '', ['MXN','USD'], true) || !is_string($c['cycle'] ?? null) || !in_array($c['timezone'] ?? '', DateTimeZone::listIdentifiers(), true)) throw new InvalidArgumentException('Configuración del respaldo inválida.');
    if (count($s['seen']) !== count($s['events']) || count(array_unique($s['seen'], SORT_REGULAR)) !== count($s['seen'])) throw new InvalidArgumentException('Movimientos incompletos.');
    foreach ($s['events'] as $e) {
        if (!in_array($e['id'], $s['seen'], true) || !in_array($e['kind'] ?? '', ['cash','sale','payment','opening','reverse','refund-credit','refund-cash'], true) || !is_int($e['total'] ?? null) || $e['total'] < 1 || $e['total'] > 9007199254740991) throw new InvalidArgumentException('Movimiento inválido.');
        if (in_array($e['kind'], ['cash','sale'], true)) {
            if (empty($e['items']) || !is_array($e['items'])) throw new InvalidArgumentException('Venta sin partidas.');
            $sum = 0;
            foreach ($e['items'] as $i) { if (!is_int($i['price'] ?? null) || $i['price'] < 0 || !is_int($i['qty'] ?? null) || $i['qty'] < 1) throw new InvalidArgumentException('Partida inválida.'); $sum += $i['price'] * $i['qty']; }
            if (!is_int($sum) || $sum !== $e['total']) throw new InvalidArgumentException('Importe de venta inválido.');
        }
    }
}
function seal(array $data, string $key): string {
    $iv = random_bytes(12); $tag = '';
    $plain = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    $cipher = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag, 'task-fixer-ionos-v1', 16);
    if ($cipher === false || strlen($tag) !== 16) throw new RuntimeException('No se pudo cifrar el respaldo.');
    return json_encode(['v'=>1,'iv'=>base64_encode($iv),'tag'=>base64_encode($tag),'cipher'=>base64_encode($cipher)], JSON_THROW_ON_ERROR);
}
function unseal(string $blob, string $key): array {
    $v = json_decode($blob, true, 16, JSON_THROW_ON_ERROR);
    $iv = base64_decode($v['iv'] ?? '', true); $tag = base64_decode($v['tag'] ?? '', true); $cipher = base64_decode($v['cipher'] ?? '', true);
    if (($v['v'] ?? null) !== 1 || $iv === false || strlen($iv) !== 12 || $tag === false || strlen($tag) !== 16 || $cipher === false) throw new RuntimeException('Respaldo alterado.');
    $plain = openssl_decrypt($cipher, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag, 'task-fixer-ionos-v1');
    if ($plain === false) throw new RuntimeException('No se pudo verificar el respaldo.');
    $r = json_decode($plain, true, 128, JSON_THROW_ON_ERROR);
    if (!is_array($r)) throw new RuntimeException('Respaldo inválido.');
    return $r;
}
function latest(string $dir, string $key): ?array {
    if (!is_file($dir . '/latest.enc')) return null;
    $r = unseal((string)file_get_contents($dir . '/latest.enc'), $key); validate_record($r['record']); return $r;
}
function save_snapshot(string $dir, string $key, array $r, string $device, int $base): array {
    validate_record($r);
    if (!preg_match('/^[a-f0-9]{32}$/D', $device) || $base < 0) throw new InvalidArgumentException('Dispositivo inválido.');
    return with_lock($dir, function() use ($dir, $key, $r, $device, $base) {
        $old = latest($dir, $key);if(!$old&&is_file($dir.'/writer.json')&&read_json($dir.'/writer.json')['device']!==$device)throw new DomainException('Otro equipo está preparando esta instalación.'); $hash = hash('sha256', json_encode($r, JSON_THROW_ON_ERROR));
        if ($old && $old['device'] === $device && $old['hash'] === $hash) return $old; // retry after a lost response
        if (($old['head'] ?? 0) !== $base || ($old && $old['device'] !== $device)) throw new DomainException('Hay otro dispositivo o una copia más reciente en IONOS. Revisa y recupera el respaldo antes de continuar.');
        $new = ['head'=>($old['head'] ?? 0)+1,'device'=>$device,'hash'=>$hash,'savedAt'=>gmdate('c'),'record'=>$r];
        $blob = seal($new, $key);
        // Persist a recovery version before advancing the current pointer.
        atomic_write($dir . '/snapshot-' . sprintf('%012d', $new['head']) . '.enc', $blob);
        atomic_write($dir . '/latest.enc', $blob);
        prune_snapshots($dir);
        return $new;
    });
}
function prune_snapshots(string $dir): void { $files=glob($dir.'/snapshot-*.enc') ?: [];sort($files);foreach(array_slice($files,0,max(0,count($files)-30)) as $file)unlink($file); }
function claim_snapshot(string $dir, string $key, string $device, int $base): array {
    if (!preg_match('/^[a-f0-9]{32}$/D', $device)) throw new InvalidArgumentException('Dispositivo inválido.');
    return with_lock($dir, function() use ($dir, $key, $device, $base) {
        $r = latest($dir, $key);
        if (!$r || $r['head'] !== $base) throw new DomainException('El respaldo cambió. Revísalo de nuevo.');
        $r['head']++; $r['device'] = $device;
        $blob = seal($r, $key);
        atomic_write($dir . '/snapshot-' . sprintf('%012d', $r['head']) . '.enc', $blob);
        atomic_write($dir . '/latest.enc', $blob);
        prune_snapshots($dir);
        return $r;
    });
}
