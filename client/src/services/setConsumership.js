const setConsumership = async (mediaId) => {
    try {
        const response = await fetch(`/api/v1/consumed-media/${mediaId}`, {method: 'POST'})
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
        }
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
    }
}

export default setConsumership