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
        if (item.fictional_year_end < -25025) {
            era = "Dawn of the Jedi"
        } else if (item.fictional_year_start < -1000) {
            era = "The Old Republic"
        } else if (item.fictional_year_start < -500) {
            era = "Reformation"
        } else if (item.fictional_year_start < -100) {
            era = "The High Republic"
        } else if (item.fictional_year_start < -18) {
            era = "Fall of the Jedi"
        } else if (item.fictional_year_start < 0) {
            era = "Reign of the Empire"
        } else if (item.fictional_year_start < 6) {
            era = "Age of Rebellion"
        } else if (item.fictional_year_start < 34) {
            era = "The New Republic"
        } else if (item.fictional_year_start <= 35 ) {
            era = "Rise of the First Order"
        } else {
            era = "New Jedi Order"
        }
        
        return era
    }
}

export default SearchAndFilterSerializer