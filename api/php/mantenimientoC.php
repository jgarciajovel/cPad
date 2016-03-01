<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $_GET['id'];
$tipo = $_GET['tipo'];

if(tipo == 1){

}else{
  try{
    mysql_query("delete from caricatura where idCaricatura = $id");
  }catch(Exception $x){
    echo 'No se pudo realizar la operación';
  }
}

echo json_encode(array(
  'caricaturas' => caricaturap()
));
?>
