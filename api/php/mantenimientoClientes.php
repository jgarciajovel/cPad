<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$tipo = $_GET['tipo'];
$id = $editdata -> id;
$fecha = date('Y-m-d');

if($tipo == 'clienteimg'){
  $filename = $_FILES['file']['name'];
  $destination = '../../../img/clientes/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}elseif($tipo==1){

  $editrutacliente = $editdata -> editruta;

  $nombre = $editdata -> nombre;

  if(isset($nombre) && isset($editrutacliente)){
    mysql_query("update cliente set nombre='$nombre', rutaFoto='$editrutacliente' where idCliente=$id");
  }elseif(isset($nombre)){
    mysql_query("update cliente set nombre='$nombre' where idCliente=$id");
  }elseif(isset($editrutacliente)){
    mysql_query("update cliente set rutaFoto='$editrutacliente' where idCliente=$id");
  }

}elseif($tipo==2){

  $delcarcon = mysql_query("SELECT `rutaFoto` FROM `cliente` WHERE `idCliente` = $id;");
  $rowdel = mysql_fetch_row($delcarcon);
  $filepos = '../../../'.$rowdel[0];
    if (file_exists($filepos)) {
      unlink($filepos);
    }

  $editrutacliente = $editdata -> editruta;

  mysql_query("delete from cliente where idCliente=$id");
}elseif($tipo == 3){
  $nombre = $editdata -> nombre;
  $clientef = $editdata -> clientefoto;
  mysql_query("insert into cliente(nombre,rutaFoto,ingreso) values('$nombre','$clientef','$fecha')");
}elseif($tipo == 'editclienteimgss'){
  $editid = $_GET['editid'];
  $delcarcon = mysql_query("SELECT `rutaFoto` FROM `cliente` WHERE `idCliente` = $editid;");
  $rowdel = mysql_fetch_row($delcarcon);
  $filepos = '../../../'.$rowdel[0];
    if (file_exists($filepos)) {
      unlink($filepos);
    }

  $filename = $_FILES['file']['name'];
  $destination = '../../../img/clientes/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);

  mysql_query("update cliente set rutaFoto='$editrutacliente' where idCliente=$id");

}

?>
