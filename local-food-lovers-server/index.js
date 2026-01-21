const express = require('express')
const cors = require('cors');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000
// middlewere........................start
app.use(express.json())
app.use(cors())
// middlewere........................end
// firebase admin sdk start..............
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const varifyToken = async (req, res, next)=>{
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).send({
            message: "unauthorized access"
        })
    }
    const token = authorization.split(" ")[1]
    try {
        await admin.auth().verifyIdToken(token)
        next()
    } catch (error) {
        res.status(401).send({
            message: "unauthorized access"
        })
    }
}
// firebase admin sdk end................
// mongodb ......................start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iiwakpk.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const db = client.db("locale-food")
    const foodCollection = db.collection("allFoods")
    const favouritesCollection = db.collection("favouriteFoods")

    app.get("/allFoods", async(req, res)=>{
        const result = await foodCollection.find().sort({rating: "desc"}).limit(6).toArray()
        res.send(result)
    })
    app.get("/allReviews", async(req, res)=>{
        const result = await foodCollection.find().sort({created_at: "desc"}).toArray()
        res.send(result)
    })
    app.get("/my-reviews", varifyToken ,async(req, res)=>{
        const email = req.query.email
        const query = {reviewerName: email}
        const result = await foodCollection.find(query).toArray()
        res.send(result)
    })
    app.get("/my-review/:id", async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await foodCollection.findOne(query)
        res.send(result)
    })
    app.get("/food-details/:id", async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await foodCollection.findOne(query)
        res.send(result)
    })
    app.get("/search", async(req, res)=>{
        const searchText = req.query.search;
        // const query = {foodName: searchText}
        const result = await foodCollection.find({foodName: {$regex : searchText, $options: "i"}}).toArray()
        res.send(result)
    })
    app.patch("/my-review/:id", async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const updateData = req.body
        const update = {
            $set: updateData
        }
        const result = await foodCollection.updateOne(query, update)
        res.send(result)
    })
    app.delete("/my-reviews/:id", async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await foodCollection.deleteOne(query)
        res.send(result)
    })
    app.post("/addFoods", varifyToken ,async(req, res)=>{
        const newFood = req.body
        const result = await foodCollection.insertOne(newFood)
        res.send(result)
    })
    app.post("/my-favourites", async(req, res)=>{
        const newFavorite = req.body
        const result = await favouritesCollection.insertOne(newFavorite)
        res.send(result)
    })
    app.get("/my-favourites", async(req, res)=>{
        const email = req.query.email
        const query = {reviewerName: email}
        const result = await favouritesCollection.find(query).toArray()
        res.send(result)
    })
    app.delete("/my-favourites/:id", async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await favouritesCollection.deleteOne(query)
        res.send(result)
    })
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// mongodb ......................end

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})