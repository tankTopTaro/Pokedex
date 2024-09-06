import { MongoClient } from "mongodb"

const uri = process.env.DB_URI

const client = new MongoClient(uri)

export const fetchCollectionData = async (dbName, collectionName) => {
    try {
        await client.connect()
        const database = client.db(dbName)
        const collection = database.collection(collectionName)
        const data = await collection.find({}).toArray()
        return data
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`)
    } finally {
        await client.close()
    }
}

