import TheMovieDataBaseClient from "../apiClient/TheMovieDataBaseClient.js"

class FilmSerializer {
    static removeTimestamps(films) {
        const allowedAttributes = ["id", "title", "cover_image", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedFilms = films.map(film => {
            let serializedFilm = {}
            for (const attribute of allowedAttributes) {
                serializedFilm[attribute] = film[attribute]
            }
            return serializedFilm
        }) 
        return serializedFilms
    }
    
    static getCoverAndTitle(films) {
        const allowedAttributes = ["id", "title", "cover_image"]
        const serializedFilms = films.map(film => {
            let serializedFilm = {}
            for (const attribute of allowedAttributes) {
                serializedFilm[attribute] = film[attribute]
            }
            return serializedFilm
        }) 
        return serializedFilms
    }
}

export default FilmSerializer