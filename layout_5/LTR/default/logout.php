<?php
   session_start();
   unset($_SESSION["username"]);
   session_destroy();
   
   echo 'You have cleaned session';
   header('Refresh: 1; URL = AAAlogin.html');
?>