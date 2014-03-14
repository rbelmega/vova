<?php
include "db.php";

$id = (int)$_POST['id'];
$type = $_POST['type'];

if ($type == 'city') {
    $result = mysql_query("SELECT *
                                    FROM _cities
                                    WHERE region_id = '$id'
                                    ORDER BY title_ua", $db);
    $cities = mysql_fetch_array($result);
    if (!empty($cities)) {
        echo "out.options[out.options.length] = new Option('choose the city...','none');\n";
        do {
            echo "out.options[out.options.length] = new Option('" . $cities['title_ua'] . "','" . $cities['city_id'] . "');\n";
        } while ($cities = mysql_fetch_array($result));
    } else {
        echo "out.options[out.options.length] = new Option('there is no cities','none');\n";
    }
}
if ($type == 'region') {
    $result = mysql_query("SELECT *
                                      FROM _regions
                                      WHERE country_id = '$id'
                                      ORDER BY title_ua", $db);
    $regions = mysql_fetch_array($result);
    if (!empty($regions)) {
        echo "out.options[out.options.length] = new Option('choose the region...','none');\n";
        do {

            echo "out.options[out.options.length] = new Option('" . $regions['title_ua'] . "','" . $regions['region_id'] . "');\n";

        } while ($regions = mysql_fetch_array($result));

    } else {
        echo "out.options[out.options.length] = new Option('there is no regions','none');\n";
    }
}
?>