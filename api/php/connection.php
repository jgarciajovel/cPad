<?php

// define('db_nombre','');
// define('db_usuario','');
// define('db_contrasena','');
// define('db_host','');

define('db_nombre','cpdb');
define('db_usuario','root');
define('db_contrasena','');
define('db_host','localhost');

$link = mysql_connect(db_host,db_usuario,db_contrasena);

$db_seleccionada = mysql_select_db(db_nombre, $link);

if (!$db_seleccionada) {
	die('No se puede conectar con la base de datos ');
}
?>
