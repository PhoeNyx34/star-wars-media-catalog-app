import RoleSerializer from "./RoleSerializer.js"

class SearchAndFilterSerializer {
    static async getSearchableArray(item) {
        const allowedAttributes = ["type", "title", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedItem = {}
        for (const attribute of allowedAttributes) {
            serializedItem[attribute] = item[attribute]
        }
        
        // add related contributors
        const roles = await item.$relatedQuery("behindSceneRoles")
        const serializedRoles = await RoleSerializer.getContributorsForSearch(roles)
        serializedItem.behindSceneRoles = serializedRoles

        // set all needed values for searching into array of strings
        let searchableValues = []
        for (const [key, value] of Object.entries(serializedItem)) {
            if (typeof value === 'string') {
                searchableValues.push(value)
            }
            if (typeof value === 'boolean') {
                if (key === 'canon') {
                    if (value === true) {
                        searchableValues.push("canon")
                    } else {
                        searchableValues.push("legend")
                    }
                }
                if (key === 'animated') {
                    if (value === true) {
                        searchableValues.push("animated")
                    } else {
                        searchableValues.push("live", "live-action")
                    }
                }
                if (key === 'lego' && value === true) {
                    searchableValues.push("lego")
                }
            }
            if (typeof value === 'object') {
                if (key === 'release_date') {
                    searchableValues.push(value)
                }
                if (key === 'behindSceneRoles') {
                    let childObjectValue = value
                    for (const [key, value] of Object.entries(childObjectValue)) {
                        let roleValues = value
                        for (const [key, value] of Object.entries(roleValues)) {
                            if (key === 'contributor') {
                                searchableValues.push(value)
                            }
                        }
                    }
                }
            }
        }

        // take each string and split into words
        const searchableWordString = searchableValues.map(value => {
            const splitValues = value.toString().split(' ')
            return splitValues
        })

        // conmbine all strings into one
        let combinedString = []
        for (let i = 0; i < searchableWordString.length; i++) {
            combinedString += searchableWordString[i].concat(searchableWordString[i+1]) + ","
        }
        const splitStrings = combinedString.split(',')

        // remove duplicate words
        const searchArray = [...new Set(splitStrings)].sort()

        // return leftover words
        return searchArray
    }
}

export default SearchAndFilterSerializer