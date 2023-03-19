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

const API_KEY="api_key=0595eb5831f66cec3590e055439032cd";
const BASE_URL="https://api.themoviedb.org/3"
const IMAGE_URL= "https://image.tmdb.org/t/p/w500"

const main= document.getElementById("main");


//FRONT PAGE CONTENT(Popular Movies and TV shows)

//pagination





var currentPage =1;
var nextPage= 2;
var prevPage= 3;
var lasturl= "";
var totalPages= 100;

async function popularMovies(url){
    whitebgremover2(movies);
    const TVresponse= await fetch(url);
    lasturl= url; 

    const data= await TVresponse.json();

    const upper= document.getElementById("upper");
    
    console.log(data.results);
    currentPage =data.page;
    nextPage= currentPage + 1;
    prevPage= currentPage - 1;
    totalPages=data.total_pages;
    const data1= data.results;

    main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">${currentPage}</div>
            <div class="next" id="next">></div>
        </div>`; 
    data1.forEach(movie =>{
        const {title, poster_path, vote_average, overview, id}= movie;
        const movieEl= document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML= ` 
                <img src="${IMAGE_URL+poster_path}" alt="${title}">

                <div class="fav"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${VoteColour(vote_average)}">${vote_average}</span>
                </div>
                <div class="${id}" id="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
        `
        main.appendChild(movieEl);
    })
    upper.scrollIntoView({behavior: 'smooth'});
    const heart= document.querySelectorAll(".heart-icon");
    boxiconAnimation(heart, "bx-heart", "bxs-heart");

    function pageCall(page){
        let urlSplit= lasturl.split("?");
        let queryparams= urlSplit[1].split("&");
        let key= queryparams[queryparams.length -1].split("=");
        if(key[0]!="page"){
            let url = lasturl + "&page=" + page;
            popularMovies(url);
        }
        else{
            key[1]= page.toString();
            let a= key.join("=");
            queryparams[queryparams.length-1]=a;
            let b= queryparams.join("&");
            let url = urlSplit[0] + "?" + b;
            popularMovies(url);
        }
    }

    const prev= document.getElementById("prev");
    prev.addEventListener("click", ()=>{
        console.log("prev called");
        if(prevPage>0){
            pageCall(prevPage);
        }
    })

    const next= document.getElementById("next");
    next.addEventListener("click", ()=>{
        console.log("next called");
        if(nextPage<= totalPages){
            pageCall(nextPage);
        }
    })

    
}

async function popularTv(url){
    lasturl= url;
    const TVresponse= await fetch(url);
    const data= await TVresponse.json();
    console.log(data.results);

    const upper= document.getElementById("upper");
    
    console.log(data.results);
    currentPage =data.page;
    nextPage= currentPage + 1;
    prevPage= currentPage - 1;
    totalPages=data.total_pages;

    const data1= data.results

    main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">${currentPage}</div>
            <div class="next" id="next">></div>
        </div>`;
    data1.forEach(movie =>{
        const {name, poster_path, vote_average, overview,id}= movie;

        const movieEl= document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML= ` 
                <img src="${IMAGE_URL+poster_path}" alt="${name}">
                <div class="fav"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>
                <div class="movie-info">
                    <h3>${name}</h3>
                    <span class="${VoteColour(vote_average)}">${vote_average}</span>
                </div>
                <div class="${id}" id="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
        `
        
        main.appendChild(movieEl);
    })
    upper.scrollIntoView({behavior: 'smooth'});
    const heart= document.querySelectorAll(".heart-icon");
    boxiconAnimation(heart, "bx-heart", "bxs-heart");

    function pageCall(page){
        let urlSplit= lasturl.split("?");
        let queryparams= urlSplit[1].split("&");
        let key= queryparams[queryparams.length -1].split("=");
        if(key[0]!="page"){
            let url = lasturl + "&page=" + page;
            popularTv(url);
        }
        else{
            key[1]= page.toString();
            let a= key.join("=");
            queryparams[queryparams.length-1]=a;
            let b= queryparams.join("&");
            let url = urlSplit[0] + "?" + b;
            popularTv(url);
        }
    }

    const prev= document.getElementById("prev");
    prev.addEventListener("click", ()=>{
        console.log("prev called");
        if(prevPage>0){
            pageCall(prevPage);
        }
    })

    const next= document.getElementById("next");
    next.addEventListener("click", ()=>{
        console.log("next called");
        if(nextPage<= totalPages){
            pageCall(nextPage);
        }
    })

}

