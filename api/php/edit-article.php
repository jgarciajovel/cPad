<?php
include('connection.php');
include('funciones.php');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$id = $_GET['id'];
$tipo = $_GET['tipo'];

if($tipo = 'articulo'){
    $artinfo = mysql_query("SELECT titulo, preview, contenido, idPersonal, idSubseccion, especial, activo
                            from articulo
                            Where idArticulo = $id");
    $artpreview = mysql_fetch_row($artinfo);
    $articulo = array(
      'id' => $id,
      'titulo' => $artpreview[0],
      'preview' => $artpreview[1],
      'contenido' => $artpreview[2],
      'idPersonal' => $artpreview[3],
      'idSubseccion' => $artpreview[4],
      'especial' => $artpreview[5],
      'activo' => $artpreview[6],
      'imagen' => imagen($artpreview[0])
    );
}else{

}
function imagen(id){
  $imginfo = mysql_query("SELECT i.idImagen, i.rutaFoto, f.idFotografo, f.nombre from imagenesarticulos inner join fotografo on i.idFotografo = f.idFotografo");
}

echo json_encode(array(
  'subsecciones' => subsecciones(),
  'autores' => autores(),
  'fotografos' => fotografos()
));
?>
