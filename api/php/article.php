<?php
include('connection.php');
include('funciones.php');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

echo json_encode(array(
  'subsecciones' => subsecciones(),
  'autores' => autores(),
  'fotografos' => fotografos()
));
?>
