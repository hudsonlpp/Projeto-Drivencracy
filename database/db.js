import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("Database connected to MongoDB.");

} catch(err) {
    console.log(err.message);
}

const db = mongoClient.db();

export const poll = db.collection("poll");
export const choice = db.collection("choice");
Footer