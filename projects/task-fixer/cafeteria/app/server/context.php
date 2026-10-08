<?php
declare(strict_types=1);
require __DIR__.'/private/http.php';
try { boot();if(!authenticated())respond(['error'=>'Entra a IONOS.'],401);$identity=installation_identity();respond(['csrf'=>$_SESSION['csrf'],'api'=>'./api.php','id'=>$identity['id'],'guard'=>true,'database'=>$identity['database']]); }
catch(Throwable $e){error_log('TaskFixer context: '.$e->getMessage());respond(['error'=>'No se pudo confirmar la instalación.'],503);}
