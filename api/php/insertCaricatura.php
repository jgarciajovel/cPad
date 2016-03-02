<?php
include('connection.php');
include('funciones.php');

$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$autorId = $editdata->autor;

$date = date('Y-m-d');
$time = date('H:i:s');

$filename = $_FILES['file']['name'];
$destination = '../img/' . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination);

mysql_query("INSERT INTO caricatura(rutaFoto, idCaricaturista, fecha, hora) values ('$destination','$autorId','$date','$time')");
?>
