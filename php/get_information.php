<?php

include '../db.php';

$id = (int)$_POST['id'];
$rows = array();


$result = mysql_query("SELECT * from users_information WHERE id_city = '$id'", $db);

while ($$result = mysql_fetch_assoc($result)) {
    $rows[] = $$result;
}

echo json_encode($rows);
?>