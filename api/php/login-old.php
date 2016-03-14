<?php
include('connection.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

if(1==1){
// if(isset($editdata -> username) && isset($editdata -> password)){
  // $username = $editdata -> username;
  // $password = md5($editdata -> password);
  $username = $_GET['username'];
  $password = md5($_GET['password']);


$firstQ = mysql_query("SELECT idUsuario FROM `usuario` WHERE `usuario` = '$username' AND `clave` = '$password'");

$firstValidation = mysql_fetch_row($firstQ);

$id = $firstValidation[0];

$userinfo = mysql_query("SELECT CONCAT(c.nombres, ' ', c.apellidos) as nombre, c.rutaFoto as foto, c.descripcion, c.idPersonal FROM usuario u, personal c
                        WHERE u.idPersonal = c.idPersonal and u.idUsuario = '$id'");
$userpreview = mysql_fetch_row($userinfo);


// function redes($id){
//
//     $usernetinfo = mysql_query("SELECT r.nombre, a.link from redespersonal a inner join redessociales r on a.idRed = r.idRed and a.idPersonal = $id");
//     while($userpreview = mysql_fetch_array($usernetinfo)){
//       $usernet[] = array(
//         'nombre' => $userpreview['nombre'],
//         'link' => $userpreview['link']
//       );
//     }
//
//
//     // $idred = $usernet[1];
//     // $redes = mysql_query("SELECT `nombre` FROM `redessociales` WHERE `idRed` = $idred");
//     // while($redesname = mysql_fetch_array($redes)){
//     //   $redesarr[] = array(
//     //     'redes' => $redesname[0],
//     //   );
//     // }
//
//     return $usernet;
//   }

function redeslink($id,$nombre){
  $redinfo = mysql_query("SELECT r.link from redespersonal r, redessociales a where r.idPersonal = $id and a.idRed = $nombre");
  $redprev = mysql_fetch_row($redinfo);
  return $redprev[0];
}

  echo json_encode(
    array(
      'id' =>  $id,
      'nombre' => $userpreview[0],
      'foto' => $userpreview[1],
      'bio' => $userpreview[2],
      'redes' => array(
        'facebook' => redeslink($userpreview[3],1),
        'twitter' => redeslink($userpreview[3],2),
        'linkedin' => redeslink($userpreview[3],3),
        'googleplus' => redeslink($userpreview[3],4),
        'mail' => redeslink($userpreview[3],5)
      )
    )
  );
}

if(isset($editdata->id) != null){

  $idd = $editdata->id;

  $userinfo = mysql_query("SELECT CONCAT(c.nombres, ' ', c.apellidos) as nombre, c.rutaFoto as foto, c.descripcion
                          FROM usuario u, personal c
                          WHERE u.idPersonal = c.idPersonal and u.idUsuario = '$idd'");
  $userpreview = mysql_fetch_row($userinfo);
  echo json_encode(
    array(
      'id' =>  $idd,
      'nombre' => $userpreview[0],
      'foto' => $userpreview[1],
      'bio' => $userpreview[2]
    )
  );

}
// function redes(id){
//   $redesinfo = mysql_query("SELECT ");
// }
?>
