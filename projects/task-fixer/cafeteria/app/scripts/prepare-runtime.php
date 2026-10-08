<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/server/private/core.php';
try {
    $args = array_slice($argv, 1);
    $commit = in_array('--commit', $args, true);
    $args = array_values(array_filter($args, static fn($a)=>$a !== '--commit'));
    if (count($args) !== 2) throw new RuntimeException('Uso: php scripts/prepare-runtime.php APP_DIRECTORY DOCUMENT_ROOT [--commit]');
    $app = realpath($args[0]); $root = realpath($args[1]);
    if (!$app || !$root || $root === DIRECTORY_SEPARATOR || !is_file($app.'/private/core.php') || ($app !== $root && !str_starts_with($app, $root.DIRECTORY_SEPARATOR))) throw new RuntimeException('Revisa las rutas de aplicación y document root.');
    $_SERVER['DOCUMENT_ROOT'] = $root;
    // Compute the existing deployment's identifiers, not this script's source path.
    $locator = $app . '/private/runtime-location.php';
    if (is_file($locator) || getenv('TASKFIXER_CAFE_RUNTIME_CONFIG')) throw new RuntimeException('Ya hay un descriptor configurado; no se reemplazó.');
    $storage = dirname($root).'/taskfixer-private-'.substr(hash('sha256', $app.'/private'),0,16);
    $real = realpath($storage);
    if (!$real || !is_writable($real) || $real === $root || str_starts_with($real, $root.DIRECTORY_SEPARATOR)) throw new RuntimeException('No se encontró la instalación privada existente.');
    $c = config($real); // Validate without changing password hash or encryption key.
    $snapshot = latest($real, base64_decode($c['key'], true));
    $id = substr(hash('sha256', $app),0,16);
    $descriptor = ['version'=>1,'id'=>$id,'database'=>basename($app)==='demo-cafeteria'?'task-fixer-cafeteria-beta':'task-fixer-cafeteria-'.$id,'storagePath'=>$real];
    $target = $real.'/runtime.json';
    if (is_file($target) && read_json($target) !== $descriptor) throw new RuntimeException('Existe un descriptor distinto; no se reemplazó.');
    if ($commit) with_lock($real, function() use($target,$descriptor,$locator) {
        if (is_file($locator)) throw new RuntimeException('Otra preparación ya configuró esta instalación.');
        if (is_file($target) && read_json($target) !== $descriptor) throw new RuntimeException('El descriptor cambió.');
        atomic_write($target,json_encode($descriptor,JSON_THROW_ON_ERROR));
        atomic_write($locator,"<?php\nreturn ".var_export($target,true).";\n");
    });
    echo json_encode(['mode'=>$commit?'prepared':'dry-run','id'=>$id,'database'=>$descriptor['database'],'backupPresent'=>$snapshot!==null,'backupHead'=>$snapshot['head']??0],JSON_THROW_ON_ERROR).PHP_EOL;
} catch (Throwable $e) { fwrite(STDERR, $e->getMessage().PHP_EOL); exit(1); }
