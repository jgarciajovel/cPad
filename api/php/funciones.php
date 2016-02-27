<?php
function primerSondeo(){
	$soninfo = mysql_query("SELECT idSondeo, pregunta
												FROM sondeo
												ORDER BY fecha desc, hora desc limit 1");
	$sonpreview = mysql_fetch_row($soninfo);
	$sondeo[] = array(
	  'idSondeo' => $sonpreview[0],
	  'pregunta' => $sonpreview[1],
	  'respuestas' => respuestas($sonpreview[0]),
		'total' => maxTotal($sonpreview[0])
	);
	return $sondeo;
}

function dashSondeo(){
	$soninfo = mysql_query("SELECT idSondeo, pregunta
												FROM sondeo
												ORDER BY fecha desc, hora desc limit 1");
	$sonpreview = mysql_fetch_row($soninfo);
	$sondeo[] = array(
	  'idSondeo' => $sonpreview[0],
	  'pregunta' => $sonpreview[1],
	  'respuesta' => respuestaMax($sonpreview[0]),
		'total' => maxTotal($sonpreview[0])
	);
	return $sondeo;
}

function respuestas($id){
	$resinfo = mysql_query("SELECT idRespuesta, idSondeo, respuesta
												FROM respuesta");
	while ($respreview = mysql_fetch_array($resinfo)) {
		if($id == $respreview['idSondeo']){
			$respuestas[] = array(
								'idRespuesta' => $respreview['idRespuesta'],
								'idSondeo' => $respreview['idSondeo'],
								'respuesta' => $respreview['respuesta'],
								'total' => total($respreview['idRespuesta'])
							);
		}
	}
	return $respuestas;
}

function respuestaMax($id){
	$resinfo = mysql_query("SELECT idRespuesta, idSondeo, respuesta
												FROM respuesta where idSondeo = $id");
	while ($respreview = mysql_fetch_array($resinfo)) {
      if(total($respreview['idRespuesta'])>$min){
        $respuesta = array(
				'respuesta' => $respreview['respuesta'],
				'total' => total($respreview['idRespuesta'])
			);
      $min = total($respreview['idRespuesta']);
      }
		}
	return $respuesta;
}
function total($id){
	$resinfo = mysql_query("SELECT count(a.idRespuesta) as total
												FROM resultado a where a.idRespuesta = $id group by a.idRespuesta");
	$res = mysql_fetch_row($resinfo);
	if($res[0]){
		$respuestas = $res[0];
	}else{
		$respuestas = 0;
	}
	return $respuestas;
}
function maxTotal($id){
	$resinfo = mysql_query("SELECT count(a.idRespuesta) as total
												FROM resultado a, respuesta b where a.idRespuesta = b.idRespuesta and b.idSondeo = $id");
	$res = mysql_fetch_row($resinfo);
	$respuestas = $res[0];
	return $respuestas;
}
function formatoFecha($fecha){
	list($diaNombre, $dia, $mes, $anio) = explode(" ",date("l, d m Y", strtotime($fecha)));
	$meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	if($diaNombre == "Sunday,"){
		$nombre = "Domingo,";
	}elseif($diaNombre == "Monday,"){
		$nombre = "Lunes,";
	}elseif($diaNombre == "Tuesday,"){
		$nombre = "Martes,";
	}elseif($diaNombre == "Wednesday,"){
		$nombre = "Lunes,";
	}elseif($diaNombre == "Thursday,"){
		$nombre = "Jueves,";
	}elseif($diaNombre == "Friday,"){
		$nombre = "Lunes,";
	}elseif($diaNombre == "Saturday,"){
		$nombre = "Sabado,";
	}
	return $nombre." ".$dia." de ".$meses[$mes -1]." del ".$anio;
}

function formatoFecha2($fecha){
	list($dia, $mes, $anio) = explode(" ",date("d m Y", strtotime($fecha)));
	$meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	return $dia." de ".$meses[$mes -1]." del ".$anio;
}
?>
