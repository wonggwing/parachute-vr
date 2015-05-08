<?php include('header.php') ?>

<style>
    #big_word{
        position: absolute;
        top: 200px;
        text-align: center;
        font-size: 100px;
        display: none;
        color: red;
    }
</style>

<h1 id="big_word">I'm on fire</h1>
<a href="javascript: showWord('Mission Failed')">OPEN</a>

<script>

    // Link to open the dialog
    function showWord(msg){

        $("#big_word").text(msg);

        $("#big_word").show("fast", function(){

            setTimeout(function(){
                $("#big_word").hide("slow");
            }, 10000);
        });
    }

</script>

<?php include('footer.php') ?>
