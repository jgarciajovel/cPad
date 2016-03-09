<?php
include('connection.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

if(isset($editdata -> username) && isset($editdata -> password)){
  $username = $editdata -> username;
  $password = md5($editdata -> password);


$firstQ = mysql_query("SELECT idUsuario FROM `usuario` WHERE `usuario` = '$username' AND `clave` = '$password'");

$firstValidation = mysql_fetch_row($firstQ);

$id = $firstValidation[0];

$userinfo = mysql_query("SELECT CONCAT(c.nombres, ' ', c.apellidos) as nombre, c.rutaFoto as foto, c.descripcion
                        FROM usuario u, personal c
                        WHERE u.idPersonal = c.idPersonal and u.idUsuario = '$id'");
$userpreview = mysql_fetch_row($userinfo);
echo json_encode(
  array(
    'id' =>  $id,
    'nombre' => $userpreview[0],
    'foto' => $userpreview[1],
    'bio' => $userpreview[2]
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
