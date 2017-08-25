 <?php
    header("Content-type: application/json"); 
$str_json = file_get_contents('php://input'); //($_POST doesn't work here)
$response = json_decode($str_json, true); // decoding received JSON to array


                                  error_reporting(E_ERROR | E_PARSE);
                                   if (session_status() == PHP_SESSION_NONE) {
                                    session_start();
                                      }
                                   
                                   $username=$_SESSION['user_connected']; 
                                   echo json_encode($username);
                                    
 ?>