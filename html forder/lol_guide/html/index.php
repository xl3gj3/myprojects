<?php

include '../../../global_includes/lol_guide/riot_api.inc';
include '../../../global_includes/lol_guide/config.inc';
include '../../../global_includes/lol_guide/import.inc';

include INCLUDE_PATH . '/JerryDatabase.class.inc';

echo("<pre>");
$api_key = "RGAPI-ece97316-b526-42d0-9451-0477d7b5b000";
$riotInterface = new riot_api_interface($api_key);
$json_to_db = new import_data_from_json();
// $riotInterface->update_data_from_riot();
// $json_to_db->import_champion_data();
// $json_to_db->import_item_data();
// $json_to_db->import_spell_data();
// $spell_response = json_decode(file_get_contents("../spells.json"),true);
// var_dump($spell_response["data"]);






/************remove the comments when it needs to be call*************/


/******************************************************/
/*
$items_response = file_get_contents("item.json");
$items_response = json_decode($items_response,true);
*/


/*

$database->query('INSERT INTO champions (champion_name, data) VALUES (:champion_name, :data)');
$database->bind(':champion_name', $name)->bind(':data',$data);
$database->execute();
*/
//var_dump($champion_response["data"]);
//var_dump($champion_spell_decode);
//var_dump($items_response);
echo("</pre>");
?>
<html>
  <head>
    <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous">
    </script>
    <script src="../js/myapp_ajax.js"></script>
    <script src="../js/myapp_main.js"></script>
    <link href="../css/style.css" rel="stylesheet">
  </head>
  <body>
    <!-- <div class = "container">
      <button id = "create" disabled>Create</button>
      <button id = "view">View all build</button>
      <button id = "log_in">Log in</button>
      <input id = "user_name" type="text">
      <select id = "champions"></select>
      <input id = "build_name" type="text">
      <button id = "go_to_writing_page">GO</button>
    </div>
    <div id = "writing_field">
      <select id = "spells_1">
      </select>
      <select id = "spells_2">
      </select>
      <button id = "save">save</button>
    </div>
    <div id = "display_build_field">
    </div> -->
    <div id = "lol_app"></div>
  </body>
</html>

<script>
  $(document).ready(function(){
    myApp.load(
      {
        id : "lol_app",
        ajax_url : "../ajax/data.php"
      }
    );
  });
</script>