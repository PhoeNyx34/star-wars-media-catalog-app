import got from "got"

class SwapiAPI {
    static async get() {
        try {
            const apiResponse = await got("https://swapi.dev/api/films").json()
            return apiResponse
        } catch(error) {
            return { error: error.message }
        }
    }

    static serialize(array, attributes) {
        const serializedData = array.map(item => {
            const allowedAttributes = attributes
            let serializedItem = {}

            for (const attribute of allowedAttributes) {
                serializedItem[attribute] = item[attribute]
            }

            return serializedItem
        })
        return serializedData
    }
}

export default SwapiAPI