<?php
$sql = '';
if (count($kereSzoveg) > 1) {
    if (is_int(intval($kereSzoveg[1]))) {
        $sql = 'SELECT * FROM pizza WHERE pazon=' . $kereSzoveg[1];
    } else {
        http_response_code(404);
        echo 'Nem létező ügyfél';
    }
} else {
    $sql = 'SELECT * FROM pizza WHERE 1';
}
require_once './databaseconnect.php';
$result = $connection->query($sql);
if ($result->num_rows > 0) {
    $pizzak = array();
    while ($row = $result->fetch_assoc()) {
        $pizzak[] = $row;
    }
    http_response_code(200);
    echo json_encode($pizzak);
} else {
    http_response_code(404);
    echo 'Nincs egy ügyfél sem';
}