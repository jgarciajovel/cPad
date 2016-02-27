<?php
include('connection.php');
include('funciones.php');

date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$fotoinfo = mysql_query("SELECT f.id, f.rutaFoto as foto, f.link, f.titulo, f.fecha, count(c.id) as total
                        FROM fotogaleria f, vistafotogaleria c
                        WHERE f.id = c.id
                        GROUP BY c.id
                        ORDER BY f.fecha desc, f.hora desc");

while($fotopreview = mysql_fetch_array($fotoinfo)){
  $fotogalerias[] = array(
    'id' => $fotopreview['id'],
    'foto' => $fotopreview['foto'],
    'link' => $fotopreview['link'],
    'titulo' => $fotopreview['titulo'],
    'fecha' => $fotopreview['fecha'],
    'total' => $fotopreview['total']
  );
}

echo json_encode(array(
  'fotogalerias' => $fotogalerias
));
?>
