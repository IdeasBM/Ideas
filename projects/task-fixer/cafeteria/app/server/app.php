<?php
// Generic offline shell: contains code only, never account, session token, or operational data.
header('Content-Type: text/html; charset=utf-8');header('Cache-Control: public, max-age=0, must-revalidate');header('X-Content-Type-Options: nosniff');header('X-Frame-Options: DENY');header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; object-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
readfile(__DIR__.'/private/app.html');
