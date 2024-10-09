//   Play and Pause Button coding
var current_user = sessionStorage.getItem("user");
var video = document.getElementById("video_player");
var play_btn = document.getElementById("play_btn");



play_btn.onclick = function()
{



    if(play_btn.className == "fas fa-play-circle")
    {
        video.play();
        play_btn.className = "fas fa-pause-circle"
    }
    else if(play_btn.className == "fas fa-pause-circle")
    {
        video.pause();
        play_btn.className = "fas fa-play-circle"
    }
}

//   progress bar coding And Time duration coding

  video.ontimeupdate = function()
{
    let total_duration = this.duration;
    let current_duration = this.currentTime;
    let progress_bar = document.getElementById("progress_bar");
    let p_time = document.getElementById("p_time");
    let sec = current_duration - parseInt(current_duration/60)*60;
    let total_sec = total_duration - parseInt(total_duration/60)*60;
    p_time.innerHTML = parseInt(current_duration/60)+":"+parseInt(sec)+"/"+parseInt(total_duration/60)+":"+parseInt(total_sec);
    let slide_per = current_duration*100/total_duration;
    progress_bar.style.width = slide_per+"%";

    if(current_duration == total_duration)
    {
        play_btn.className = "fas fa-play-circle"
    }
    
}

//   Add video box open and close coding

let add_video_btn = document.getElementById("add_video_icon")
add_video_btn.onclick = function()
{
    let add_video_box = document.getElementById("add_video_box");
    if(add_video_btn.className == "fas fa-plus-circle")
    {
        add_video_box.style.display = "block";
        add_video_btn.className = "fas fa-cross";
    }
    else if(add_video_btn.className == "fas fa-cross")
    {
        add_video_box.style.display = "none";
        add_video_btn.className = "fas fa-plus-circle";
    }
}

// Add videos in local storage

let submit_button = document.getElementById("submit_btn");
submit_button.onclick = function()
{
    let video_name = document.getElementById("video_name");
    let video_url = document.getElementById("video_url");

    if(video_name.value != "" && video_url.value != "")
    {
        let video_obj = {name:video_name.value,link:video_url.value};
        let video_text = JSON.stringify(video_obj);
        localStorage.setItem(current_user+"video"+video_name.value,video_text);
    }
}

// fetch all videos from local storage

function load_video()
{
    let i;
    for(i=0;i<localStorage.length;i++)
    {
        let all_keys = localStorage.key(i);
        if(all_keys.match(current_user+"video"))
        {
            let v_data = localStorage.getItem(all_keys);
            let v_obj = JSON.parse(v_data);

            // main video box create in JS

            let div = document.createElement("DIV");
            div.setAttribute("id","main_video_box");

            let p = document.createElement("P");
            p.setAttribute("id","playlist_video_name")
            p.setAttribute("class","playlist_v_n")
            p.innerHTML = v_obj.name;

            let play_btn = document.createElement("BUTTON");
            play_btn.setAttribute("type","button");
            play_btn.setAttribute("id","video_play_btn");
            play_btn.setAttribute("class","v_play_btn");
            play_btn.setAttribute("url",v_obj.link);
            play_btn.innerHTML = "Play";

            let del_btn = document.createElement("BUTTON");
            del_btn.setAttribute("type","button");
            del_btn.setAttribute("id","video_delete_btn");
            del_btn.setAttribute("class","delete_btn")
            del_btn.innerHTML = "Delete";

            div.appendChild(p);
            div.appendChild(play_btn);
            div.appendChild(del_btn);

            let all_videos_box_bottom = document.getElementById("bottom");
            all_videos_box_bottom.appendChild(div);
        }
    }

}
load_video();

