/**
 * Created by WONG on 8/5/2015.
 */

function showWord(msg){

    $("#big_word").text(msg);

    $("#big_word").show("fast", function(){

        setTimeout(function(){
            $("#big_word").hide("slow");
        }, 10000);
    });
}
