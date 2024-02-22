import { Media } from "../../models/index.js"

class EraSeeder {
    static async seed() {
        const erasData = [
            {mediaId: 1, fictional_year_start: 0, fictional_year_end: 0, rating: "PG"},
            {mediaId: 2, fictional_year_start: 3, fictional_year_end: 3, rating: "PG"},
            {mediaId: 3, fictional_year_start: 4, fictional_year_end: 4, rating: "PG"},
            {mediaId: 4, fictional_year_start: -32, fictional_year_end: -32, rating: "PG"},
            {mediaId: 5, fictional_year_start: -22, fictional_year_end: -22, rating: "PG"},
            {mediaId: 6, fictional_year_start: -19, fictional_year_end: -19, rating: "PG-13"}
        ]

        for (const era of erasData) {
            const eraUpdated = await Media.query().findById(era.mediaId).patch({fictional_year_start: era.fictional_year_start, fictional_year_end: era.fictional_year_end, rating: era.rating})
        }
    }
}

export default EraSeeder