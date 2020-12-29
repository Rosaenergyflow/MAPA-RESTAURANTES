<?php
/*
Trataremos los datos deacuerdo con la especificación 
*/
include("_db.php");

$sql = "SELECT * FROM restaurante"; 
// restaurante es el nombre de la tabla dentro de la base de datos
$result = $mysqli->query($sql);

$numrows = $result->num_rows;

$datos = array();

$datos = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($datos);

?>
		