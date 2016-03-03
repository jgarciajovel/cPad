<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $_GET['id'];
$tipo = $_GET['tipo'];

if($tipo == 1){
  $autorId = $editdata->autor;
  $fileruta = $editdata->filer;
  $link = $editdata->linkF;
  $titulo = $editdata->tituloF;

  $date = date('Y-m-d');
  $time = date('H:i:s');

  $filename = $_FILES['file']['name'];
  $destination = '../../../img/fotogalerias/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);

  mysql_query("INSERT INTO fotogaleria(rutaFoto, link, titulo, idFotografo,fecha, hora) values ('$fileruta','$link','$titulo','$autorId','$date','$time')");
}elseif($tipo == 2){
    $delcarcon = mysql_query("SELECT `rutaFoto` FROM `fotogaleria` WHERE `id` = $id;");
    $rowdel = mysql_fetch_row($delcarcon);
    $filepos = '../../../'.$rowdel[0];
      if (file_exists($filepos)) {
        unlink($filepos);
      }
    mysql_query("delete from fotogaleria where id = $id");
}

echo json_encode(array(
  'fotogalerias' => fotogaleriap(),
));
?>
