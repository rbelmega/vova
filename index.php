<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2 class="text-center">Database</h2>
        </div>
    </div>
    <form class="form-inline" role="form">
        <fieldset>
            <div class="form-group">

                <select class="form-control" name="countryid" id="country">
                    <option>select country</option>
                    <?
                    include "db.php";
                    $result = mysql_query("SELECT * from _countries ORDER BY title_ua", $db);
                    $myrow = mysql_fetch_array($result);
                    do {
                        printf('
<option value="%s">%s</option>
            ', $myrow['country_id'], $myrow['title_ua']);
                    } while ($myrow = mysql_fetch_array($result));
                    ?>
                </select>
                <select class="form-control" name="regionid" id="region">
                    <option>select region</option>
                </select>
                <select class="form-control" name="city_id" id="city">
                    <option>select city</option>
                </select>
            </div>
        </fieldset>
    </form>

    <form class="col-md-12 hidden" role="form" id="saveForm">
        <div class="form-group">
            <textarea class="form-control" rows="3"></textarea>
            <button class="btn btn-success col-md-12" id="saveRecord">save</button>
        </div>
    </form>


    <div class="col-md-12 hidden" id="wait">
        <p class="text-center">wait...</p>
    </div>
    <div class="col-md-12 hidden" id="showResults">
        <button class="btn btn-info col-md-12" id="addRecord">add new record</button>
        <h3 class="text-center">Results</h3>

        <div class="table-responsive">
        </div>
    </div>
</div>
</div>


<button class="hidden" data-toggle="modal" data-target="#viewRecord" id="viewRecordBtn"> </button>
<!-- Modal -->
<div class="modal fade" id="viewRecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">View Record</h4>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>

</body>
</html>