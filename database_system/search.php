<!--
  Please don't mind that I am using PHP, should work the same hopefully.
-->
<html>
<head>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
  <script>
  $(function() {
    var availableTags = [
    <?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('terra_quest');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
   }

   $sql =<<<EOF
      SELECT * from Quests;
EOF;

   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "'". $row['quest_id'] . "',";
   }
   $db->close();
?>
];
    $( "#quests" ).autocomplete({
      source: availableTags
    });
  });
  </script>
</head>
</body>
<div class="ui-widget">
  <label for="quests">Tags: </label>
  <input id="quests">
</div>
</body>
</html>
