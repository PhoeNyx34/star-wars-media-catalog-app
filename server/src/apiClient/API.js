import got from "got"
import dotenv from "dotenv"
dotenv.config()

class API {
    constructor(url) {
        this.url = url
    }
    
    async get() {
        try {
            const apiResponse = await got(this.url).json()
            return apiResponse
        } catch(error) {
            return { error: error.message }
        }
    }

    serialize(array, attributes) {
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

export default API