import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import choiceRouter from "./routes/choice.router.js";
import pollRouter from "./routes/poll.router.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// ROTAS:

const port = process.env.PORT || 5000;
app.use(choiceRouter);
app.use(pollRouter);
app.listen(port, () => console.log(`Server running in port: ${port}`));
