<?php
include('connection.php');
include('funciones.php');
// $editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');
error_reporting(E_ERROR | E_WARNING | E_PARSE);
// TOP LEIDOS GLOBALES
$leidoinfo = mysql_query("SELECT a.idArticulo as id, a.titulo, s.url as urlSubseccion, se.url as urlSeccion, count(b.idArticulo) as total
                          from articulo a, subseccion s, seccion se, vistaarticulo b where a.idSubseccion = s.idSubseccion and a.activo = 1 and s.idSeccion = se.idSeccion and a.idArticulo = b.idArticulo
                          group by b.idArticulo
                          order by 5 desc
                          limit 9");

while($leidopreview = mysql_fetch_array($leidoinfo)){
  $leido[] = array(
      'id' => $leidopreview['id'],
      'titulo' => $leidopreview['titulo'],
      'urlSubseccion' => $leidopreview['urlSubseccion'],
      'urlSeccion' => $leidopreview['urlSeccion'],
      'total' => $leidopreview['total'],
  );
}
// TOP LEIDOS GLOBALES
// FOTOGALERIA MAS VISTA
$fotoinfo = mysql_query("SELECT a.rutaFoto as foto, a.titulo, count(b.id) as total
                        FROM fotogaleria a, vistafotogaleria b
                        WHERE a.id = b.id
                        group by b.id
                        order by 3 desc
                        limit 1");
$fotopreview = mysql_fetch_row($fotoinfo);
$fotogaleria = array('foto' => $fotopreview[0], 'titulo' => $fotopreview[1], 'total' => $fotopreview[2]);
// FOTOGALERIA MAS VISTA
// CLIENTE MAS VISTO
$clienteinfo = mysql_query("SELECT a.nombre, (SELECT count(b.idBanner) from vistabanner b, banner c where b.idBanner = c.idBanner and c.idCliente = a.idCliente) as total
                          FROM cliente a
                          order by 2 desc
                          limit 1");
$clientepreview = mysql_fetch_row($clienteinfo);
$cliente = array('nombre' => $clientepreview[0], 'total' => $clientepreview[1]);
// CLIENTE MAS VISTO

$bolsainfo = mysql_query("SELECT idBolsa, nombre, porcentaje, valor from bolsa");
while($bolsapreview = mysql_fetch_array($bolsainfo)){
  $bolsas[] = array(
    'id' => $bolsapreview['idBolsa'],
    'nombre' => $bolsapreview['nombre'],
    'porcentaje' => $bolsapreview['porcentaje'],
    'valor' => $bolsapreview['valor']
  );
}
// BOLSAS DEL MUNDO
// MERCADOS DEL MUNDO
$mercadoinfo = mysql_query("SELECT idMercado, nombre, descripcion, cambio, porcentaje, menor, masAlto, ultimo from mercado");
while($mercadopreview = mysql_fetch_array($mercadoinfo)){
  $mercados[] = array(
    'id' => $mercadopreview['idBolsa'],
    'nombre' => $mercadopreview['nombre'],
    'descripcion' => $mercadopreview['descripcion'],
    'menor' => $mercadopreview['menor'],
    'masAlto' => $mercadopreview['masAlto'],
    'ultimo' => $mercadopreview['ultimo'],
    'porcentaje' => $mercadopreview['porcentaje'],
    'cambio' => $mercadopreview['cambio']
  );
}
// MERCADOS DEL MUNDO
// CIFRAS ECONOMICAS
$cifrasinfo = mysql_query("SELECT idDatos, indicador, periodo, cifras, enlaceDetalles as enlace from datoseconomicos");
while($cifraspreview = mysql_fetch_array($cifrasinfo)){
  $cifras[] = array(
    'id' => $cifraspreview['idDatos'],
    'indicador' => $cifraspreview['indicador'],
    'periodo' => $cifraspreview['periodo'],
    'cifras' => $cifraspreview['cifras'],
    'enlace' => $cifraspreview['enlace']
  );
}
// CIFRAS ECONOMICAS
// DIVISAS
$divisasinfo = mysql_query("SELECT idDivisa, nombre, cambio, pais from divisa");
while($divisaspreview = mysql_fetch_array($divisasinfo)){
  $divisas[] = array(
    'id' => $divisaspreview['idDivisa'],
    'nombre' => $divisaspreview['nombre'],
    'cambio' => $divisaspreview['cambio'],
    'pais' => $divisaspreview['pais']
  );
}
// DIVISAS
// TASAS
$tasasinfo = mysql_query("SELECT idTasa, nombre, porcentaje from tasainteres");
while($tasaspreview = mysql_fetch_array($tasasinfo)){
  $tasas[] = array(
    'id' => $tasaspreview['idTasa'],
    'nombre' => $tasaspreview['nombre'],
    'porcentaje' => $tasaspreview['porcentaje']
  );
}
// TASAS
echo json_encode(array(
  'leidos' => $leido,
  'sondeo' => dashSondeo(),
  'fotogaleria' => $fotogaleria,
  'cliente' => $cliente,
  'bolsas' => $bolsas,
  'mercados' => $mercados,
  'cifras' => $cifras,
  'divisas' => $divisas,
  'tasas' => $tasas
));
?>
