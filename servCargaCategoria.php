<?php


//conexion con la base de datos y comprobamos que haya conexion
$conec = mysqli_connect("127.0.0.1", "manuel", "manuel", "tiendamms");


// tengo que saber que es lo que recibe
$cod = $_POST["1"];


// sentencia sql
$sentencia="select cod_producto, nombre, foto".
            "   from mms_productos".
            "   where cod_categoria = $cod";

// realizo la consulta y compruebo que vaya todo bien
$consulta = $conec->query($sentencia);

// guardo los datos
while ($filas = mysqli_fetch_assoc($consulta)) {

    //array para guardar datos
    $cate[] = $filas;

}

// resultado en json
$resultado = json_encode($cate, JSON_PRETTY_PRINT);
        
//devolver resultado
echo $resultado;
return $resultado;


?>