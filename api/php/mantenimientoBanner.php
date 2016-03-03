<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$tipo = $_GET['tipo'];
$id = $editdata -> id;
$fecha = date('Y-m-d');
$hora = date('H:i:s');
if($tipo == 1){
  $posicion = $editdata -> posicion;
  $cliente = $editdata -> cliente;
  $url = $editdata -> url;
  mysql_query("insert into banner(rutaFoto,idCliente,idPosicion,link,fecha,hora) values('http://kune.es/wordpress/wp-content/uploads/2013/11/banner-iberdrola-generico.jpg',$cliente,$posicion,'$url','$fecha','$hora')");
}elseif($tipo == 2){
  mysql_query("DELETE FROM `banner` WHERE idBanner=$id");
}elseif($tipo == 3){
  $act = $editdata -> act;
  mysql_query("update banner set activo=$act where idBanner=$id");
}

?>
