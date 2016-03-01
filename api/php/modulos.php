<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $_GET['id'];
$tipo = $_GET['tipo'];
$modulo = $_GET['modulo'];
$fecha = date('Y-m-d');

if($modulo == 1){
  if($tipo == 1){
    $nombre = $_GET['nombre'];
    $porcentaje = $_GET['porcentaje'];
    $valor = $_GET['valor'];
    mysql_query("update bolsa set nombre='$nombre',porcentaje=$porcentaje,valor=$valor where idBolsa=$id");
  }elseif($tipo == 2){
    mysql_query("delete from bolsa where idBolsa=$id");
  }else{
    $nombre = $_GET['nombre'];
    $porcentaje = $_GET['porcentaje'];
    $valor = $_GET['valor'];
    mysql_query("insert into bolsa(nombre,porcentaje,valor,fecha) values('$nombre',$porcentaje,$valor,$fecha)");
  }
}else{

}

echo json_encode(array(
  'bolsas' => bolsasp()
));
?>
