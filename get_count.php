<?

$db = new SQLite3('scores.sqlite');

$count_results = $db->query('SELECT count(*) as num FROM scores');

$count_row = $count_results->fetchArray();

?>
<?= $count_row['num'];?>