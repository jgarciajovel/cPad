<?php
include('connection.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$tipo = $_GET['tipo'];
$id = $editdata -> id;
$fecha = date('Y-m-d');


if($tipo == 'clienteimg'){
  $filename = $_FILES['file']['name'];
  $destination = '../../../img/clientes/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}elseif($tipo == 1){
  $firstQ = mysql_query("SELECT idUsuario FROM `usuario` WHERE `usuario` = '$username' AND `clave` = '$password'");
}
?>
