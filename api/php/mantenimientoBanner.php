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
$banneru = $editdata -> banner;

if($tipo == 'banner'){
  $filename = $_FILES['file']['name'];
  $destination = '../../../img/banners/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}elseif($tipo == 1){
  $posicion = $editdata -> posicion;
  $cliente = $editdata -> cliente;
  $url = $editdata -> url;
  mysql_query("insert into banner(rutaFoto,idCliente,idPosicion,link,fecha,hora) values('$banneru',$cliente,$posicion,'$url','$fecha','$hora')");
}elseif($tipo == 2){
  $delcarcon = mysql_query("SELECT `rutaFoto` FROM `banner` WHERE `idBanner` = $id;");
  $rowdel = mysql_fetch_row($delcarcon);
  $filepos = '../../../'.$rowdel[0];
    if (file_exists($filepos)) {
      unlink($filepos);
    }

  mysql_query("DELETE FROM `banner` WHERE idBanner=$id");
}elseif($tipo == 3){
  $act = $editdata -> act;
  mysql_query("update banner set activo=$act where idBanner=$id");
}

?>
