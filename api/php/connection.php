<?php

define('db_nombre','intulsco_cpdb');
define('db_usuario','intulsco');
define('db_contrasena','garman107');
define('db_host','localhost');

// define('db_nombre','cpdb');
// define('db_usuario','root');
// define('db_contrasena','');
// define('db_host','localhost');

$link = mysql_connect(db_host,db_usuario,db_contrasena);

$db_seleccionada = mysql_select_db(db_nombre, $link);

if (!$db_seleccionada) {
	die('No se puede conectar con la base de datos ');
	}
?>
