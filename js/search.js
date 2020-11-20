import { apiGet } from "../js/api.js";

$(document).ready(async() => {
    addFormEventListener();
});

function addFormEventListener() {
    $("#form-search").submit(async(event) => {
        event.preventDefault();

        const value = $("#input-search").val();
        console.log(value);
        const result = await searchMovie(value);
        console.log(result);
        clearLastSearch();
        makeResultCards(result);
    });
}

async function searchMovie(query) {
    try{
        const response = await apiGet(`/search/movie?language=pt-BR&query=${query}`);
        return response;
    } catch(error) {
        return null;
    }
}

function clearLastSearch() {
   $(".result-ctn").empty();
}

function makeResultCards(queryResult) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const cardsContainer = $(".result-ctn");

    queryResult.results.forEach(movie => {

        const movieCard = `
        <div class="card col-3" style="width: 18rem;">
            <img src="${imageBaseUrl + movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <a href="#" class="btn btn-primary">Ver detalhes</a>
            </div>
        </div>
        `;

        cardsContainer.append(movieCard);
    });
}