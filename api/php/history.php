<?php
include('connection.php');
include('funciones.php');

date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$continfo = mysql_query("SELECT a.idArticulo, a.titulo, s.nombre as subseccion, CONCAT(c.nombres, ' ', c.apellidos) as autor, a.fecha, count(b.idArticulo) as total,
(select CONCAT(d.nombres, ' ', d.apellidos) from personal d, usuario u where a.idUsuario = u.idUsuario and u.idPersonal = d.idPersonal) as creador, a.hora
FROM articulo a, vistaarticulo b, subseccion s, personal c
WHERE a.idPersonal=c.idPersonal and a.idArticulo = b.idArticulo and a.idSubseccion = s.idSubseccion
GROUP BY b.idArticulo
order by a.fecha desc");

while($contpreview = mysql_fetch_array($continfo)){
  $contenido[] = array(
    'id' => $contpreview['idArticulo'],
    'titulo' => $contpreview['titulo'],
    'subseccion' => $contpreview['subseccion'],
    'autor' => $contpreview['autor'],
    'fecha' => $contpreview['fecha'],
    'hora' => $contpreview['hora'],
    'total' => $contpreview['total'],
    'creador' => $contpreview['creador']
  );
}

$colinfo = mysql_query("SELECT a.idColumna, a.titulo, CONCAT(c.nombres, ' ', c.apellidos) as autor, a.fecha, count(b.idColumna) as total,
(select CONCAT(d.nombres, ' ', d.apellidos) from personal d, usuario u where a.idUsuario = u.idUsuario and u.idPersonal = d.idPersonal) as creador, a.hora
FROM columna a, vistacolumna b, personal c
WHERE a.idPersonal=c.idPersonal and a.idColumna = b.idColumna
GROUP BY b.idColumna
order by a.fecha desc");

while($colpreview = mysql_fetch_array($colinfo)){
  $contenido[] = array(
    'id' => $colpreview['idColumna'],
    'titulo' => $colpreview['titulo'],
    'subseccion' => 'Columnistas',
    'autor' => $colpreview['autor'],
    'fecha' => $colpreview['fecha'],
    'hora' => $colpreview['hora'],
    'total' => $colpreview['total'],
    'creador' => $colpreview['creador']
  );
}
// $user = 'dorareyes';
// $clave = '112358';
// mysql_query("insert into usuario(idUsuario,idPersonal,usuario,clave) values('".substr($user,0,2).rand(100,999).$user[strlen($user)-1]."',14,'dorareyes','".md5($clave)."')");

echo json_encode(array(
  'contenido' => $contenido
));
?>
