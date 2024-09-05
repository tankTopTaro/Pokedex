import express from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import { get_pokedex, post_pokedex } from '../controllers/pokedexController.js'
import { limiter } from '../middlewares/ratelimit.js'

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(compression())
app.use(limiter)

// database
const db_password = process.env.DB_PASSWORD
const db_collection = process.env.DB_COLLECTION
const db_uri = `mongodb+srv://administrator:${db_password}@cluster0.qkt9t.mongodb.net/${db_collection}?retryWrites=true&w=majority&appName=Cluster0`
const db_port = process.env.NODE_PORT
const uri = process.env.DB_URI || db_uri

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to Database')
        app.listen(db_port)
        console.log('Server running at port', db_port)
    })
    .catch((err) => {
        console.error('Could not connect to DB: ', err)
    })

app.get('/api/pokedex', get_pokedex)

app.post('/api/pokedex', post_pokedex)