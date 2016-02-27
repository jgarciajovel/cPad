<?php
include('connetcion.php');
include('funciones.php');

date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$continfo = mysql_query("SELECT a.idArticulo, a.titulo, s.nombre as subeccion, s.url as urlSubseccion, se.url as urlSeccion, CONCAT(c.nombres, ' ', c.apellidos) as autor, a.fecha, count(b.idArticulo) as total
FROM articulo a, vistaarticulo b, seccion se, subseccion s, personal c
WHERE a.idPersonal=c.idPersonal and a.idArticulo = b.idArticulo and a.idSubseccion = s.idSubseccion and s.idSeccion = se.idSeccion
GROUP BY b.idArticulo
ORDER BY 7 desc");


echo json_encode(array(
  'contenido' => $contenido
));
?>
