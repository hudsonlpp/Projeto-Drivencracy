import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
await mongoClient.connect();
db = mongoClient.db("DIRETORIO");
console.log("connected to MongoDB")
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}

export const dbPoll = db.collection("poll");
export const dbChoice = db.collection("choice");
export default db

