<?php
include('connection.php');

date_default_timezone_set('America/El_Salvador');

$userId = $_GET['userId'];

$userInfo = mysql_query("SELECT * FROM `usuarios` where userId = '$userId'");


while($usercol = mysql_fetch_array($userInfo)){
    $user = array(
        'id' => $usercol['userId'],
        'username' => $username = $usercol['username'],
        'name' => $name = $usercol['nombre'],
        );
        $range = $usercol['rango'];
}

$cDate = date('Y-m-d');

if($range == '15'){
    if($cDate == date('Y-m-01')){
            "14";
            }elseif($cDate == date('Y-m-02')){
                $nRange = "13";
            }elseif($cDate == date('Y-m-03')){
                $nRange = "12";
            }elseif($cDate == date('Y-m-04')){
                $nRange = "11";
            }elseif($cDate == date('Y-m-05')){
                $nRange = "10";
            }elseif($cDate == date('Y-m-06')){
                $nRange = "08";
            }elseif($cDate == date('Y-m-07')){
                $nRange = "08";
            }elseif($cDate == date('Y-m-08')){
                $nRange = "07";
            }elseif($cDate == date('Y-m-09')){
                $nRange = "06";
            }elseif($cDate == date('Y-m-10')){
                $nRange = "05";
            }elseif($cDate == date('Y-m-11')){
                $nRange = "04";
            }elseif($cDate == date('Y-m-12')){
                $nRange = "03";
            }elseif($cDate == date('Y-m-14')){
                $nRange = "02";
            }elseif($cDate == date('Y-m-15')){
                $nRange = "01";
            }elseif($cDate == date('Y-m-16')){
                $nRange = "15";
            }elseif($cDate == date('Y-m-17')){
                $nRange = "14";
            }elseif($cDate == date('Y-m-18')){
                $nRange = "13";
            }elseif($cDate == date('Y-m-19')){
                $nRange = "12";
            }elseif($cDate == date('Y-m-20')){
                $nRange = "11";
            }elseif($cDate == date('Y-m-21')){
                $nRange = "10";
            }elseif($cDate == date('Y-m-22')){
                $nRange = "09";
            }elseif($cDate == date('Y-m-23')){
                $nRange = "08";
            }elseif($cDate == date('Y-m-24')){
                $nRange = "07";
            }elseif($cDate == date('Y-m-25')){
                $nRange = "06";
            }elseif($cDate == date('Y-m-26')){
                $nRange = "05";
            }elseif($cDate == date('Y-m-27')){
                $nRange = "04";
            }elseif($cDate == date('Y-m-28')){
                $nRange = "03";
            }elseif($cDate == date('Y-m-29')){
                $nRange = "02";
            }elseif($cDate == date('Y-m-30')){
                $nRange = "01";
            }
}

if($range == '30'){
    if($cDate == date('Y-m-01')){
            "30";
            }elseif($cDate == date('Y-m-02')){
                $nRange = "29";
            }elseif($cDate == date('Y-m-03')){
                $nRange = "28";
            }elseif($cDate == date('Y-m-04')){
                $nRange = "27";
            }elseif($cDate == date('Y-m-05')){
                $nRange = "26";
            }elseif($cDate == date('Y-m-06')){
                $nRange = "25";
            }elseif($cDate == date('Y-m-07')){
                $nRange = "24";
            }elseif($cDate == date('Y-m-08')){
                $nRange = "23";
            }elseif($cDate == date('Y-m-09')){
                $nRange = "22";
            }elseif($cDate == date('Y-m-10')){
                $nRange = "21";
            }elseif($cDate == date('Y-m-11')){
                $nRange = "20";
            }elseif($cDate == date('Y-m-12')){
                $nRange = "19";
            }elseif($cDate == date('Y-m-14')){
                $nRange = "18";
            }elseif($cDate == date('Y-m-15')){
                $nRange = "17";
            }elseif($cDate == date('Y-m-16')){
                $nRange = "16";
            }elseif($cDate == date('Y-m-17')){
                $nRange = "15";
            }elseif($cDate == date('Y-m-18')){
                $nRange = "14";
            }elseif($cDate == date('Y-m-19')){
                $nRange = "13";
            }elseif($cDate == date('Y-m-20')){
                $nRange = "12";
            }elseif($cDate == date('Y-m-21')){
                $nRange = "11";
            }elseif($cDate == date('Y-m-22')){
                $nRange = "10";
            }elseif($cDate == date('Y-m-23')){
                $nRange = "9";
            }elseif($cDate == date('Y-m-24')){
                $nRange = "8";
            }elseif($cDate == date('Y-m-25')){
                $nRange = "7";
            }elseif($cDate == date('Y-m-26')){
                $nRange = "6";
            }elseif($cDate == date('Y-m-27')){
                $nRange = "5";
            }elseif($cDate == date('Y-m-28')){
                $nRange = "4";
            }elseif($cDate == date('Y-m-29')){
                $nRange = "3";
            }elseif($cDate == date('Y-m-30')){
                $nRange = "2";
            }
}

$select = mysql_query("SELECT * FROM `datos` where userId = '$userId' ORDER BY `fecha` DESC ");

while($col = mysql_fetch_array($select)){
    $data[] = array(
        'id' => $id = $col['id'],
        'date' => $date = $col['fecha'],
        'time' => $time = $col['hora'],
        'amount' => $amount = $col['costo'],
        'description' => $description = $col['descripcion'],
        'category' => $category = $col['categoria'],
        );
    
}

define('suma','suma');
define('gasto','gasto');
define('ahorros','ahorros');

$q1 = mysql_query("SELECT SUM(costo) as suma FROM datos where categoria = 'ingresos' and userId = '$userId'");

$fila = mysql_fetch_array($q1);

$disponible = $fila[suma];

$q2 = mysql_query("SELECT SUM(costo) as gasto FROM datos where categoria = 'gastos' and userId = '$userId'");

$fila1 = mysql_fetch_array($q2);

$gastos = $fila1[gasto];

$q3 = mysql_query("SELECT SUM(costo) as ahorros FROM datos where categoria = 'ahorros' and userId = '$userId'");

$fila2 = mysql_fetch_array($q3);

$ahorros = $fila2[ahorros];

$user['day'] = $nRange;

$summary = array('disponible' => $disponible, 'ahorros' => $ahorros,'gastos' => $gastos);

echo json_encode(array('user' => $user, 'summary' => $summary, 'data' => $data));
    
?>