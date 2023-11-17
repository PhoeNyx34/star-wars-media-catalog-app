import { Contributor } from "../../models/index.js"

class ContributorSeeder {
    static async seed() {
        const contributorsData = [
            {name: "George Lucas" },
            {name: "Irvin Kershner" },
            {name: "Richard Marquand" },
            {name: "Leigh Brackett"},
            {name: "Lawrence Kasdan"},
            {name: "Jonathan Hales"}
        ]

        for (const contributor of contributorsData) {
            let currentContributor = await Contributor.query().findOne({ name: contributor.name })
            if (!currentContributor) {
                await Contributor.query().insertAndFetch(contributor)
            }
        }
    }
}

export default ContributorSeeder