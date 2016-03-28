<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$tipo = $_GET['tipo'];
if($tipo == 1){
  $nombre = $editdata->nombre;
  $apellido = $editdata->apellido;
  $foto = $editdata->fotonueva;
  if($foto == ''){
    $foto = 'http://smallbusinessbc.ca/wp-content/themes/sbbcmain/images/default-avatar.svg';
  }
  $bio = $editdata->bio;
  $tipo = $editdata->personalTipo;

  mysql_query("INSERT INTO `cpdb`.`personal` (`nombres`, `apellidos`, `descripcion`, `cargo`, `rutaFoto`) VALUES ('$nombre', '$apellido', '$bio', '$tipo', '$foto');");
}
?>
