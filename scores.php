
<table>
    <?php

    $db = new SQLite3('scores.sqlite');

    $results = $db->query('SELECT * FROM scores');

    while ($row = $results->fetchArray()) { ?>

        <tr>
            <td><?= $row['player']?></td>
            <td><?= $row['score']?></td>
            <td><?=  $row['finish_date']?></td>
        </tr>

    <? } ?>

</table>