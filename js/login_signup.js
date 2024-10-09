/* Sign up coding START */

let signup_form = document.getElementById("signup_frm");
signup_form.onsubmit = function()
{


    let user = btoa(document.getElementById("username").value);
    let signup_email_value = btoa(document.getElementById("email").value);
    let phone = btoa(document.getElementById("phone").value);
    let pass = btoa(document.getElementById("password").value);

    let user_obj_data = {username:user,email:signup_email_value,phone:phone,password:pass};
    let user_text_data = JSON.stringify(user_obj_data);

    if(user != "" && signup_email_value != "" && phone != "" && pass != "")
    {
        localStorage.setItem(signup_email_value,user_text_data);

        let signup_button = document.getElementById("signup_btn");
        signup_button.style.background = "#14b129";
        signup_button.innerHTML = "Signup successful!";

        setTimeout(function(){
            signup_button.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
            signup_button.innerHTML = "Sign up";
            signup_form.reset();
        },3000);

        return false;
     }
}

/* Sign up coding END */



/* Sign up Email Validation START */

let signup_email_input = document.getElementById("email");
signup_email_input.onchange = function()
{
    let signup_email_value = document.getElementById("email").value;
    if(localStorage.getItem(btoa(signup_email_value))!= null)
    {
        let signup_email_notice = document.getElementById("email_notice");
        let signup_button = document.getElementById("signup_btn");
        signup_email_notice.style.display = "block";
        signup_email_input.style.borderBottomColor = "red";
        signup_button.style.background = "#ccc";
        signup_button.disabled = true;

        signup_email_input.onclick = function()
        {
            signup_email_notice.style.display = "none";
            signup_email_input.style.borderBottomColor = "#ccc";
            signup_button.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
            signup_button.disabled = false;
            signup_email_input.value = "";
        }

    }
}

/* Sign up Email Validation END */



/* Login coding START */

let login_form = document.getElementById("login_frm");
login_form.onsubmit = function()
{
    let login_email_value = document.getElementById("login_email").value;
    let login_password_value = document.getElementById("login_password").value;
    let login_password_input = document.getElementById("login_password");

    if(localStorage.getItem(btoa(login_email_value)) == null)
    {
        let login_email_warning = document.getElementById("login_email_warning");
        let login_email_input = document.getElementById("login_email");
        login_email_warning.style.display = "block";
        login_email_input.style.borderBottomcolor = "red";

        login_email_input.onclick = function()
        {
            login_email_input.value = "";
            login_email_warning.style.display = "none";
            login_email_input.style.borderBottomcolor = "#ccc";
        }
    }
    else
    {
        let login_email_input = document.getElementById("login_email");
        let text_data = localStorage.getItem(btoa(login_email_input.value));
        let obj_data = JSON.parse(text_data);
        let correct_email = obj_data.email;
        let correct_password = obj_data.password;

        if(btoa(login_email_input.value) == correct_email)
        {
            if(btoa(login_password_input.value) == correct_password)
            {
                sessionStorage.setItem("user",btoa(login_email_input.value));
                window.location.replace("profile/profile.html");
            }
            else
            {
                let login_password_warning = document.getElementById("login_password_warning");
                let login_password_input = document.getElementById("login_password");
                login_password_warning.style.display = "block";
                login_password_input.style.borderBottomcolor = "red";
                
                login_password_input.onclick = function()
                {
                    login_password_warning.style.display = "none";
                    login_password_input.style.borderBottomcolor = "#ccc";
                    login_password_input.value = "";
                }
            }
        }
        
    }
    return false;
}

/* Login coding END */