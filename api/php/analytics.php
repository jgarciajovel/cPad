<?php
include('connection.php');
include('funciones.php');
// $editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

//PUBLICIDAD MAS VISTA
// $publinfo = mysql_query("SELECT a.rutaFoto, a.fecha, count(b.idBanner) as total, c.nombre
//                         FROM banner a, vistabanner b, cliente c
//                         WHERE a.idBanner = b.idBanner and a.idCliente = c.idCliente
//                         GROUP BY b.idBanner
//                         ORDER BY 3 desc
//                         limit 1");
// $publpreview = mysql_fetch_row($publinfo);
// $publicidad = array('foto' => $publpreview[0]);
//PUBLICIDAD MAS VISTA

echo json_encode(array(
  'clientePopular' => clientePopular()
));
?>
