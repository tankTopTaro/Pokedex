import mongoose from "mongoose"

const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    order: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    cries: { type: String },
    color: { type: String },
    generation: { type: String },
    palette: {
        base: { type: String },
        accents: [{ type: String }] 
    },
    evolution_chain: {
        url: { type: String }
    },
    sprites: {
        front_default: { type: String },
        front_shiny: { type: String },
        official_artwork: {
            front_default: { type: String },
            front_shiny: { type: String }
        }
    },
    abilities: [{
        ability: {
            name: { type: String },
            url: { type: String }
        },
        is_hidden: { type: Boolean }
    }],
    stats: [{
        base_stat: { type: Number },
        stat: { type: String }
    }],
    types: [{
        name: { type: String }
    }],
    flavor_text_entries: [{
        flavor_text: { type: String },
        language: { type: String },
        version: { type: String }
    }],
    genera: [{
        genus: { type: String },
        language: { type: String }
    }]
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

export {
    Pokemon
}