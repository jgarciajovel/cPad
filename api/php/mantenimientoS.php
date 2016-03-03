<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$id = $_GET['id'];
$tipo = $_GET['tipo'];

if($tipo == 'img'){
  $filename = $_FILES['file']['name'];
  $destination = '../../../img/sondeos/'.$filename;
  move_uploaded_file( $_FILES['file']['tmp_name'],$destination);
}if($tipo == 1){
  $titulo = $editdata->iTitulo;
  $pregunta = $editdata->iPregunta;
  $fileruta = $editdata->filer;
  $opcion1 = $editdata->iOpcion1;
  $opcion2 = $editdata->iOpcion2;


  $date = date('Y-m-d');
  $time = date('H:i:s');

  mysql_query("INSERT INTO `sondeo` (`titulo`, `pregunta`, `fecha`, `hora`, `rutaFoto`, `activo`) VALUES ('$titulo', '$pregunta', '$date', '$time', '$fileruta', '1')");

  $usquery = mysql_query("SELECT max(`idSondeo`) as idSondeo FROM `sondeo`");
  $usrow = mysql_fetch_row($usquery);
  $sondeoId = $usrow[0];

  if(isset($opcion1) && isset($opcion2)){
    mysql_query("INSERT INTO `respuesta` (`idSondeo`, `respuesta`) VALUES ('$sondeoId', '$opcion1')");
    mysql_query("INSERT INTO `respuesta` (`idSondeo`, `respuesta`) VALUES ('$sondeoId', '$opcion2')");
  }
    }elseif($tipo == 2){
        $delcarcon = mysql_query("SELECT `rutaFoto` FROM `sondeo` WHERE `idSondeo` = $id;");
        $rowdel = mysql_fetch_row($delcarcon);
        $filepos = '../../../'.$rowdel[0];
        if (file_exists($filepos)) {
          unlink($filepos);
        }

        mysql_query("delete from sondeo where idSondeo = $id");

      }elseif($tipo == 'delRespuesta'){
        $idRespi = $editdata->idres;
        mysql_query("delete from respuesta where idRespuesta = $idRespi");

      }elseif($tipo == 'addRespuesta'){
          $nres = $editdata->nres;
          $idnsondeo = $editdata->nidsondeo;
          mysql_query("INSERT INTO `respuesta` (`idSondeo`, `respuesta`) VALUES ('$idnsondeo', '$nres')");
        }
?>
