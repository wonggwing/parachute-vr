<?

$db = new SQLite3('time_attack.sqlite');

$count_results = $db->query('SELECT count(*) as num FROM time_attack');

$count_row = $count_results->fetchArray();

?>
<?= $count_row['num'];?>