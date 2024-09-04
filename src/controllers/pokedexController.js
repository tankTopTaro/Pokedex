import axios from "axios"
import { Pokemon } from "../models/pokemon.js"
import { getAverageColor } from "fast-average-color-node"

/* const limit = 10000
const offset = 0

const pokemons = []

const fetchPokemonList = async () => {
    try {
        console.log('Fetching Pokemon List')
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        pokemons.push(...response.data.results)
    } catch (err) {
        console.error('Pokemon List Error: ', err)
    }
}

const fetchPokemonData = async () => {
    try {
        console.log('Fetching Pokemon Data')
        const requests = pokemons.map(pokemon => axios.get(pokemon.url))
        const responses = await Promise.all(requests)
        const pokemonData = responses.map(response => response.data)

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].details = pokemonData[i]
        }
    } catch (err) {
        console.error('Pokemon Data Error: ', err)
    }
}

const fetchPokemonSpecies = async () => {
    try {
        console.log('Fetching Pokemon Species')
        const speciesUrls = pokemons
            .map(pokemon => pokemon.details?.species?.url)
            .filter(url => url !== undefined)

        const requests = speciesUrls.map(url => axios.get(url))
        const responses = await Promise.all(requests)
        const speciesData = responses.map(response => response.data)

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].species = speciesData[i]
        }
    } catch (err) {
        console.error('Pokemon Species Error: ', err)
    }
}

const fetchPokemonBaseColor = async () => {
    try {
        console.log('Fetching Pokemon Base Color')
        const spriteUrls = pokemons
            .map(pokemon => pokemon.details?.sprites?.front_default)
            .filter(url => url !== undefined && url !== null)

        const requests = spriteUrls.map(url => getAverageColor(url, {
            algorithm: "simple",
            ignoredColor: [
                [255, 255, 255, 255],
                [0, 0, 0, 255]
            ]
        }))
        const responses = await Promise.all(requests)
        const baseColor = responses.map(response => response.hex)

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].base_color = baseColor[i]
        }
    } catch (err) {
        console.error('Pokemon Base Color Error: ', err)
    }
}

const fetchPokemonAccentColor = async () => {
    try {
        console.log('Fetching Pokemon Accent Color')
        const baseColors = pokemons
            .map(pokemon => pokemon.base_color)
            .filter(color => color !== undefined && color !== null)

        const requests = baseColors.map(base => axios.get(`https://www.thecolorapi.com/scheme?hex=${base.slice(1)}&mode=monochrome&count=3`))
        const responses = await Promise.all(requests)
        const accents = responses.map(response => response.data.colors)

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].accents = accents[i]
        }

    } catch (err) {
        console.error('Pokemon Accent Color Error: ', err)
    }
}

const fetchAllData = async () => {
    await fetchPokemonList()
    await fetchPokemonData()
    await fetchPokemonSpecies()
    await fetchPokemonBaseColor()
    await fetchPokemonAccentColor()
}

const storeAllData = async () => {
    const pokemonData = pokemons.map((pokemon) => {
        return {
            name: pokemon.name,
            id: pokemon.details?.id,
            order: pokemon.details?.order,
            height: pokemon.details?.height,
            weight: pokemon.details?.weight,
            cries: pokemon.details?.cries?.latest,
            color: pokemon.species?.color?.name,
            generation: pokemon.species?.generation?.name,
            palette: {
                base: pokemon.base_color,
                accents: pokemon.accents?.map(color => color.hex?.value)
            },
            evolution_chain: {
                url: pokemon.species?.evolution_chain?.url
            },
            sprites: {
                front_default: pokemon.details?.sprites?.front_default,
                front_shiny: pokemon.details?.sprites?.front_shiny,
                official_artwork: {
                    front_default: pokemon.details?.sprites?.other["official-artwork"]?.front_default,
                    front_shiny: pokemon.details?.sprites?.other["official-artwork"]?.front_shiny,
                }
            },
            abilities: pokemon.details?.abilities?.map(a => ({
                ability: {
                    name: a.ability.name,
                    url: a.ability.url
                },
                is_hidden: a.is_hidden
            })),
            stats: pokemon.details?.stats?.map(stat => ({
                base_stat: stat.base_stat,
                stat: stat.stat.name
            })),
            types: pokemon.details?.types?.map(type => ({
                name: type.type.name
            })),
            flavor_text_entries: pokemon.species?.flavor_text_entries?.map(entry => ({
                flavor_text: entry.flavor_text,
                language: entry.language.name,
                version: entry.version.name
            })),
            genera: pokemon.species?.genera?.map(genus => ({
                genus: genus.genus,
                language: genus.language.name
            }))
            
        }
    })

    return pokemonData
}

const chunkArray = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
} */

// Controllers
const get_pokedex = async (req, res) => {
    /* await fetchAllData()
    res.json(pokemons)
    console.log('get_pokedex') */
}

const post_pokedex = async (req, res) => {
    /* const data = await storeAllData()
    const batches = chunkArray(data, 20)

    for (const batch of batches) {
        try {
            await Pokemon.insertMany(batch)
            console.log(`Inserted batch of ${batch.length} Pokemon successfully!`)
        } catch (error) {
            console.error('Error inserting batch: ', error)
        }
    }
    
    console.log('post_pokedex') */
}

export {
    get_pokedex,
    post_pokedex
}