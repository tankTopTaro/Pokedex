import { fetchCollectionData } from "./mongodbClient"

export const handler = async (event, context) => {
    try {
        const data = await fetchCollectionData('Pokedex', 'pokemons')
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}