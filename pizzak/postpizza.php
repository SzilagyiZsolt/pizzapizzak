<?php
$pazon =$_POST["pazon"];
$pnev=$_POST["pnev"];	
$par =$_POST["par"];
require_once './databaseconnect.php';
$sql = "INSERT INTO pizza (pazon, pnev, par) VALUES (?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("isi", $pazon,$pnev, $par);  
if ($stmt->execute()) {
    http_response_code(201);
    $message=array("message" =>'Sikeresen hozzáadva');
    return json_encode($message);
} else {
    http_response_code(404);
    $message=array("message" =>'Nem sikerült hozzáadni');
    return json_encode($message);
}