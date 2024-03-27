<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        require_once 'pizzak/getpizza.php';
        break;
    case 'POST':
        require_once 'pizzak/postpizza.php';
        break;
    case 'DELETE':
        require_once 'pizzak/deletepizza.php';
        break;
    case 'PUT':
        require_once 'pizzak/putpizza.php';
        break;
    default:
        break;
}