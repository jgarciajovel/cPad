<?php
include('connection.php');
$editdata = json_decode(file_get_contents("php://input"));
date_default_timezone_set('America/El_Salvador');

$username = $_GET['username'];
$password = md5($_GET['password']);

$firstQ = mysql_query("SELECT * FROM `usuario` WHERE `usuario` = '$username' AND `clave` = '$password'");

$firstValidation = mysql_fetch_row($firstQ);

if($firstValidation[0] != null){

  $id = $firstValidation[0];

  $userinfo = mysql_query("SELECT CONCAT(c.nombres, ' ', c.apellidos) as nombre, c.rutaFoto as foto
                          FROM usuario u, personal c
                          WHERE u.idPersonal = c.idPersonal and u.idUsuario = '$id'");
  $userpreview = mysql_fetch_row($userinfo);
  echo json_encode(
    array(
      'id' =>  $id,
      'nombre' => $userpreview[0],
      'foto' => $userpreview[1]
    )
  );

}
 ?>
