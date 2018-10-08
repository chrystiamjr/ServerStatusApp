<?php
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:
    {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
  }
  
  include "con.php";
  header('Content-Type: text/plain; charset: UTF-8');

  if(isset($_POST['username']) && isset($_POST['password'])){
    $sql = "INSERT INTO usuario (username, senha) VALUES ('".$_POST['username']."', '".$_POST['password']."')";
    
    $resp = $con->exec($sql);
    if($resp){ $resposta = "Salvo"; }
    else { $resposta = "ERROERROERRO"; }
    
    echo $resposta;
  }