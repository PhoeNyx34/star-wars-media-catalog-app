import ContributorSerializer from "./ContributorSerializer.js"

class RoleSerializer {
    static async getContributors(roles) {
        const allowedAttributes = ["id", "contributorId", "role"]
        const serializedRoles = await Promise.all(roles.map(async (role) => {
            let serializedRole = {}
            for (const attribute of allowedAttributes) {
                serializedRole[attribute] = role[attribute]
            }
    
            const contributor = await role.$relatedQuery("contributor")
            const serializedContributor = ContributorSerializer.getName(contributor)
            serializedRole.contributor = serializedContributor
    
            return serializedRole
        }))
        return serializedRoles
    }

    static async getContributorsForSearch(roles) {
        const allowedAttributes = ["role"]
        const serializedRoles = await Promise.all(roles.map(async (role) => {
            let serializedRole = {}
            for (const attribute of allowedAttributes) {
                serializedRole[attribute] = role[attribute]
            }
    
            const contributor = await role.$relatedQuery("contributor")
            const serializedContributor = ContributorSerializer.getName(contributor)
            serializedRole.contributor = serializedContributor.name
    
            return serializedRole
        }))
        return serializedRoles
    }

    static async getNamesForFilter(roles) {
        const namesList = await Promise.all(roles.map(async (role) => {
            const contributor = await role.$relatedQuery("contributor")
            const serializedContributor = ContributorSerializer.getName(contributor)
            return serializedContributor.name
        }))
        
        const namesListNoDupes = [...new Set(namesList)]

        return namesListNoDupes
    }
}

export default RoleSerializer