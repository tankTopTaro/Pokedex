import { fetchCollectionData } from "./mongodbClient.js"

export const handler = async () => {
  try {
    const data = await fetchCollectionData('Pokedex', 'pokemons')
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
