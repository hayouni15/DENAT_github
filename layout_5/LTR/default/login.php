<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/limitless/layout_5/LTR/default/mysql.php');;
ob_start();
session_start();
if( isset($_SESSION['user_connected']) != "" ){
header("Location: /denat.html");
}

 if ( isset($_POST['submit']) ) {
  echo "submitted";
  // clean user inputs to prevent sql injections
  $name = trim($_POST['username']);
  $name = strip_tags($name);
  $name = htmlspecialchars($name);

  $pass = trim($_POST['password']);
  $pass = strip_tags($pass);
  $pass = htmlspecialchars($pass);

 $db = new MySQL();
    $udata = $db->get_results("SELECT * FROM credentials WHERE Username = '$name' AND PW = '$pass'");
    var_dump($udata);
    
    if(count($udata)){
      
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION["user_connected"] = $udata[0]['Username'];
        //$_SESSION["user_name"] = $udata[0]['name'].' '.$udata[0]['subname'];
        $_SESSION["user_pic"] = $udata[0]['Picture'];
       // $_SESSION["email"] = $udata[0]['mail'];
        setcookie("user_pic", $udata[0]['Picture'],time()+31536000,'/');
        unset($_COOKIE['lock']);
        setcookie("lock", 'false',time()+31536000,'/');
        setcookie("user_connected", $udata[0]['Username'],time()+31536000,'/');
        $db->disconnect();
        echo "hhh3";
        header("Location: /limitless/layout_5/LTR/default/denat.html");
    }else {
        $db->disconnect();
        header("Location: /limitless/layout_5/LTR/default/AAAlogin.html");
    }
  
  }

?>