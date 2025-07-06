<?php

// proxy.php

$api_url = 'https://favqs.com/api/quotes?page=1';

$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Token token="01231437a59843d411e002369df4465c"'
]);

$response = curl_exec($ch);
curl_close($ch);

// Erlaube Browser von überall Zugriff auf diesen Proxy
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo $response;

