class ContributorSerializer {
    static getName(contributor) {
        const allowedAttributes = ["name"]
        let serializedContributor = {}
        for (const attribute of allowedAttributes) {
            serializedContributor[attribute] = contributor[attribute]
        }
        return serializedContributor
    }
}

export default ContributorSerializer