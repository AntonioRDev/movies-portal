const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YThmYzgwNjYwNjZmNjkxMWJlMzRkOTA1NWU1ZDJhOCIsInN1YiI6IjVmYjQzYzFjZWM0NTUyMDAzZGZhOWZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B7ph4rUJhE47FnWoYXKx32KiOkTmWq5KAmoGR4F1e00";
const API_BASE_URL = "https://api.themoviedb.org/3/";

export const apiGet = async(url) => {
    try{
        const finalUrl = API_BASE_URL + url;

        const responsePromiss = await fetch(finalUrl, {
            method: "GET",
            headers: getHeaders()
        });
        const response = await responsePromiss.json();

        return response;
    } catch(error){
        return null;
    }
}

const getHeaders = () => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer "+ API_TOKEN);
    headers.append("Content-Type", "application/json");

    return headers;
}