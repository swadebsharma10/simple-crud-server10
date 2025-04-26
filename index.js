const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// CrudServer25
// VMJrSa0XRkpXiabu

app.get("/", (req, res) => {
  res.send("simple crud is running");
});

const uri =
  "mongodb+srv://CrudServer25:VMJrSa0XRkpXiabu@cluster0.fikwith.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("crudDB").collection("users")
   
    app.post('/users', async(req, res)=>{
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result)

    })

    app.get('/users', async(req, res)=>{
      const cursor = usersCollection.find();
      const result = await cursor.toArray() ;
      res.send(result)
    })

    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //  await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple crud is running  on port ${port}`);
});
