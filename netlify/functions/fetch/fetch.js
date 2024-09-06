import { fetchCollectionData } from "./mongodbClient"

const handler = async (event) => {
  try {
    const data = await fetchCollectionData('Pokedex', 'pokemons');
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
