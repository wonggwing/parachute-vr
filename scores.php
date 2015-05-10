<? include('header.php') ?>

<h2><i class="icon small rounded color6 fa-trophy"></i>Score Board</h2>
<table>
    <?php

    $db = new SQLite3('scores.sqlite');

    $results = $db->query('SELECT * FROM scores order by score desc');

    $count_results = $db->query('SELECT count(*) as num FROM scores');

    $count_row = $count_results->fetchArray();

    $num_row = $count_row['num'];

    while ($row = $results->fetchArray()) { ?>

        <tr>
            <td><?= $row['player']?></td>
            <td><?= $row['score']?></td>
            <td><?=  $row['finish_date']?></td>
        </tr>

    <? } ?>

</table>
<script>

    var num_row = <?= $num_row?>;

    setInterval(function(){
        $.ajax({ url: "get_count.php", success: function(data){
            //Update your dashboard gauge
            console.log(data);

            var new_num_row = parseInt(data);

            if(new_num_row > num_row){
                window.location.href = "scores.php";
            }


        }, dataType: "html"});
    }, 3000);


</script>




<? include('footer.php') ?>