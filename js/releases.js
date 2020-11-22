import { apiGet } from "../js/api.js";
 
async function init(){
    const nowPlaying = await getNowPlaying();
    populateCarousel(nowPlaying);
}

async function getNowPlaying() {
    try{
        const response = await apiGet("/movie/now_playing?region=BR&language=pt-BR");
        const nowPlaying = response.results;

        return nowPlaying;
    } catch(err) {
        return null;
    }
}

async function getMovieDetails(movieId) {
    try{
        const movie = await apiGet(`/movie/${movieId}?region=BR&language=pt-BR`);

        return movie;
    } catch(err) {
        return null;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function getCategoriesFlags(categories) {
    let html = "";

    categories.forEach((category, index) => {
        const flag = `
            <div class="flag${index !== 0 ? " ml-2" : ""}"> 
                <div class="inner-flag">
                    ${category.name}
                </div>
            </div>
        `;

        html+= flag;
    });

    return html;
}

function getProductionCompaniesFlags(productionCompanies, imageBaseUrl) {
    let html = "";

    productionCompanies.forEach((pc, index) => {
        if(pc.logo_path){
            const flag = `
                <div class="movie-production${index !== 0 ? " ml-2" : ""}"> 
                    <img src="${imageBaseUrl+pc.logo_path}" alt"${pc.name}"/>
                </div>
            `;
    
            html+= flag;
        }
    });

    return html;
}

function populateCarousel(nowPlaying) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const carouselContainer = $(".carousel-inner");
    const carouselIndicatorsContainer = $(".carousel-indicators");

    nowPlaying.forEach(async(movie, index) => {
        const movieDetails = await getMovieDetails(movie.id);

        if(movie.poster_path && movie.overview) {
            const carouselItem = `
            <div class="carousel-item${index === 0 ? " active" : ""}">
                <div class="carousel-movie d-flex">
                    <div class="movie-poster">
                        <img src="${imageBaseUrl + movie.poster_path}"/>         
                    </div>
                    <div class="movie-description">
                        <h2>${movie.title}</h2>
    
                        <p>
                            <strong>Sinopse:</strong>
                            <span>${movie.overview}</span>
                        </p>
    
                        <div class="d-flex mb-4">        
                            <div class="movie-rating">
                                <img src="../assets/icons/star-fill.svg" alt="Rating"/>
                                <strong>${movieDetails.vote_average}</strong>
                            </div> 
                            <span class="ml-3">
                                <strong>Tempo:</strong>
                                ${movieDetails.runtime + " minutos"}
                            </span>
                            <span class="ml-3">
                                <strong>Estreia:</strong> ${formatDate(movie.release_date)}
                            </span>
                        </div>
    
                        <p>
                            <strong>Categorias:</strong>
                            <div class="d-flex"> 
                                ${getCategoriesFlags(movieDetails.genres)}
                            </div>
                        </p>

                        <p>
                            <strong>Produzido por:</strong>
                            <div class="d-flex"> 
                                ${getProductionCompaniesFlags(movieDetails.production_companies, imageBaseUrl)}
                            </div>
                        </p>
    
                        <div>
                            <a href="https://www.imdb.com/title/${movieDetails.imdb_id}" target="_blank"> 
                                <button type="button" class="btn btn-primary">Ver detalhes</button>
                            </a>                           
                        </div>
                    </div>
                </div>
            </div>
            `; 
    
            const carouselIndicator = `
                <li data-target="#releases-carousel" data-slide-to="${index}"${index === 0 ? 'class="active"' : ""}></li>
            `
    
            carouselContainer.append(carouselItem);
            carouselIndicatorsContainer.append(carouselIndicator);
        }
    });
}

export default init;