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
if(modulo == 1){
  if(tipo == 1){
    $nombre = $_GET['nombre'];
    $porcentaje = $_GET['porcentaje'];
    $valor = $_GET['valor'];
    try{
      mysql_query("update bolsa set nombre='$nombre',porcentaje=$porcentaje,valor=$valor where idBolsa=$id");
    }catch(Exception $x){
      echo 'No se pudo realizar la operación';
    }
  }else{

  }
}else{

}

echo json_encode(array(
  'bolsas' => bolsasp()
));
?>
