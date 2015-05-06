/**
 * Created by WONG on 6/5/2015.
 */

function enable(){
    localStorage.setItem("stereo", true);
    $("#stereo_btn").removeClass("alt");
    $("#stereo_btn").text("Disable Stereo");
}

function disable(){
    localStorage.setItem("stereo", false);
    $("#stereo_btn").addClass("alt");
    $("#stereo_btn").text("Enable Stereo");
}


function stereo(){

    var check = localStorage.getItem("stereo");
    if(check){

        //console.log(check);
        if(check == "true"){

            console.log("true");
            disable();

        }else{

            console.log("false");
            enable();
        }

    }else{

        console.log("not set");
        enable();

    }


}


$( document ).ready(function() {

    var check = localStorage.getItem("stereo");
    if(check){

        console.log("init set");

    }else{

        console.log("init not set");
        check = "true";

    }

    if(check == "true"){
        enable();
    }else{
        disable();
    }


});

