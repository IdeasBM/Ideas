<?php
declare(strict_types=1);
// Optional stable runtime descriptor. No account or encryption secret belongs here.
function runtime_descriptor(): ?array {
    $path = getenv('TASKFIXER_CAFE_RUNTIME_CONFIG');
    if ($path === false || $path === '') {
        $locator = __DIR__ . '/runtime-location.php';
        if (!is_file($locator)) return null;
        $path = require $locator;
    }
    if (!is_string($path) || !str_starts_with($path, DIRECTORY_SEPARATOR) || !is_file($path)) throw new RuntimeException('Descriptor privado no disponible.');
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    $real = realpath($path);
    if (!$root || $root === DIRECTORY_SEPARATOR || !$real || $real === $root || str_starts_with($real, $root . DIRECTORY_SEPARATOR)) throw new RuntimeException('Descriptor fuera de la zona privada.');
    $d = json_decode((string)file_get_contents($real), true, 16, JSON_THROW_ON_ERROR);
    if (!is_array($d) || ($d['version'] ?? null) !== 1 || !is_string($d['id'] ?? null) || !preg_match('/^[a-f0-9]{16}$/D', $d['id']) || !is_string($d['database'] ?? null) || !preg_match('/^task-fixer-cafeteria-[a-zA-Z0-9_-]{1,100}$/D', $d['database']) || !is_string($d['storagePath'] ?? null) || !str_starts_with($d['storagePath'], DIRECTORY_SEPARATOR)) throw new RuntimeException('Descriptor privado inválido.');
    $storage = realpath($d['storagePath']);
    if (!$storage || !is_dir($storage) || !is_writable($storage) || $storage === $root || str_starts_with($storage, $root . DIRECTORY_SEPARATOR)) throw new RuntimeException('Almacenamiento estable no disponible.');
    $d['storagePath'] = $storage;
    return $d;
}
function installation_identity(): array {
    $d = runtime_descriptor();
    if ($d !== null) return ['id'=>$d['id'], 'database'=>$d['database']];
    $web = dirname(__DIR__);
    $id = substr(hash('sha256', $web), 0, 16);
    return ['id'=>$id, 'database'=>basename($web)==='demo-cafeteria'?'task-fixer-cafeteria-beta':'task-fixer-cafeteria-'.$id];
}
