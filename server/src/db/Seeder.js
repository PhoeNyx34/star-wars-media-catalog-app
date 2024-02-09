/* eslint-disable no-console */
import { connection } from "../boot.js"

import UserSeeder from "./seeders/UserSeeder.js"
import FilmSeeder from "./seeders/FilmSeeder.js"
import ContributorSeeder from "./seeders/ContributorSeeder.js"
import BehindSceneRoleSeeder from "./seeders/BehindSceneRoleSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding films...")
    await FilmSeeder.seed()

    console.log("Seeding contributors...")
    await ContributorSeeder.seed()

    console.log("Seeding behind the scenes roles...")
    await BehindSceneRoleSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder