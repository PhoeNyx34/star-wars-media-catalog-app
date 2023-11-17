import got from "got"
import config from "../config.js"

class TheMovieDataBaseClient { 
    static async getPosterAndDescription(id) {
        const movieId = id
        const url = `https://api.themoviedb.org/3/movie/${movieId}`
        
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${config.tmdbApi.tmdbApiToken}`
                }
            }
            const apiResponse = await got(url, options).json()
            const description = apiResponse.overview
            const posterPath = apiResponse.poster_path

            const gotInfo = { description: description, posterPath: posterPath }
            return gotInfo
        } catch (error) {
            return { error: error.message }
        }
    }
}

export default TheMovieDataBaseClient