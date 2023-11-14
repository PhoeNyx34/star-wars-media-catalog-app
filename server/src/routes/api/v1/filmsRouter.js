import express from "express"

import { Film } from "../../../models/index.js"
import FilmSerializer from "../../../serializers/FilmSerializer.js"

const filmsRouter = new express.Router()

filmsRouter.get("/", async (req, res) => {
    try {
        const films = await Film.query()
        const serializedFilms = FilmSerializer.getCoverAndTitle(films)
        return res.status(200).json({ films: serializedFilms })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default filmsRouter