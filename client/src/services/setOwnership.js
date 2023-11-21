const setOwnership = async (mediaId, userId) => {
    const relationship = {mediaId, userId}
    
    try {
        const response = await fetch(`/api/v1/owned-media/${mediaId}`, {
            method: "POST",
            headers: new Headers({"Content-Type":"application/json"}),
            body: JSON.stringify(relationship)
        })
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
        }
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
    }
}

export default setOwnership