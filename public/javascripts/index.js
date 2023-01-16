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

const user= document.querySelectorAll(".user-icon");
boxiconAnimation(user,"bx-user-circle","bxs-user-circle")

const sub= document.getElementById("click");
sub.addEventListener("click",()=>{
    const subm= document.querySelectorAll(".submenu");
    subm.forEach(click =>{
        click.classList.toggle("hidden")
    })
})

const API_KEY="api_key=0595eb5831f66cec3590e055439032cd";
const BASE_URL="https://api.themoviedb.org/3"
const IMAGE_URL= "https://image.tmdb.org/t/p/w500"

const main= document.getElementById("main");
const upper= document.getElementById("upper")


const movies= document.getElementById("movies");
movies.addEventListener("click", async ()=>{
    const TVresponse= await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    show(data.results);
})

const tv= document.getElementById("tv");
tv.addEventListener("click", async ()=>{
    const TVresponse= await fetch("https://api.themoviedb.org/3/tv/popular?api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    show(data.results)
})


async function popularMovies(){
    const TVresponse= await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    show(data.results);
}
popularMovies();
//Search results
const searching= document.getElementById("search");
searching.addEventListener("click", async() => {
    const movie= document.getElementById("movie-name").value;
    upper.innerHTML="";

    const upperEl=document.createElement("div");
    upperEl.classList.add("search-results")
    
    upperEl.innerHTML=`
            <h2>Search Results for '${movie}'</h2>
    `
    upper.appendChild(upperEl);
    const API_URL = "https://api.themoviedb.org/3/search/multi?api_key=0595eb5831f66cec3590e055439032cd&language=en-US&query="
    
    const movie_url= API_URL+ movie;
    console.log(movie_url);
    const response= await fetch(movie_url);
    const data= await response.json();
    console.log(data.results);
    show(data.results)
})

function show(data){
    main.innerHTML= "";
    data.forEach(movie =>{
        const {title, poster_path, vote_average, overview}= movie;

        const movieEl= document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML= ` 
                <img src="${IMAGE_URL+poster_path}" alt="${title}">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${VoteColour(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
        `
        
        main.appendChild(movieEl);
    })
}

function VoteColour(vote){
    if(vote>=7.5){
        return "green"
    }
    else if(vote>=5 && vote<7.5){
        return "yellow"
    }
    else if(vote>=2.5 && vote<5){
        return "yellow"
    }
    else if(vote>=0 && vote<2.5){
        return "yellow"
    }


}



