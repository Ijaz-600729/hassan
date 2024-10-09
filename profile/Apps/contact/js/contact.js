
if (sessionStorage.getItem("user") == null) 
{
    window.location.replace("../../../index.html");
}


else {

    let current_user = sessionStorage.getItem("user");

    // profile pic coding

    function picture()
    {
        let url = localStorage.getItem(current_user+"image");
        let profile_pic = document.getElementById("profile_pic");
        profile_pic.style.backgroundImage = "url("+url+")";
        profile_pic.style.backgroundSize = "cover";
        profile_pic.style.backgroundPosition = "center";
    }
    picture();

    
    // click on plus icon and open add new contact Box coding
    let new_contact_icon = document.getElementById("new_contact_icon");
    new_contact_icon.onclick = function () {
        let contact_bg = document.getElementById("contact_bg");
        contact_bg.style.display = "block";
    }

    // add new contact Box close coding

    let close_button = document.getElementById("close_btn");
    close_button.onclick = function ()
     {
        let contact_bg = document.getElementById("contact_bg");
        contact_bg.style.display = "none";
     }

     // add new contact coding

     let add_button = document.getElementById("add_btn");
     add_button.onclick = function()
     {
        let c_name = document.getElementById("c_name");
        let c_number = document.getElementById("c_number");

        if(c_name.value != "" && c_number.value != "")
        {
            let new_contact = {name:c_name.value,number:c_number.value};
            let json_text = JSON.stringify(new_contact);
            localStorage.setItem(current_user+"_contact"+c_name.value,json_text);

        }
        else
        {
            alert("Please enter contact name and number");
            return false;

        }
    }

    function all_contacts()
    {
        let i;
        for(i=0;i<localStorage.length;i++)
        {
            let all_keys = localStorage.key(i);

            if(all_keys.match(sessionStorage.getItem("user")+"_contact"))
            {
                let json_txt = localStorage.getItem(all_keys);
                let obj = JSON.parse(json_txt);


                let contact_box = document.createElement("DIV");
                contact_box.setAttribute("id","contact");

                let name_p = document.createElement("P");
                name_p.setAttribute("class","contact_name");

                let name_i = document.createElement("I");
                name_i.setAttribute("class","fas fa-user");

                let tool = document.createElement("DIV");
                tool.setAttribute("id","tool");

                let edit_i = document.createElement("I");
                edit_i.setAttribute("class","fas fa-edit edit");

                let del_i = document.createElement("I");
                del_i.setAttribute("class","fas fa-trash del");

                let line = document.createElement("HR");
                line.setAttribute("color","purple")
                line.setAttribute("width","75%")
                line.setAttribute("size","1")

                let num_p = document.createElement("P");
                let num_i = document.createElement("I");
                num_i.setAttribute("class","fas fa-mobile-alt");
                
                name_p.appendChild(name_i);
                name_p.innerHTML += " "+obj.name;

                tool.appendChild(edit_i);
                tool.appendChild(del_i);

                num_p.appendChild(num_i);
                num_p.innerHTML += " "+obj.number;

                contact_box.appendChild(name_p);
                contact_box.appendChild(tool);
                contact_box.appendChild(line);
                contact_box.appendChild(num_p);

                let all_contact_box = document.getElementById("all_contact_box");
                all_contact_box.appendChild(contact_box);
            }
        }

    }

    all_contacts();


    // Search contact coding

    let search = document.getElementById("search_input");
    search.oninput = function()
    {
        let all_contact_name = document.getElementsByClassName("contact_name");
        let i;
        for(i=0;i<all_contact_name.length;i++)
        {
            if(all_contact_name[i].innerHTML.match(search.value))
            {
                all_contact_name[i].parentElement.style.display = "block";
            }
            else
            {
                all_contact_name[i].parentElement.style.display = "none";
            }
        }
    }

    // Delete contact coding

    function del()
    {
        let del = document.getElementsByClassName("del");
        let i;
        for(i=0;i<del.length;i++)
        {
            del[i].onclick = function()
         {
            let parent = this.parentElement.parentElement;
            let p_element = parent.getElementsByClassName("contact_name")[0];
            let username = p_element.innerHTML.replace('<i class="fas fa-user"></i>','');
            localStorage.removeItem(current_user+"_contact"+username.trim());
           
            setTimeout(function(){
                parent.remove();
            },1000);

         }
        }

    }
    del();

    // Edit contact coding


    function edit()
    {
        let edit_icon = document.getElementsByClassName("edit");
        let i;
        for(i=0;i<edit_icon.length;i++)
        {
            edit_icon[i].onclick = function()
            {
                let parent = this.parentElement.parentElement;
                let para = parent.getElementsByTagName("P");
                let name = para[0].innerHTML.replace('<i class="fas fa-user"></i>','').trim();
                let number = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>','').trim();

                let c_name = document.getElementById("c_name");
                let c_number = document.getElementById("c_number");
                let add_btn = document.getElementById("add_btn");
                let c_heading = document.getElementById("c_heading");
                let new_contact_icon = document.getElementById("new_contact_icon");
                let close_btn = document.getElementById("close_btn");

                c_name.value = name;
                c_number.value = number;
                c_heading.innerHTML = "Edit Contact";
                add_btn.innerHTML = "Update";
                new_contact_icon.click();
                close_btn.style.display = "none";

                localStorage.removeItem(current_user+"_contact"+name);
            }
        }
    }
    edit();
         
}




