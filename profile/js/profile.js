
    if(sessionStorage.getItem("user") == null)
    {
        window.location.replace("../index.html")
    }


    else
    {
        //log-out coding
       let logout = document.getElementById("logout");
       logout.onclick = function()
       {
        sessionStorage.clear();
        let logout_text = document.getElementById("logout_text");
        logout_text.innerHTML = "Please Wait...";
        setTimeout(function(){window.location = "../index.html"},2000);
        
       }


        /* profile name coding */
       let user_email = sessionStorage.getItem("user");
       let text_data = localStorage.getItem(user_email);
       let obj_data = JSON.parse(text_data);
       let user_name = document.getElementById("user_name");
       user_name.innerHTML = atob(obj_data.username);

       // profile page name coding
       let profile_username = document.getElementById("profile_username");
       profile_username.innerHTML = atob(obj_data.username);

       // profile page pic coding
       let image_url = localStorage.getItem(user_email+"image");
       let profile_picture = document.getElementById("profile_picture");
       profile_picture.style.backgroundImage = "url("+image_url+")";
       profile_picture.style.backgroundSize = "cover";
       profile_picture.style.backgroundPosition = "center";

       




       if(localStorage.getItem(user_email+"image") != null)
       {
            let page_cover = document.getElementById("container");
            page_cover.style.display = "none";
       }

       

       /* profile pic coding */

       let upload_pic = document.getElementById("upload_pic");
       upload_pic.onchange = function()
       {
        let reader = new FileReader();
        reader.readAsDataURL(upload_pic.files[0]);
        reader.onload = function()
        {
            let filename = reader.result;
            let profile_pic = document.getElementById("profile_pic");
            let upload_icon = document.getElementById("upload_icon");
            let next_btn = document.getElementById("next");
            
            profile_pic.style.backgroundImage = "URL("+filename+")";
            profile_pic.style.backgroundSize = "cover";
            profile_pic.style.backgroundPosition = "center";
            upload_icon.style.display = "none";
            next_btn.style.display = "block";

              /* next btn coding */

            next_btn.onclick = function()
            {
                localStorage.setItem(user_email+"image",filename);
                let page_cover = document.getElementById("container");
                page_cover.style.display = "none";
                window.location = location.href;

            
            }
        }

       }

    }