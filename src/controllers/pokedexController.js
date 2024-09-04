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

export {
    get_pokedex,
    post_pokedex
}