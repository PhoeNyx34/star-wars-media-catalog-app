import got from "got"
import dotenv from "dotenv"
dotenv.config()

const tmdbApiToken = process.env.TMDB_API_ACCESS_TOKEN

class TheMovieDataBaseClient { 
    // async getMovieId() {

    // }
    
    static async getPosterPath(id) {
        const movieId = id
        const url = `https://api.themoviedb.org/3/movie/${movieId}`
        
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${tmdbApiToken}`
                }
            }
            const apiResponse = await got(url, options).json()
            const posterPath = apiResponse.poster_path
            return posterPath
        } catch (error) {
            return { error: error.message }
        }
    }
}

export default TheMovieDataBaseClient