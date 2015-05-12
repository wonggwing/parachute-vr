<?php

    $db = new SQLite3('time_attack.sqlite');
    $db->exec('DROP TABLE IF EXISTS time_attack;');
    $db->exec('CREATE TABLE time_attack (player TEXT, time_attack TEXT, finish_date DATETIME);');

?>


