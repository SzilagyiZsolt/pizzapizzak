<?php
$putdata = fopen('php://input', "r");
$raw_data= "";
while($chunk = fread($putdata, 1024)){
    $raw_data.= $chunk;
}
fclose($putdata);
$adatJson = json_decode($raw_data);
$pazon=$adatJson->pazon;
$pnev=$adatJson->pnev;
$par =$adatJson->par;
require_once './databaseconnect.php';
$sql = "UPDATE pizza SET pnev=?, par=? WHERE pazon=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sii", $pnev, $par, $pazon);  
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen módosítva';
} else {
    http_response_code(404);
    echo 'Nem sikerült módosítani';
}