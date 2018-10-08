<?php
  try {
    $con = new PDO("mysql:dbname=u130241570_srvst;host=mysql.hostinger.com.br", "u130241570_srvst", "u130241570_password");
  }
  catch( PDOException $e){
    echo $e->getMessage();
  }