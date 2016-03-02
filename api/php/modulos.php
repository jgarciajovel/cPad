<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $editdata -> id;
$tipo = $_GET['tipo'];
$modulo = $_GET['modulo'];
$fecha = date('Y-m-d');

if($modulo == 1){
  if($tipo == 1){
    $nombre = $editdata -> nombre;
    $porcentaje = $editdata -> porcentaje;
    $valor = $editdata -> valor;
    mysql_query("update bolsa set nombre='".mysql_escape_string($nombre)."',porcentaje=$porcentaje,valor=$valor where idBolsa=$id");
  }elseif($tipo == 2){
    mysql_query("delete from bolsa where idBolsa=$id");
  }elseif($tipo == 3){
    $nombre = $editdata -> nombre;
    $porcentaje = $editdata -> porcentaje;
    $valor = $editdata -> valor;
    mysql_query("insert into bolsa(nombre,porcentaje,valor,fecha) values('".mysql_escape_string($nombre)."',$porcentaje,$valor,'$fecha')");
  }else{
    $f = $editdata->fecha;
    mysql_query("update bolsa set fecha='$f'");
  }
}elseif($modulo == 2){
  if($tipo == 1){
    $nombre = $editdata -> nombre;
    $descripcion = $editdata -> descripcion;
    $ultimo = $editdata -> ultimo;
    $cambio = $editdata -> cambio;
    $porcentaje = $editdata -> porcentaje;
    $menor = $editdata -> menor;
    $masAlto = $editdata -> masAlto;
    mysql_query("update mercado set nombre='".mysql_escape_string($nombre)."',descripcion='".mysql_escape_string($descripcion)."',ultimo=$ultimo,cambio=$cambio,porcentaje=$porcentaje,menor=$menor,masAlto=$masAlto where idMercado=$id");
  }elseif($tipo == 2){
    mysql_query("delete from mercado where idMercado=$id");
  }elseif($tipo == 3){
    $nombre = $editdata -> nombre;
    $descripcion = $editdata -> descripcion;
    $ultimo = $editdata -> ultimo;
    $cambio = $editdata -> cambio;
    $porcentaje = $editdata -> porcentaje;
    $menor = $editdata -> menor;
    $masAlto = $editdata -> masAlto;
    mysql_query("insert into mercado(nombre,descripcion,ultimo,cambio,porcentaje,menor,masAlto,fecha) values('".mysql_escape_string($nombre)."','".mysql_escape_string($descripcion)."',$ultimo,$cambio,$porcentaje,$menor,$masAlto,'$fecha')");
  }else{

  }
}

echo json_encode(array(
  'bolsas' => bolsasp(),
  'mercados' => mercadosp()
));
?>
