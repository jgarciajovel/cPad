<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$tipo = $_GET['tipo'];

if($tipo == 'img'){
  $filename = $_FILES['file']['name'];
  $filename = preg_replace('/\s+/', '', $filename);
  $destination = '../../../img/perfiles/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}elseif($tipo == 'editImg'){

  $autor = $_GET['autor'];
  $foto = $_GET['foto'];

  $delcarcon = mysql_query("SELECT `rutaFoto` FROM `personal` WHERE `idPersonal` = $autor");
  $rowdel = mysql_fetch_row($delcarcon);

  if($rowdel[0] != 'img/perfiles/default-avatar.svg'){
  $filepos = '../../../'.$rowdel[0];
    if (file_exists($filepos)) {
      unlink($filepos);
    }
  }

  $filename = $_FILES['file']['name'];
  $destination = '../../../img/perfiles/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);

  mysql_query("update personal set rutaFoto='$foto' where idPersonal=$autor");

}elseif($tipo == 1){
  $nombre = $editdata->nombre;
  $apellido = $editdata->apellido;
  $foto = $editdata->foto;

  if($foto == ''){
    $foto = 'img/perfiles/default-avatar.svg';
  }
  $bio = $editdata->bio;
  $tipo = $editdata->personalTipo;

  mysql_query("INSERT INTO `personal` (`nombres`, `apellidos`, `descripcion`, `cargo`, `rutaFoto`) VALUES ('$nombre', '$apellido', '$bio', '$tipo', '$foto');");
}elseif($tipo == 3){
  $idAutor = $editdata->autor;
  $nombre = $editdata->nombre;
  $apellido = $editdata->apellido;
  $foto = $editdata->foto;
  $bio = $editdata->bio;
  $cargo = $editdata->personalTipo;

  if(!$cargo){
    mysql_query("update personal set nombres='".mysql_escape_string($nombre)."', apellidos='".mysql_escape_string($apellido)."', descripcion='".mysql_escape_string($bio)."' where idPersonal=$idAutor");
  }else{
    mysql_query("update personal set nombres='".mysql_escape_string($nombre)."', apellidos='".mysql_escape_string($apellido)."', descripcion='".mysql_escape_string($bio)."', cargo='".mysql_escape_string($cargo)."' where idPersonal=$idAutor");
  }

}
?>
