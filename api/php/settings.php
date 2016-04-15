<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $editdata->id;
$mail = $editdata->mail;
$bio = $editdata->bio;
$twitter = $editdata->twitter;
$facebook = $editdata->facebook;
$linkedin = $editdata->linkedin;
$googleplus = $editdata->googleplus;
$ruta = $editdata->ruta;

$tipo = $_GET['tipo'];

if($tipo == 'img'){
  $autor = $_GET['userid'];
  $foto = $_GET['foto'];

  $delcarcon = mysql_query("SELECT `rutaFoto` FROM `personal` WHERE idPersonal = (SELECT idPersonal from usuario where idUsuario = '$autor')");
  $rowdel = mysql_fetch_row($delcarcon);

  // if($rowdel[0] != 'img/perfiles/default-avatar.svg'){
  // $filepos = '../../../'.$rowdel[0];
  //   if (file_exists($filepos)) {
  //     unlink($filepos);
  //   }
  // }

  $filename = $_FILES['file']['name'];
  echo $destination = '../../../img/perfiles/'.$filename;
  move_uploaded_file($_FILES['file']['tmp_name'],$destination);

  mysql_query("UPDATE personal set rutaFoto='$foto' where idPersonal = (SELECT idPersonal from usuario where idUsuario = '$autor')");
}else{
  mysql_query("UPDATE personal set descripcion='".mysql_escape_string($bio)."' where idPersonal = (SELECT idPersonal from usuario where idUsuario = '$id')");
  mysql_query("UPDATE usuario set mail='".mysql_escape_string($mail)."',facebook='".mysql_escape_string($facebook)."',twitter='".mysql_escape_string($twitter)."',linkedin='".mysql_escape_string($linkedin)."',googleplus='".mysql_escape_string($googleplus)."' where idUsuario = '$id'");
}

?>
