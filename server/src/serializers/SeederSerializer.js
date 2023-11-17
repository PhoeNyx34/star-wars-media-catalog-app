import TheMovieDataBaseClient from "../apiClient/TheMovieDataBaseClient.js"

class SeederSerializer {
    static async getPosterAndDescription(film) {     
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

        const info = await TheMovieDataBaseClient.getPosterAndDescription(movieId)

        const coverImage = `http://image.tmdb.org/t/p/w342${info.posterPath}`
        const description = info.description

        const data = { coverImage: coverImage, description: description}

        return data
    }
}

export default SeederSerializer