import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import { get_pokedex, post_pokedex } from '../controllers/pokedexController.js'
import { limiter } from '../middlewares/ratelimit.js'

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(limiter)

// database
const db_name = process.env.DB
const db_port = process.env.PORT
const db_password = process.env.PASSWORD
const uri = `mongodb+srv://administrator:${db_password}@cluster0.qkt9t.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to Database')
        app.listen(db_port)
        console.log('Server running at port ', db_port)
    })
    .catch((err) => {
        console.error('Could not connect to DB: ', err)
    })

app.get('/api/pokedex', get_pokedex)

app.post('/api/pokedex', post_pokedex)