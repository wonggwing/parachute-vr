/**
 * Created by WONG on 6/5/2015.
 */

if (localStorage.getItem("stereo") == null) {
	localStorage.setItem("stereo", false);
}

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


function save_info(){

    var nickname = $("#nickname").val();
    var server = $("#server").val();

    localStorage.setItem("nickname", nickname);
    localStorage.setItem("server", server);
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

    var nickname = localStorage.getItem("nickname");
    var server = localStorage.getItem("server");

    if(!nickname){
        nickname = "";
        server = "panel.louislam.net:8324";
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("server", server);
    }

    $("#nickname").val(nickname);
    $("#server").val(server);

});



