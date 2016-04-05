<?php
include('connection.php');
include('funciones.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

function autorSeparado(){
	$autinfo = mysql_query("SELECT idPersonal, nombres ,apellidos, rutaFoto, descripcion, cargo from personal WHERE cargo != 'cthulhu' && cargo != 'periodista' && cargo != 'admin' order by nombres ");

	while($autpreview = mysql_fetch_array($autinfo)){
	  $autor[] = array(
	    'id' => $autpreview['idPersonal'],
      'nombre' => $autpreview['nombres'],
      'apellidos' => $autpreview['apellidos'],
			'descripcion' => $autpreview['descripcion'],
			'cargo' => $autpreview['cargo'],
			'foto' => $autpreview['rutaFoto']
	  );
	}
	return $autor;
}
echo json_encode(array(
  'subsecciones' => subsecciones(),
  'autores' => autores(),
  'fotografos' => fotografos(),
  'autorSeparado' => autorSeparado()

));
?>
