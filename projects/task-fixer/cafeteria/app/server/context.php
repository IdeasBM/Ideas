<?php
declare(strict_types=1);
require __DIR__.'/private/http.php';
try { boot();if(!authenticated())respond(['error'=>'Entra a IONOS.'],401);$id=substr(hash('sha256',__DIR__),0,16);respond(['csrf'=>$_SESSION['csrf'],'api'=>'./api.php','id'=>$id,'guard'=>true,'database'=>basename(__DIR__)==='demo-cafeteria'?'task-fixer-cafeteria-beta':'task-fixer-cafeteria-'.$id]); }
catch(Throwable $e){error_log('TaskFixer context: '.$e->getMessage());respond(['error'=>'No se pudo confirmar la instalación.'],503);}
