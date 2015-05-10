<?php

    $db = new SQLite3('scores.sqlite');
    $db->exec('DROP TABLE scores');
    $db->exec('CREATE TABLE scores (player TEXT, score INT, finish_date DATETIME);');

?>


