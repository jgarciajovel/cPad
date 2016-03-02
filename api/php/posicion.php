<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$posicion = $_GET['posicion'];

$baninfo = mysql_query("SELECT a.idBanner as id, a.rutaFoto as foto, a.fecha, b.nombre as cliente, c.posicion, count(d.idBanner) as total
                      FROM banner a, cliente b, posicion c, vistabanner d
                      WHERE a.idCliente = b.idCliente and a.idPosicion = c.idPosicion and a.idBanner = d.idBanner and
                      (SELECT f.url from seccion f where f.idSeccion = b.idSeccion) = '$posicion'
                      GROUP BY d.idBanner
                      ORDER BY a.fecha desc, a.hora desc");

while($banpreview = mysql_fetch_array($baninfo)){
  $banners[] = array(
    'id' => $banpreview['id'],
    'foto' => $banpreview['foto'],
    'fecha' => $banpreview['fecha'],
    'cliente' => $banpreview['cliente'],
    'posicion' => $banpreview['posicion'],
    'total' => $banpreview['total']
  );
}

echo json_encode(array(
  'banners' => $banners
));
?>
