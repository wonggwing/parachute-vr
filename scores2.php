<? include('header.php') ?>

<h2><i class="icon small rounded color6 fa-trophy"></i>Score Board</h2>
<table>
    <tr>
        <th>Player</th>
        <th>Millisecond</th>
        <th>Time</th>
    </tr>
    <?php

    $db = new SQLite3('time_attack.sqlite');

    $results = $db->query('SELECT * FROM time_attack order by time_attack asc');

    $count_results = $db->query('SELECT count(*) as num FROM time_attack');

    $count_row = $count_results->fetchArray();

    $num_row = $count_row['num'];

    while ($row = $results->fetchArray()) { ?>

        <tr>
            <td><?= $row['player']?></td>
            <td><?= $row['time_attack']?></td>
            <?php
                $date = new DateTime($row['finish_date']);
                $date->setTimezone(new DateTimeZone('Asia/Hong_Kong'));
            ?>


            <td><?=  $date->format('Y-m-d H:i:s') ?></td>
        </tr>

    <? } ?>

</table>
<script>

    var num_row = <?= $num_row?>;

    setInterval(function(){
        $.ajax({ url: "get_count2.php", success: function(data){
            //Update your dashboard gauge
            console.log(data);

            var new_num_row = parseInt(data);

            if(new_num_row > num_row){
                window.location.href = "scores2.php";
            }


        }, dataType: "html"});
    }, 3000);


</script>




<? include('footer.php') ?>