<?php
    // include Game Class functions
    require_once '../includes/Game.php';

    // declare response as an array
    $response = array();
    header('Content-Type: application/json; charset=utf-8');

    // check if request method is POST
    if($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(405);
        echo json_encode(array("message" => "Only POST Method is allowed."));
        return;
    }

    // check if request params is valid
    if(!isset($_POST["number_of_people"]) || //check isset params
        $_POST["number_of_people"] == NULL ||  //check params is not null
        !is_numeric($_POST["number_of_people"]) ||  //check param is numeric
        $_POST["number_of_people"] <= 0 //check param is greater than zero
    ) {
        http_response_code(422);
        echo json_encode(array("message" => "Input value does not exist or value is invalid."));
        return;
    }

    $game_controller = new Game();

    // get the result by calling dealCards function in Game Class
    $result = $game_controller->dealCards($_POST["number_of_people"]);

    http_response_code(200);
    echo json_encode(array("data" => $result));

?>