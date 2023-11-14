import got from "got"
import { Film } from "../../models/index.js"
import API from "../../apiClient/API.js"
import FilmSerializer from "../../serializers/FilmSerializer.js"

class FilmSeeder {
    static async seed() {
        const swapiFilms = new API("https://swapi.dev/api/films")

        const response = await swapiFilms.get()
        const swapiData = response.results
        const serializedFilms = swapiFilms.serialize(swapiData, ["title", "release_date"])
        const filmsToSeed = await Promise.all(serializedFilms.map(async (film) => {
            const coverImage = await FilmSerializer.getPosters(film)

            let filmWithRequiredData = {
                ...film,
                cover_image: coverImage,
                canon: true,
                animated: false,
                rating: "PG"
            }

            return filmWithRequiredData
        }))

        for (const film of filmsToSeed) {
            const currentFilm = await Film.query().findOne({ title: film.title})
            if (!currentFilm) {
                await Film.query().insert(film)
            }
        }

    }
} 

export default FilmSeeder