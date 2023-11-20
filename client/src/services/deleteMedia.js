const executeDelete = async (mediaId) => {
    try {
        const response = await fetch(`/api/v1/media/${mediaId}`, {method: "DELETE"})
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
        }
        location.href = "/"
    } catch (error) {
        window.alert("Delete unsuccessful")
        console.error(`Error in fetch: ${error.message}`)
    }
}

export default executeDelete