<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$posicion = $_GET['posicion'];

$baninfo = mysql_query("SELECT a.idBanner as id, a.activo, a.rutaFoto as foto, a.fecha, a.idPosicion, b.nombre as cliente, c.posicion, count(d.idBanner) as total
                      FROM banner a, cliente b, posicion c, vistabanner d
                      WHERE a.idCliente = b.idCliente and a.idPosicion = c.idPosicion and a.idBanner = d.idBanner and
                      (SELECT f.url from seccion f where f.idSeccion = c.idSeccion) = '$posicion'
                      GROUP BY d.idBanner
                      ORDER BY a.fecha desc, a.hora desc");


$posinfo = mysql_query("SELECT c.idPosicion, c.posicion, c.tiempo from posicion c where (SELECT f.url from seccion f where f.idSeccion = c.idSeccion) = '$posicion'");

while($banpreview = mysql_fetch_array($baninfo)){
  $banners[] = array(
    'id' => $banpreview['id'],
    'idPosicion' => $banpreview['idPosicion'],
    'foto' => $banpreview['foto'],
    'activo' => $banpreview['activo'],
    'fecha' => $banpreview['fecha'],
    'cliente' => $banpreview['cliente'],
    'posicion' => $banpreview['posicion'],
    'total' => $banpreview['total']
  );
}
while($pospreview = mysql_fetch_array($posinfo)){
  $posiciones[] = array(
    'idPosicion' => $pospreview['idPosicion'],
    'posicion' => $pospreview['posicion'],
    'tiempo' => $pospreview['tiempo']/1000,
    'ocupados' => ocupados($pospreview['idPosicion']),
    'clientes' => clientes($pospreview['idPosicion']),
    'maxCliente' =>  maxCliente($pospreview['idPosicion'])
  );
}
function allClients(){
  $clinfo = mysql_query("SELECT a.idCliente, a.nombre, a.rutaFoto from cliente a order by 1");
  while($clipreview = mysql_fetch_array($clinfo)){
    $clientes[] = array(
      'id'=> $clipreview['idCliente'],
      'nombre' => $clipreview['nombre'],
      'foto' => $clipreview['rutaFoto']
    );
  }
  return $clientes;
}
function ocupados($idPosicion){
  $oc = mysql_query("SELECT count(b.idBanner) from banner b where idPosicion = $idPosicion");
  $ocp = mysql_fetch_row($oc);
  return $ocp[0];
}
function maxCliente($idPoscion){
  $clinfo = mysql_query("SELECT a.nombre, (SELECT count(b.idBanner) from vistabanner b, banner c where b.idBanner = c.idBanner and c.idCliente = a.idCliente and c.idPosicion = $idPoscion) as total
	                          FROM cliente a
	                          order by 2 desc
	                          limit 1");
  $clpreview = mysql_fetch_row($clinfo);
  return $clpreview[0];
}
function clientes($idPosicion){
  $clinfo = mysql_query("SELECT a.nombre from cliente a, banner b where b.idCliente = a.idCliente and b.idPosicion = $idPosicion group by a.nombre order by 1");
  $i=0;
  while($clipreview = mysql_fetch_array($clinfo)){
    $clientes[$i] = $clipreview['nombre'];
    $i++;
  }
  return $clientes;
}
echo json_encode(array(
  'banners' => $banners,
  'posiciones' => $posiciones,
  'clientes' => allClients()
));
?>