// When play button onclick and video play coding
function play_video()
{
    let all_v_play_btn = document.getElementsByClassName("v_play_btn");
    let i;
    for(i=0;i<all_v_play_btn.length;i++)
    {
        all_v_play_btn[i].onclick = function()
        {
            clear(); 
            let v_url = this.getAttribute("url");
            let src_tag = document.getElementById("video_src");
            src_tag.setAttribute("src",v_url);
            video.load();
            video.play();
            play_btn.className = "fas fa-pause-circle";
            this.innerHTML = "Playing..."
        }
    }
   // this function is for (play and playing) in the play button 
}
play_video();

function clear()
{
    let all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_v_play_btn.length;i++)
    {
        all_v_play_btn[i].innerHTML = "play";
    }
}

// when next btn click and next video play  Coding

function next_button()
{
    let next_btn = document.getElementById("right_btn");
    next_btn.onclick = function()
    {
        let all_play_btn = document.getElementsByClassName("v_play_btn");
        let i;
        for(i=0;i<all_play_btn.length;i++)
        {
            if(all_play_btn[i].innerHTML == "Playing...")
            {
                let next_element = all_play_btn[i].parentElement.nextSibling;
                let next_play_btn = next_element.getElementsByClassName("v_play_btn")[0];
                next_play_btn.click();
                return false;
            }
        }
    } 

}
next_button();

// when previous btn click and previous video play  Coding

function previous_button()
{
    let previous_btn = document.getElementById("left_btn");
    previous_btn.onclick = function()
    {
        let all_play_btn = document.getElementsByClassName("v_play_btn");
        let i;
        for(i=0;i<all_play_btn.length;i++)
        {
            if(all_play_btn[i].innerHTML == "Playing...")
            {
                let previous_element = all_play_btn[i].parentElement.previousSibling;
                let previous_play_btn = previous_element.getElementsByClassName("v_play_btn")[0];
                previous_play_btn.click();
                return false;
            }
        }
    } 

}
previous_button();

  // Delete button coding

function Delete_video()
{
    let all_del_btn = document.getElementsByClassName("delete_btn");
    let i;
    for(i=0;i<all_del_btn.length;i++)
    {
        all_del_btn[i].onclick = function()
        {
            let parent = this.parentElement;
            let v_name = parent.getElementsByTagName("P")[0].innerHTML;
            localStorage.removeItem(current_user+"video"+v_name);
            parent.className = "animate__animated__animate__bounceOut";
            setTimeout(function(){
                parent.remove();
            },1000);
        }
    }
}
Delete_video();

         //  Volume  Coding

function volume()
{
let vol_icon = document.getElementById("volume");
vol_icon.onclick = function()
 { 
    let vol_control = document.getElementById("vol_control");
    if(vol_control.style.display == "none")
    {
        vol_control.style.display = "block";

        vol_control.oninput = function()
        {
            video.volume = this.value;
        }
    }
    else
    {
        vol_control.style.display = "none";
    }
 }
}

volume();

// video Farward and Backward ( mahki kol ao rosto kol) coding

let p_box = document.getElementById("progress_box");
p_box.onclick = function(event)
{
    let percent = event.offsetX/this.offsetWidth;
    video.currentTime = percent*video.duration;
}

// Fullscreen coding

let full = document.getElementById("full_screen");
full.onclick = function()
{
    video.requestFullscreen();
}

//  video speed control coding

let speed_icon = document.getElementById("speed_icon");
speed_icon.onclick = function()
{
    let speed_slider = document.getElementById("speed_control");
    if(speed_slider.style.display == "none")
    {
        speed_slider.style.display = "block";
        speed_slider.oninput = function()
        {
            video.playbackRate = this.value;
        }
    }
    else if(speed_slider.style.display == "block")
    {
        speed_slider.style.display = "none";
    }
}

//  search videos coding

let search_box = document.getElementById("search");
search_box.oninput = function()
{
    let all_v_name = document.getElementsByClassName("playlist_v_n");
    let i;
    for(i=0;i<all_v_name.length;i++)
    {
        if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
        {
            all_v_name[i].parentElement.style.display = "block";
        }
        else
        {
            all_v_name[i].parentElement.style.display = "none";
        }
    }

}



