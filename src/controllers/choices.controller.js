import { dbPoll, dbChoice} from "../database/db.js";
import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function setChoice(req, res) {
  
  const choice = {
    title: req.body.title,
    pollId: req.body.pollId
  }

  try {
    const searchpoll = await dbPoll.findOne({ _id: new ObjectId(choice.pollId) });

    if(!searchpoll) {
      return res.status(404).send("Enquete não existente");
    }
    const expiredDate = searchpoll.expiredAt

    const isExpired = dayjs().isAfter(expiredDate, "days");
    if(isExpired) {
      return res.status(403).send("Enquete expirada")
    }

    const searchChoice = await dbChoice.findOne({ title: choice.title });

    if(searchChoice) {
      return res.status(409).send("Opção de voto já existente");
    }

    await dbChoice.insertOne(choice);

    res.status(201).send(choice);
  } catch(error){
    res.status(500).send(error.message);
  }
}

export async function setVote(req, res) {
  const id = req.params.id;

  const vote = {
    createdAt: dayjs().format("YYYY-MM-DD HH:mm"), 
	  choiceId: id
  }

  try {
    const isChoice = await dbChoice.findOne({ _id: new ObjectId(id)} );

    if(!isChoice) {
      return res.status(404).send("Opção de voto não existente")
    }

    const searchpoll = await dbPoll.findOne({ _id: new ObjectId(isChoice.pollId) });

    const expiredDate = searchpoll.expiredAt

    const isExpired = dayjs().isAfter(expiredDate, "days");
    if(isExpired) {
      return res.status(403).send("Enquete expirada")
    }

    await db.collection("vote").insertOne(vote);

    res.sendStatus(201);
  } catch(error) {
    console.log(error)
    res.status(500).send(error.message);
  }
}