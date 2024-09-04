import { Pokemon } from "../models/pokemon.js"

// Controllers
const get_pokedex = async (req, res) => {
   try {
        const pokedex = await Pokemon.find().sort({ _id: 1})
        res.json(pokedex)
   } catch (error) {
        console.error('Get Pokedex Error:', error)
   } 
}

const post_pokedex = (req, res) => {

}

const get_null = async (req, res) => {
    try {
        /* const result = await Pokemon.deleteMany({
            'sprites.front_default': null ,
            'sprites.official_artwork.front_default': null 
        })

        res.json({
            message: "Document with null sprite values deleted",
            deletedCount: result.deletedCount
        }) */
       const null_sprite = await Pokemon.find({
            $or: [
                {'sprites.front_default': null} ,
                {'sprites.official_artwork.front_default': null}
            ]
       })

       res.json(null_sprite)
    } catch (error) {
        console.error('Get Null Error:', error)
    }
}

export {
    get_pokedex,
    post_pokedex,
    get_null
}