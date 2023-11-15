import got from "got"
import { Film } from "../../models/index.js"
import SwapiAPI from "../../apiClient/SwapiClient.js"
import SeederSerializer from "../../serializers/SeederSerializer.js"

class FilmSeeder {
    static async seed() {
        const response = await SwapiAPI.get()
        const swapiData = response.results
        const serializedFilms = SwapiAPI.serialize(swapiData, ["title", "release_date"])
        const filmsToSeed = await Promise.all(serializedFilms.map(async (film) => {
            const coverImage = await SeederSerializer.getPosters(film)

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