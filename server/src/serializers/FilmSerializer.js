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

    static async getPosters(film) {     
        let movieId = ""
        if (film.title === "A New Hope") {
            movieId = 11
        } else if (film.title === "The Empire Strikes Back") {
            movieId = 1891
        } else if (film.title === "Return of the Jedi") {
            movieId = 1892
        } else if (film.title === "The Phantom Menace") {
            movieId = 1893
        } else if (film.title === "Attack of the Clones") {
            movieId = 1894
        } else if (film.title === "Revenge of the Sith") {
            movieId = 1895
        }

        const posterPath = await TheMovieDataBaseClient.getPosterPath(movieId)

        const coverImage = `http://image.tmdb.org/t/p/w342${posterPath}`

        return coverImage
    }
}

export default FilmSerializer