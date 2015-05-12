/**
 * Created by WONG on 10/5/2015.
 */


function playSound(sound_type){

    if(sound_type == "coin"){
        playMp3("music/sound/Harp_run.wav");
    }else if(sound_type == "bg"){
        playMp3("music/bg/stars-and-stripes.mp3");
    }else if(sound_type == "bird"){
        playMp3("music/sound/Comedy_effect_slide_ricochet_2.wav");
    }
}

function playMp3(mp3){

    var audio = new Audio(mp3);
    audio.play();

}
