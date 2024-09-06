import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://administrator:Password@cluster0.qkt9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const fetchCollectionData = async (dbName, collectionName) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const data = await collection.find({}).toArray();
    console.log(data)
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  } finally {
    await client.close();
  }
};

export { fetchCollectionData }