//fetching popular movies
const movies= document.getElementById("movies");
var url= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0595eb5831f66cec3590e055439032cd&language=en-US";
popularMovies(url);
movies.addEventListener("click", async ()=>{
    whitebgremover2(movies);
    popularMovies(url);
})

//fetching popular tv shows
const tv= document.getElementById("tv");
var url2= "https://api.themoviedb.org/3/tv/popular?api_key=0595eb5831f66cec3590e055439032cd&language=en-US&page=1";
tv.addEventListener("click", async ()=>{
    whitebgremover2(tv);
    popularTv(url2);
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


//Searching function...
const upper= document.getElementById("upper");
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
        `;
    upper.appendChild(upperEl);

    const movie_url= API_URL+ movie;
    searchMovie(movie_url);

    const movies= document.getElementById("sMovie");
    const tv= document.getElementById("stv");
    const people= document.getElementById("speople");
    const coll= document.getElementById("scollection");

    async function searchMovie(url){
        lasturl = url;
        console.log(url);
        const response= await fetch(url);
        const data= await response.json();
        console.log(data.results);

        currentPage =data.page;
        nextPage= currentPage + 1;
        prevPage= currentPage - 1;
        totalPages=data.total_pages;
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">${currentPage}</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {title, poster_path, vote_average, overview, id}= movie;
    
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+poster_path}" alt="${title}">

                    <div class="fav"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>
    
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${VoteColour(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="${id}", id="overview">
                        <h3>Overview</h3>
                        ${overview};
                    </div>
            `
            main.appendChild(movieEl);
        })

        function pageCall(page){
            let urlSplit= lasturl.split("?");
            let queryparams= urlSplit[1].split("&");
            let key= queryparams[queryparams.length -1].split("=");
            if(key[0]!="page"){
                let url = lasturl + "&page=" + page;
                popularTv(url);
            }
            else{
                key[1]= page.toString();
                let a= key.join("=");
                queryparams[queryparams.length-1]=a;
                let b= queryparams.join("&");
                let url = urlSplit[0] + "?" + b;
                popularTv(url);
            }
        }
    
        const prev= document.getElementById("prev");
        prev.addEventListener("click", ()=>{
            console.log("prev called");
            if(prevPage>0){
                pageCall(prevPage);
            }
        })
    
        const next= document.getElementById("next");
        next.addEventListener("click", ()=>{
            console.log("next called");
            if(nextPage<= totalPages){
                pageCall(nextPage);
            }
        })

    }

    async function searchTV(url){
        lasturl = url;
        const TVresponse= await fetch(url);
        const data= await TVresponse.json();
        console.log(data.results);

        currentPage =data.page;
        nextPage= currentPage + 1;
        prevPage= currentPage - 1;
        totalPages=data.total_pages;

        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">${currentPage}</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, poster_path, vote_average, overview, id}= movie;
    
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+poster_path}" alt="${name}">

                    <div class="fav"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                        <span class="${VoteColour(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="${id}" id="overview">
                        <h3>Overview</h3>
                        ${overview};
                    </div>
            `
            
            main.appendChild(movieEl);
        })
        const heart= document.querySelectorAll(".heart-icon");
        boxiconAnimation(heart, "bx-heart", "bxs-heart");

        function pageCall(page){
            let urlSplit= lasturl.split("?");
            let queryparams= urlSplit[1].split("&");
            let key= queryparams[queryparams.length -1].split("=");
            if(key[0]!="page"){
                let url = lasturl + "&page=" + page;
                popularTv(url);
            }
            else{
                key[1]= page.toString();
                let a= key.join("=");
                queryparams[queryparams.length-1]=a;
                let b= queryparams.join("&");
                let url = urlSplit[0] + "?" + b;
                popularTv(url);
            }
        }
    
        const prev= document.getElementById("prev");
        prev.addEventListener("click", ()=>{
            console.log("prev called");
            if(prevPage>0){
                pageCall(prevPage);
            }
        })
    
        const next= document.getElementById("next");
        next.addEventListener("click", ()=>{
            console.log("next called");
            if(nextPage<= totalPages){
                pageCall(nextPage);
            }
        })

    }

    async function searchPeople(url){
        lasturl = url;
        const response= await fetch(url);
        const data= await response.json();
        console.log(data.results);

        currentPage =data.page;
        nextPage= currentPage + 1;
        prevPage= currentPage - 1;
        totalPages=data.total_pages;
    
        const data1= data.results;
        main.innerHTML= `
        <div class="pagination">
            <div class="prev" id="prev"><</div>
            <div class="curr" id="curr"">${currentPage}</div>
            <div class="next" id="next">></div>
        </div>`;
        data1.forEach(movie =>{
            const {name, profile_path}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+ profile_path}" alt="${name}">

                    <div class="fav2"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>
            `
            main.appendChild(movieEl);
        })

        function pageCall(page){
            let urlSplit= lasturl.split("?");
            let queryparams= urlSplit[1].split("&");
            let key= queryparams[queryparams.length -1].split("=");
            if(key[0]!="page"){
                let url = lasturl + "&page=" + page;
                popularTv(url);
            }
            else{
                key[1]= page.toString();
                let a= key.join("=");
                queryparams[queryparams.length-1]=a;
                let b= queryparams.join("&");
                let url = urlSplit[0] + "?" + b;
                popularTv(url);
            }
        }
    
        const prev= document.getElementById("prev");
        prev.addEventListener("click", ()=>{
            console.log("prev called");
            if(prevPage>0){
                pageCall(prevPage);
            }
        })
    
        const next= document.getElementById("next");
        next.addEventListener("click", ()=>{
            console.log("next called");
            if(nextPage<= totalPages){
                pageCall(nextPage);
            }
        })
    }


    async function searchCollection(url){
        lasturl = url;
        const response= await fetch(url);
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
            const {name, poster_path, overview, id}= movie;
            const movieEl= document.createElement("div");
            movieEl.classList.add("movie");
    
            movieEl.innerHTML= ` 
                    <img src="${IMAGE_URL+ poster_path}" alt="${name}">

                    <div class="fav2"><a href="#"><i class='bx bx-heart bx-sm heart-icon' ></i></div>
    
                    <div class="movie-info">
                        <h3>${name}</h3>
                    </div>

                    </div>
                    <div class="${id}" id="overview">
                        <h3>Overview</h3>
                        ${overview};
                    </div>
            `
            main.appendChild(movieEl);
        })

        function pageCall(page){
            let urlSplit= lasturl.split("?");
            let queryparams= urlSplit[1].split("&");
            let key= queryparams[queryparams.length -1].split("=");
            if(key[0]!="page"){
                let url = lasturl + "&page=" + page;
                popularTv(url);
            }
            else{
                key[1]= page.toString();
                let a= key.join("=");
                queryparams[queryparams.length-1]=a;
                let b= queryparams.join("&");
                let url = urlSplit[0] + "?" + b;
                popularTv(url);
            }
        }
    
        const prev= document.getElementById("prev");
        prev.addEventListener("click", ()=>{
            console.log("prev called");
            if(prevPage>0){
                pageCall(prevPage);
            }
        })
    
        const next= document.getElementById("next");
        next.addEventListener("click", ()=>{
            console.log("next called");
            if(nextPage<= totalPages){
                pageCall(nextPage);
            }
        })
    }
    
    
    
    movies.addEventListener("click",()=>{
        whitebgremover(movies);
        const value= document.getElementById("movie-name").value;
        const url= "https://api.themoviedb.org/3/search/movie?api_key=0595eb5831f66cec3590e055439032cd&query="+value;
        searchMovie(url);
    })

    tv.addEventListener("click",async ()=>{
        whitebgremover(tv);
        const value= document.getElementById("movie-name").value;
        const url = "https://api.themoviedb.org/3/search/tv?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        searchTV(url);
    })

    people.addEventListener("click", async()=>{
        whitebgremover(people);
        const value= document.getElementById("movie-name").value;
        const url= "https://api.themoviedb.org/3/search/person?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(url);
        searchPeople(url);
        const heart= document.querySelectorAll(".heart-icon");
        boxiconAnimation(heart, "bx-heart", "bxs-heart");
    })

    coll.addEventListener("click", async()=>{
        whitebgremover(coll);
        const value= document.getElementById("movie-name").value;
        const url= "https://api.themoviedb.org/3/search/collection?api_key=0595eb5831f66cec3590e055439032cd&query="+ value;
        console.log(url);
        searchCollection(url);
        const heart= document.querySelectorAll(".heart-icon");
        boxiconAnimation(heart, "bx-heart", "bxs-heart");
    })
    const heart= document.querySelectorAll(".heart-icon");
    boxiconAnimation(heart, "bx-heart", "bxs-heart");

}


function whitebgremover(str){
    const movies= document.getElementById("sMovie");
    const tv= document.getElementById("stv");
    const people= document.getElementById("speople");
    const coll= document.getElementById("scollection");

    const cat= [movies, tv, people, coll];
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



