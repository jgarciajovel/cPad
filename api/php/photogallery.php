<?php
include('connection.php');
include('funciones.php');

date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);


echo json_encode(array(
  'fotogalerias' => fotogaleriap()
));
?>
