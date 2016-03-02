<?php
function sondeop(){
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
	return $sondeo;
}
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
function clientePopular(){
	$clienteinfo = mysql_query("SELECT a.nombre, (SELECT count(b.idBanner) from vistabanner b, banner c where b.idBanner = c.idBanner and c.idCliente = a.idCliente) as total, a.ingreso, a.rutaFoto
	                          FROM cliente a
	                          order by 2 desc
	                          limit 1");
	$clientepreview = mysql_fetch_row($clienteinfo);
	$cliente = array('nombre' => $clientepreview[0], 'total' => $clientepreview[1], 'fecha' => $clientepreview[2], 'foto' => $clientepreview[3]);
	return $cliente;
}

function caricaturap(){
	$carinfo = mysql_query("SELECT a.idCaricatura, a.rutaFoto as foto, a.fecha, CONCAT(c.nombres, ' ', c.apellidos) as caricaturista
							from caricatura a, caricaturista c
							where a.idCaricaturista = c.idCaricaturista
							ORDER BY a.fecha desc, a.hora desc");
	while($carpreview = mysql_fetch_array($carinfo)){
		$caricatura[] = array(
					'foto' => $carpreview['foto'],
					'idCaricatura' => $carpreview['idCaricatura'],
					'caricaturista' => $carpreview['caricaturista'],
					'fecha' => $carpreview['fecha'],);
	}
	return $caricatura;
}
function fotogaleriap(){
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
	return $fotogalerias;
}

function bolsasp(){
	$bolsainfo = mysql_query("SELECT idBolsa, nombre, porcentaje, valor, fecha from bolsa");
	while($bolsapreview = mysql_fetch_array($bolsainfo)){
	  $bolsas[] = array(
	    'id' => $bolsapreview['idBolsa'],
	    'nombre' => $bolsapreview['nombre'],
	    'porcentaje' => $bolsapreview['porcentaje'],
	    'valor' => $bolsapreview['valor'],
	    'fecha' => $bolsapreview['fecha']
	  );
	}
	return $bolsas;
}
function mercadosp(){
	// MERCADOS DEL MUNDO
	$mercadoinfo = mysql_query("SELECT idMercado, nombre, descripcion, cambio, porcentaje, menor, masAlto, ultimo from mercado");
	while($mercadopreview = mysql_fetch_array($mercadoinfo)){
	  $mercados[] = array(
	    'id' => $mercadopreview['idMercado'],
	    'nombre' => $mercadopreview['nombre'],
	    'descripcion' => $mercadopreview['descripcion'],
	    'menor' => $mercadopreview['menor'],
	    'masAlto' => $mercadopreview['masAlto'],
	    'ultimo' => $mercadopreview['ultimo'],
	    'porcentaje' => $mercadopreview['porcentaje'],
	    'cambio' => $mercadopreview['cambio']
	  );
	}
	return $mercados;
	// MERCADOS DEL MUNDO
}
?>
