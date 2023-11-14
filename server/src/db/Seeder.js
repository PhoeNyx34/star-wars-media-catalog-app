/* eslint-disable no-console */
import { connection } from "../boot.js"

import FilmSeeder from "./seeders/FilmSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding films...")
    await FilmSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder