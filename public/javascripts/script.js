
const pwShowHide= document.querySelectorAll(".eye-icon");
pwShowHide.forEach(icon =>{
        icon.addEventListener("click",() =>
        {
            let pwFields = icon.parentElement.parentElement.querySelectorAll(".password");
            pwFields.forEach(password => {
                if(password.type === "password")
                {
                    password.type = "text";
                    icon.classList.replace("bxs-hide", "bxs-show");
                    return;
                }
                password.type = "password";
                icon.classList.replace("bxs-show", "bxs-hide");
            })
 
        })
    })
