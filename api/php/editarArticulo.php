<?php
include('connection.php');
include('funciones.php');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
$id = $editdata -> id;
$tipo = $_GET['tipo'];
if($tipo == 1){
  $categoria = $editdata -> categoria;
  $preview = $editdata -> preview;
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $destacado = $editdata -> destacado;
  $titulo = $editdata -> titulo;
  $fotografo = $editdata -> fotografo;
  $ruta = $editdata -> ruta;
  $activo = $editdata -> activo;
  $columna = $editdata -> columna;
  mysql_query("UPDATE articulo set titulo='".mysql_escape_string($titulo)."',preview='".mysql_escape_string($preview)."',contenido='".mysql_escape_string($contenido)."',idPersonal = $autor, idSubseccion = $categoria,especial=$destacado, activo=$activo where idArticulo=$id");
  mysql_query("update imagenesarticulo set rutaFoto='".mysql_escape_string($ruta)."',idFotografo=$fotografo where idArticulo = $id");
}elseif($tipo == 2){
  $categoria = $editdata -> categoria;
  $preview = $editdata -> preview;
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $destacado = $editdata -> destacado;
  $titulo = $editdata -> titulo;
  $activo = $editdata -> activo;
  mysql_query("UPDATE articulo set titulo='".mysql_escape_string($titulo)."',preview='".mysql_escape_string($preview)."',contenido='".mysql_escape_string($contenido)."',idPersonal = $autor, idSubseccion = $categoria,especial=$destacado, activo=$activo where idArticulo=$id");
}elseif($tipo == 3){
  $autor = $editdata -> autor;
  $contenido = $editdata -> contenido;
  $titulo = $editdata -> titulo;
  $activo = $editdata -> activo;
  $columna = $editdata -> columna;
  mysql_query("UPDATE columna set titulo='".mysql_escape_string($titulo)."',contenido='".mysql_escape_string($contenido)."',idSubseccion=$columna,idPersonal=$autor,activo=$activo where idColumna=$id");
}


?>
