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
    $ciudad = $editdata -> ciudad;
    mysql_query("update bolsa set nombre='".mysql_escape_string($nombre)."',porcentaje=$porcentaje,valor=$valor,ciudad='".mysql_escape_string($ciudad)."' where idBolsa=$id");
  }elseif($tipo == 2){
    mysql_query("delete from bolsa where idBolsa=$id");
  }elseif($tipo == 3){
    $nombre = $editdata -> nombre;
    $porcentaje = $editdata -> porcentaje;
    $valor = $editdata -> valor;
    $ciudad = $editdata -> ciudad;
    mysql_query("insert into bolsa(nombre,porcentaje,valor,fecha,ciudad) values('".mysql_escape_string($nombre)."',$porcentaje,$valor,'$fecha','".mysql_escape_string($ciudad)."')");
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
    $f = $editdata->fecha;
    mysql_query("update mercado set fecha='$f'");
  }
}elseif($modulo == 3){
  if($tipo == 1){
    $indicador = $editdata -> indicador;
    $periodo = $editdata -> periodo;
    $cifras = $editdata -> cifras;
    $enlace =  $editdata -> enlace;
    mysql_query("update datoseconomicos set indicador='".mysql_escape_string($indicador)."',periodo='".mysql_escape_string($periodo)."',cifras=$cifras,enlaceDetalles='".mysql_escape_string($enlace)."' where idDatos=$id");
  }elseif($tipo == 2){
    mysql_query("delete from datoseconomicos where idDatos=$id");
  }elseif($tipo == 3){
    $indicador = $editdata -> indicador;
    $periodo = $editdata -> periodo;
    $cifras = $editdata -> cifras;
    $enlace =  $editdata -> enlace;
    mysql_query("insert into datoseconomicos(indicador,periodo,cifras,enlaceDetalles) values('".mysql_escape_string($indicador)."','".mysql_escape_string($periodo)."',$cifras,'".mysql_escape_string($enlace)."')");
  }
}elseif($modulo == 4){
  if($tipo == 1){
    $nombre = $editdata -> nombre;
    $pais = $editdata -> pais;
    $cambio = $editdata -> cambio;
    mysql_query("update divisa set nombre='".mysql_escape_string($nombre)."',pais='".mysql_escape_string($pais)."',cambio=$cambio where idDivisa=$id");
  }elseif($tipo == 2){
    mysql_query("delete from divisa where idDivisa=$id");
  }elseif($tipo == 3){
    $nombre = $editdata -> nombre;
    $pais = $editdata -> pais;
    $cambio = $editdata -> cambio;
    mysql_query("insert into divisa(nombre,pais,cambio,fecha) values('".mysql_escape_string($nombre)."','".mysql_escape_string($pais)."',$cambio,'$fecha')");
  }else{
    $f = $editdata->fecha;
    mysql_query("update divisa set fecha='$f'");
  }
}elseif($modulo == 5){
  if($tipo == 1){
    $nombre = $editdata -> nombre;
    $porcentaje = $editdata -> porcentaje;
    mysql_query("update tasainteres set nombre='".mysql_escape_string($nombre)."',porcentaje=$porcentaje where idTasa=$id");
  }elseif($tipo == 2){
    mysql_query("delete from tasainteres where idTasa=$id");
  }elseif($tipo == 3){
    $nombre = $editdata -> nombre;
    $porcentaje = $editdata -> porcentaje;
    mysql_query("insert into tasainteres(nombre,porcentaje,fecha) values('".mysql_escape_string($nombre)."',$porcentaje,'$fecha')");
  }else{
    $f = $editdata->fecha;
    mysql_query("update tasainteres set fecha='$f'");
  }
}

echo json_encode(array(
  'bolsas' => bolsasp(),
  'mercados' => mercadosp(),
  'cifras' => cifrap(),
  'divisas' => divisap(),
  'tasas' => tasap()
));
?>
