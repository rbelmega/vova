<?php

include '../db.php';

$id = (int)$_POST['id'];
$text = mysql_real_escape_string($_POST['information']);

$result = mysql_query("INSERT INTO users_information (id_city, information) VALUES ('$id', '$text')", $db);

if($result) {
    echo 'inserted';
}
?>