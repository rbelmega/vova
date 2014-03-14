<?
$db = mysql_connect("localhost", "izzo", "e3w000ja");
mysql_select_db("test", $db);

mysql_query('set charset utf8', $db);
mysql_query('SET names utf8', $db);
mysql_query('set character_set_client="utf8"', $db);
mysql_query('set character_set_connection="utf8"', $db);
mysql_query('set character_set_result="utf8"', $db);

?>