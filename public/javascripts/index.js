function boxiconAnimation(icon0, icon1, icon2){
    icon0.forEach(icon =>{
        icon.addEventListener("mouseover",() =>
        {
            if(icon.classList.contains(icon1)){
                icon.classList.replace(icon1, icon2);
                return;
            }
            icon.classList.replace(icon2, icon1);
            return;
        })
    
        icon.addEventListener("mouseout",() =>{
            if(icon.classList.contains(icon1)){
                icon.classList.replace(icon1, icon2);
                return;
            }
            icon.classList.replace(icon2, icon1);
            return;
        })
    })
}

const home= document.querySelectorAll(".home-icon");
boxiconAnimation(home, "bx-home-alt-2", "bxs-home-alt-2")

const search= document.querySelectorAll(".search-icon");
boxiconAnimation(search, "bx-search-alt-2", "bxs-search-alt-2")

const heart= document.querySelectorAll(".heart-icon");
boxiconAnimation(heart, "bx-heart", "bxs-heart")

const chat= document.querySelectorAll(".chat-icon");
boxiconAnimation(chat, "bx-message-square-dots", "bxs-message-square-dots")





