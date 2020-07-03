<?php
header("Access-Control-Allow-Origin: *");
$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

//email information
$emails = ["alexherinm@gmail.com", "malcala@palconsulting.com.mx"];
$subject = "Costos de Productos ";
$message = " En este correo se anexa la tabla de precios calculados para el día de hoy. \r\n ".$data;

foreach ($emails as $to) {
  $headers = 'From: ' . $to . "\r\n";
    //php mail function to send email on your email address
  mail($to, $subject, $message, $headers);
}

//Email response
  echo "Correo enviado";

?>