<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$tipo = $_GET['tipo'];
$id = $editdata -> id;
$fecha = date('Y-m-d');

if($tipo==1){
  $nombre = $editdata -> nombre;
  mysql_query("update cliente set nombre='$nombre' where idCliente=$id");
}elseif($tipo==2){
  mysql_query("delete from cliente where idCliente=$id");
}elseif($tipo == 3){
  $nombre = $editdata -> nombre;
  mysql_query("insert into cliente(nombre,rutaFoto,ingreso) values('$nombre','http://charmcitycineaste.files.wordpress.com/2014/02/very-generic-company-name.jpg','$fecha')");
}

?>
