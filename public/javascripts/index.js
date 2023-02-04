

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

const searchi= document.querySelectorAll(".search-icon");
boxiconAnimation(searchi, "bx-search-alt-2", "bxs-search-alt-2")

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

const logout= document.getElementById("logout");
logout.addEventListener("click", (req,res)=>{
    res.redirect("/logout");
})

const API_KEY="api_key=0595eb5831f66cec3590e055439032cd";
const BASE_URL="https://api.themoviedb.org/3"
const IMAGE_URL= "https://image.tmdb.org/t/p/w500"

const main= document.getElementById("main");


//FRONT PAGE CONTENT(Popular Movies and TV shows)



const tv= document.getElementById("tv");
tv.addEventListener("click", async ()=>{
    whitebgremover2(tv);
    const TVresponse= await fetch("https://api.themoviedb.org/3/tv/popular?api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    const data1= data.results
    main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
    data1.forEach(movie =>{
        const {name, poster_path, vote_average, overview}= movie;

        const movieEl= document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML= ` 
                <img src="${IMAGE_URL+poster_path}" alt="${name}">

                <div class="movie-info">
                    <h3>${name}</h3>
                    <span class="${VoteColour(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
        `
        
        main.appendChild(movieEl);
    })
})

const movies= document.getElementById("movies");
async function popularMovies(){
    whitebgremover2(movies);
    const TVresponse= await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    const data1= data.results;

    main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
    data1.forEach(movie =>{
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
popularMovies();

movies.addEventListener("click", async ()=>{
    whitebgremover2(movies);
    const TVresponse= await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1");
    const data= await TVresponse.json();
    console.log(data.results);
    const data1= data.results;
    main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
    data1.forEach(movie =>{
        const {title, poster_path, vote_average, overview}= movie;

        const movieEl= document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML= ` 
                <img src="${IMAGE_URL+poster_path}" alt="${title} onerror=this.src="/images/bg4.jpg">

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
})

function whitebgremover2(str){
    const movies= document.getElementById("movies");
    const tv= document.getElementById("tv");

    const cat= [movies, tv];
    cat.forEach(element =>{
        if(element==str){
            str.classList.add("whitebg");
        }
        else{
            if(element.classList.contains("whitebg")){
                element.classList.remove("whitebg");
            }
        }
    })
}

const upper= document.getElementById("upper");

//Searching... 
const searching= document.getElementById("search");
searching.addEventListener("click", ()=> {
    const value= document.getElementById("movie-name").value;
    search("https://api.themoviedb.org/3/search/movie?api_key=0595eb5831f66cec3590e055439032cd&query=",value);
    
})

async function search(API_URL, movie){
        upper.innerHTML="";
    
        const upperEl=document.createElement("div");
        upperEl.classList.add("search-toggle")
        upperEl.innerHTML=`
                <div class="link whitebg" id="sMovie"><a href="#">Movies</a></div>
                <div class="link" id="stv"><a href="#">TV Shows</a></div>
                <div class="link" id="speople"><a href="#">People</a></div>
                <div class="link" id="scollection"><a href="#">Collection</a></div>
                <div class="link" id="scompanies"><a href="#">Companies</a></div>
                <div class="link" id="skeyword"><a href="#">Keyword</a></div>
                
        `;
        upper.appendChild(upperEl);

        const movie_url= API_URL+ movie;
        console.log(movie_url);
        const response= await fetch(movie_url);
        const data= await response.json();
        console.log(data.results);
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
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

    const movies= document.getElementById("sMovie");
    const tv= document.getElementById("stv");
    const people= document.getElementById("speople");
    const coll= document.getElementById("scollection");
    const comp= document.getElementById("scompanies");
    const Keyword= document.getElementById("skeyword");
    
    movies.addEventListener("click",()=>{
        whitebgremover(movies);
        const value= document.getElementById("movie-name").value;
        search("https://api.themoviedb.org/3/search/movie?api_key=0595eb5831f66cec3590e055439032cd&query=",value);
    })

    tv.addEventListener("click",async ()=>{
        whitebgremover(tv);
        const value= document.getElementById("movie-name").value;
        const TVresponse= await fetch("https://api.themoviedb.org/3/search/tv?api_key=0595eb5831f66cec3590e055439032cd&query="+ value);
        const data= await TVresponse.json();
        console.log(data.results);
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, poster_path, vote_average, overview}= movie;
    
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+poster_path}" alt="${name}">
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                        <span class="${VoteColour(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview};
                    </div>
            `
            
            main.appendChild(movieEl);
        })
    })

    people.addEventListener("click", async()=>{
        whitebgremover(people);
        const value= document.getElementById("movie-name").value;
        const movie_url= "https://api.themoviedb.org/3/search/person?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(movie_url);
        const response= await fetch(movie_url);
        const data= await response.json();
        console.log(data.results);
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, profile_path}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+ profile_path}" alt="${name}">
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>
            `
            main.appendChild(movieEl);
        })
    })

    coll.addEventListener("click", async()=>{
        whitebgremover(coll);
        const value= document.getElementById("movie-name").value;
        const movie_url= "https://api.themoviedb.org/3/search/collection?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(movie_url);
        const response= await fetch(movie_url);
        const data= await response.json();
        console.log(data.results);
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, poster_path}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+ poster_path}" alt="${name}">
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>
            `
            main.appendChild(movieEl);
        })
    })

    comp.addEventListener("click",async ()=>{
        whitebgremover(comp);
        const value= document.getElementById("movie-name").value;
        const movie_url= "https://api.themoviedb.org/3/search/company?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(movie_url);
        const response= await fetch(movie_url);
        const data= await response.json();
        console.log(data.results);
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">1</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, logo_path}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+logo_path}" alt="${name}">
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>
            `
            main.appendChild(movieEl);
        })
    })

    Keyword.addEventListener("click",async ()=>{
        whitebgremover(Keyword);
        const value= document.getElementById("movie-name").value;
        const movie_url= "https://api.themoviedb.org/3/search/keyword?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(movie_url);
        const response= await fetch(movie_url);
        const data= await response.json();
        console.log(data.results);
    
        const data1= data.results;
        main.innerHTML= "";
        data1.forEach(movie =>{
            const {name}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>
            `
            main.appendChild(movieEl);
        })
    })
    
}


function whitebgremover(str){
    const movies= document.getElementById("sMovie");
    const tv= document.getElementById("stv");
    const people= document.getElementById("speople");
    const coll= document.getElementById("scollection");
    const comp= document.getElementById("scompanies");
    const Keyword= document.getElementById("skeyword");

    const cat= [movies, tv, people, coll, comp, Keyword];
    cat.forEach(element =>{
        if(element==str){
            str.classList.add("whitebg");
        }
        else{
            if(element.classList.contains("whitebg")){
                element.classList.remove("whitebg");
            }
        }
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



