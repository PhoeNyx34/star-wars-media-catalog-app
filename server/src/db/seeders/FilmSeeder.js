import got from "got"
import { Media } from "../../models/index.js"
import SwapiAPI from "../../apiClient/SwapiClient.js"
import SeederSerializer from "../../serializers/SeederSerializer.js"

class FilmSeeder {
    static async seed() {
        const response = await SwapiAPI.getFilms()
        const swapiData = response.results
        const serializedFilms = SwapiAPI.serialize(swapiData, ["title", "release_date"])
        const filmsToSeed = await Promise.all(serializedFilms.map(async (film) => {
            const posterAndDescription = await SeederSerializer.getPosterAndDescription(film)

            const filmWithRequiredData = {
                ...film,
                type: "film",
                cover_image: posterAndDescription.coverImage,
                description: posterAndDescription.description,
                canon: true,
                animated: false,
                rating: "PG"
            }

            return filmWithRequiredData
        }))

        for (const film of filmsToSeed) {
            const currentFilm = await Media.query().findOne({ title: film.title})
            if (!currentFilm) {
                await Media.query().insert(film)
            }
        }

    }
} 

export default FilmSeeder