const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book reviewer server running here");
});

//----------------------------- MongoDB Connection -----------------------------------
const uri = "mongodb+srv://admin:HVVHyPbqRH6OzqXT@cluster0.d2eczx7.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // const booksCollection = client.db("book_reviewer").collection("books");
    const reviewCollection = client.db("book_reviewer").collection("reviews");

    app.post("/addBooks", async (req, res) => {
      const books = req.body.array;
      console.log(books);
      // const result = await booksCollection.insertMany(books);
      // res.send(result);
    });

    app.post("/review", async (req, res) => {
      const review = req.body;
      console.log(review);
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    app.get("/reviews/:bookId", async (req, res) => {
      const id = parseInt(req.params.bookId);
      const query = { book_id: id };
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });
  } finally {

  }
}
run().catch((e) => console.error(e));

app.listen(port, () => {
  console.log("running");
});
