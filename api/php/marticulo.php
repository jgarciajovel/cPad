<?php
include('connection.php');
include('funciones.php');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$tipo = $_GET['tipo'];
$fecha = date('Y-m-d');
$hora = date('H:i:s');
if($tipo == 'img'){
  $filename = $_FILES['file']['name'];
  $destination = '../../../img/articulos/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}elseif($tipo == 1){
  $categoria = $editdata -> categoria;
  $preview = $editdata -> preview;
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $destacado = $editdata -> destacado;
  $creador = $editdata -> creador;
  $titulo = $editdata -> titulo;
  $fotografo = $editdata -> fotografo;
  $ruta = $editdata -> ruta;

  mysql_query("INSERT into articulo(titulo,preview,contenido,idPersonal,idSubseccion,fecha,hora,especial,idUsuario) values('".mysql_escape_string($titulo)."','".mysql_escape_string($preview)."','".mysql_escape_string($contenido)."',$autor,$categoria,'$fecha','$hora',$destacado,'$creador')");
  $usquery = mysql_query("SELECT max(`idArticulo`) FROM `articulo`");
  $usrow = mysql_fetch_row($usquery);
  $articuloId = $usrow[0];
  mysql_query("INSERT into imagenesarticulo(rutaFoto,idArticulo,posicion,idFotografo) values('".mysql_escape_string($ruta)."',$articuloId,'principal',$fotografo)");
}elseif($tipo == 2){
  $categoria = $editdata -> categoria;
  $preview = $editdata -> preview;
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $destacado = $editdata -> destacado;
  $creador = $editdata -> creador;
  $titulo = $editdata -> titulo;
  mysql_query("INSERT into articulo(titulo,preview,contenido,idPersonal,idSubseccion,fecha,hora,idUsuario) values('".mysql_escape_string($titulo)."','".mysql_escape_string($preview)."','".mysql_escape_string($contenido)."',$autor,$categoria,'$fecha','$hora','$creador')");
}elseif($tipo == 3){
  $columna = $editdata -> columna;
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $creador = $editdata -> creador;
  $titulo = $editdata -> titulo;
  mysql_query("INSERT into columna(titulo,contenido,fecha,hora,idSubseccion,idPersonal,idUsuario) values('".mysql_escape_string($titulo)."','".mysql_escape_string($contenido)."','$fecha','$hora',$columna,$autor,'$creador')");
}
?>
