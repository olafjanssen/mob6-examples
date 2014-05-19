<?php
	// database parameters
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'dbase_name');
	define('DB_USER', 'dbase_user');
	define('DB_PASSWORD', 'dbase_password');

	// set proper headers
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');

	// read post/get data
	$postData = $_POST;
	$name = null;

	// name to add
	if ($_POST && $_POST['name']) {
		$name = $_POST['name'];
	} 

	// // connect to the Database
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die("cannot connect to DB");

    // add to the database
    if ($name) {
    	// watch out, this is vulnerable to SQL injection
        mysqli_query($con, "INSERT INTO names (name) VALUES ('$name');") or die("cannot insert record");
    }

    // query the database
    $result = mysqli_query($con, "SELECT * FROM names ORDER BY id DESC");
    if ($result) {
    	$rows = array();
    	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$rows[] = $row['name'];
    	}
		$response['data'] = $rows;
		$response['post'] = $_POST;
		$response['status'] = "ok";
	} else {
		$response['status'] = "error";
		$response['error'] = "cannot fetch data";
	}

	// return response
	print json_encode($response);
?>

