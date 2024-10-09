let signup_box = document.getElementById("signup");
let login_box = document.getElementById("login");
let signup_btn = document.getElementById("signup_link");
let login_btn = document.getElementById("login_link");



signup_btn.onclick= function()
{
    
    signup_box.style.display = "block";
    login_box.style.display = "none";
}


login_btn.onclick = function()
{
    signup_box.style.display = "none";
    login_box.style.display = "block";
}