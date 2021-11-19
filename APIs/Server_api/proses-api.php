<?php

//   header('Access-Control-Allow-Origin: *');
//   header("Access-Control-Allow-Credentials: true");
//   header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//   header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
//   header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  include "config/config.php";
  
  $postjson = json_decode(file_get_contents('php://input'), true);
  $today    = date('Y-m-d');


  if($postjson['aksi']=='register'){

  	$query = mysqli_query($mysqli, "INSERT INTO users SET
  		username = '$postjson[username]',
  		password = '$postjson[password]',
        status = 'y',
  		created_at	  = '$today' 
  	");

  	if($query) $result = json_encode(array('success'=>true));
  	else $result = json_encode(array('success'=>false, 'msg' => 'error, please try again'));

  	echo $result;

  }

  else if($postjson['aksi']=='login'){
   $query = mysqli_query($mysqli, "SELECT * FROM users 
   WHERE username = '$postjson[username]' 
   AND password = '$postjson[password]' 
   ");

   $check = mysqli_num_rows($query);
   if($check > 0) {
      $data = mysqli_fetch_array($query);
      $datauser = array(
         'id' => $data['id'],
         'username' => $data['username'],
         'password' => $data['password'],
      );

      if($data['status'] == 'y'){
         $result = json_encode(array('success'=>true, 'result'=>$datauser));
      }
      else {
         $result = json_encode(array('success'=>false, 'msg'=>'Account Inactive'));
      }
   }
   else {
      $result = json_encode(array('success'=>false, 'msg'=>'Unregister Account'));
   }

   echo $result;

}
