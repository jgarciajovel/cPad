<?php
include('connection.php');
include('funciones.php');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$id = $_GET['id'];
$tipo = $_GET['tipo'];

if($tipo == 'articulo'){
    $artinfo = mysql_query("SELECT a.titulo, a.preview, a.contenido, a.idPersonal, a.idSubseccion, a.especial, a.activo
                            from articulo a where a.idArticulo = $id");
    $artpreview = mysql_fetch_row($artinfo);
    if($artpreview[4] == 1 || $artpreview[4] == 3 || $artpreview[4] == 4){
      $articulo = array(
        'id' => $id,
        'titulo' => $artpreview[0],
        'preview' => $artpreview[1],
        'contenido' => $artpreview[2],
        'idPersonal' => $artpreview[3],
        'idSubseccion' => $artpreview[4],
        'especial' => $artpreview[5],
        'activo' => $artpreview[6],
      );
    }else{
      $articulo = array(
        'id' => $id,
        'titulo' => $artpreview[0],
        'preview' => $artpreview[1],
        'contenido' => $artpreview[2],
        'idPersonal' => $artpreview[3],
        'idSubseccion' => $artpreview[4],
        'especial' => $artpreview[5],
        'activo' => $artpreview[6],
        'imagen' => imagen($id)
      );
    }
}else{
  $artinfo = mysql_query("SELECT titulo, contenido, idPersonal, activo, idSubseccion, idPersonal
                          from columna
                          Where idColumna = $id");
  $artpreview = mysql_fetch_row($artinfo);
  $articulo = array(
    'id' => $id,
    'titulo' => $artpreview[0],
    'contenido' => $artpreview[1],
    'idPersonal' => $artpreview[2],
    'activo' => $artpreview[3],
    'columna' => $artpreview[4],
    'idSubseccion' => '2'
  );
}
function imagen($id){
  $imginfo = mysql_query("SELECT i.idImagen, i.rutaFoto, f.idFotografo, f.nombre from imagenesarticulo i inner join fotografo f on i.idFotografo = f.idFotografo and i.idArticulo = $id");
  $imgpreview = mysql_fetch_row($imginfo);
  $imagen = array(
    'idImagen' => $imgpreview[0],
    'foto' => $imgpreview[1],
    'idFotografo' => $imgpreview[2],
    'fotografo' => $imgpreview[3]
  );
  return $imagen;
}

echo json_encode(array(
  'subsecciones' => subsecciones(),
  'autores' => autores(),
  'fotografos' => fotografos(),
  'articulo' => $articulo
));
?>
