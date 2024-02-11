const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
    "mongodb+srv://sanduncooray000:w6AnoWeyHiMg7P7X@cluster0.9dlulca.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );

        //create a collection
        const booksCollection = client.db("BookInventory").collection("books");

        //insert a new book
        app.post("/upload-book", async (req, res) => {
            try {
                const data = req.body;
                data.isRead = false;
                const result = await booksCollection.insertOne(data);
                res.send(result);
            } catch (error) {
                console.error("Error uploading book:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });

        //get all books
        app.get("/view-book", async (req, res) => {
            try {
                const books = await booksCollection.find().toArray();
                res.send(books);
            } catch (error) {
                console.error("Error fetching books:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });

        //get single book
        app.get("/get-book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const book = await booksCollection.findOne(filter);        
                res.send(book);
            } catch (error) {
                console.error("Error fetching a single book:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });

        //update a book
        app.patch("/update-book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const data = req.body;
                const { _id, ...updatedFields } = data;
                const filter = { _id: new ObjectId(id) };
                const updateBook = {
                    $set: {
                        ...updatedFields
                    }
                };
                const options = { upsert: true };

                const results = await booksCollection.updateOne(filter, updateBook, options);
                res.send(results);

            } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });

        //delete a book
        app.delete("/delete-book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const result = await booksCollection.deleteOne(filter);
                res.send(result);
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });


        // mark a book as read
        app.patch("/mark-as-read/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const update = {
                    $set: {
                        isRead: true
                    }
                };
                const options = { upsert: false };
                const result = await booksCollection.updateOne(filter, update, options);
                res.send(result);
            } catch (error) {
                console.error("Error marking book as read:", error);
                res.status(500).send({ success: false, message: "Internal server error." });
            }
        });


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Book Heaven app listening on port ${port}`);
});
