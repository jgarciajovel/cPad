<?php
include('connection.php');
include('funciones.php');
// $editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

//PUBLICIDAD MAS VISTA
$publinfo = mysql_query("SELECT a.rutaFoto, a.fecha, count(b.idBanner) as total, c.nombre
                        FROM banner a, vistabanner b, cliente c
                        WHERE a.idBanner = b.idBanner and a.idCliente = c.idCliente
                        GROUP BY b.idBanner
                        ORDER BY 3 desc
                        limit 1");
$publpreview = mysql_fetch_row($publinfo);
$publicidad = array('foto' => $publpreview[0],'fecha' => $publpreview[1],'total' => $publpreview[2],'cliente'=>$publpreview[3]);
//PUBLICIDAD MAS VISTA
//SECCION POPULAR

$secinfo = mysql_query("SELECT se.nombre, count(p.idSeccion)*5 as total, (SELECT count(b.idBanner) from banner b where (Select u.idSeccion from posicion u where u.idPosicion = b.idPosicion) = p.idSeccion) as ocupadas
                      FROM seccion se, posicion p
                      WHERE se.idSeccion = p.idSeccion
                      GROUP BY p.idSeccion
                      order by 3 desc, 2 desc");

// $secpreview = mysql_fetch_row($secinfo);
// $seccionPopular = array('nombre' => $secpreview[0], 'total' => $secpreview[1], 'ocupadas' => $secpreview[2]);
while($secpreview = mysql_fetch_array($secinfo)){
  $seccionPopular[]=array(
    'nombre' => $secpreview['nombre'],
    'total' => $secpreview['total'],
    'ocupadas' => $secpreview['ocupadas']
  );
}
//SECCION POPULAR
//TOTAL
$totalinfo = mysql_query("SELECT sum(total) as total,
                        (SELECT count(d.idBanner)
                        FROM banner d
                        WHERE d.activo = 1) as ocupadas
                        FROM (SELECT count(b.idPosicion)*5 as total
                        FROM seccion se, posicion b
                        WHERE se.idSeccion = b.idSeccion
                        GROUP BY b.idPosicion) as A");
$totalpreview = mysql_fetch_row($totalinfo);
$total = array('total' => $totalpreview[0], 'ocupadas' => $totalpreview[1]);
//TOTAL
//POSICION POPULAR
$pospinfo = mysql_query("SELECT se.nombre, b.posicion, count(c.idPosicion) as total
                              FROM seccion se, posicion b, banner c
                              WHERE se.idSeccion = b.idSeccion and b.idPosicion = c.idPosicion
                              GROUP BY c.idPosicion
                              ORDER BY 3 desc
                              limit 1");
$posppreview = mysql_fetch_row($pospinfo);
$posicionp = array('seccion' => $posppreview[0], 'posicion' => $posppreview[1], 'total' => $posppreview[2]);
//POSICION POPULAR
//POSICION MENOS POPULAR
$posminfo = mysql_query("SELECT se.nombre, b.posicion, count(c.idPosicion) as total
                              FROM seccion se, posicion b, banner c
                              WHERE se.idSeccion = b.idSeccion and b.idPosicion = c.idPosicion
                              GROUP BY c.idPosicion
                              ORDER BY 3
                              limit 1");
$posmpreview = mysql_fetch_row($posminfo);
$posicionm = array('seccion' => $posmpreview[0], 'posicion' => $posmpreview[1], 'total' => $posmpreview[2]);
//POSICION MENOS POPULAR
echo json_encode(array(
  'clientePopular' => clientePopular(),
  'publicidadPopular' => $publicidad,
  'posicionP' => $posicionp,
  'posicionM' => $posicionm,
  'total' => $total,
  'seccionPopular' => $seccionPopular
));
?>
