import RoleSerializer from "./RoleSerializer.js"

class SearchAndFilterSerializer {
    static async getSearchableArray(item) {
        const allowedAttributes = ["type", "title", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedItem = {}
        for (const attribute of allowedAttributes) {
            serializedItem[attribute] = item[attribute]
        }
        
        const roles = await item.$relatedQuery("behindSceneRoles")
        const serializedRoles = await RoleSerializer.getContributorsForSearch(roles)
        serializedItem.behindSceneRoles = serializedRoles

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

        const searchableWordString = searchableValues.map(value => {
            const splitValues = value.toString().split(' ')
            return splitValues
        })

        let combinedString = []
        for (let i = 0; i < searchableWordString.length; i++) {
            combinedString += searchableWordString[i].concat(searchableWordString[i+1]) + ","
        }
        const splitStrings = combinedString.split(',')
        const searchArray = [...new Set(splitStrings)].sort()

        return searchArray
    }

    static getEra(item) {
        let era = ""
        if (item.fictional_year_end < -25000) {
            era = "Dawn of the Jedi"
        }
        if (item.fictional_year_start >= -25000 && item.fictional_year_start <= -1000) {
            era = "The Old Republic"
        }
        if (item.fictional_year_start >= -500 && item.fictional_year_start < -100) {
            era = "The High Republic"
        }
        if (item.fictional_year_start >= -100 && item.fictional_year_start < -19) {
            era = "Fall of the Jedi"
        }
        if (item.fictional_year_start >= -19 && item.fictional_year_start < 0) {
            era = "Reign of the Empire"
        }
        if (item.fictional_year_start >= 0 && item.fictional_year_start <= 5) {
            era = "Age of Rebellion"
        }
        if (item.fictional_year_start > 5 && item.fictional_year_start < 34) {
            era = "The New Republic"
        }
        if (item.fictional_year_start === 34 || item.fictional_year_start === 35 ) {
            era = "Rise of the First Order"
        }
        if (item.fictional_year_start > 35) {
            era = "New Jedi Order"
        }
        
        return era
    }
}

export default SearchAndFilterSerializer