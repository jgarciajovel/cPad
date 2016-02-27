<?php
include('connection.php');
include('funciones.php');

date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$soninfo = mysql_query("SELECT idSondeo, titulo, pregunta, fecha, rutaFoto as foto
											FROM sondeo
											where activo = 1
											ORDER BY fecha desc, hora desc");

while ($sonpreview = mysql_fetch_array($soninfo)) {
	$sondeo[] = array(
							'idSondeo' => $sonpreview['idSondeo'],
							'titulo' => $sonpreview['titulo'],
							'pregunta' => $sonpreview['pregunta'],
							'fecha' => $sonpreview['fecha'],
							'foto' => $sonpreview['foto'],
							'respuestas' => respuestas($sonpreview['idSondeo']),
							'total' => maxTotal($sonpreview['idSondeo'])
	);
}

echo json_encode(array(
  'sondeos' => $sondeo
));

?>
