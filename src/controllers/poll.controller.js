import { dbPoll, dbChoice } from "../database/db.js";
import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function setpoll(req, res) {
  const poll = req.body;
  try {
    if (!poll?.expiredAt) {
      await dbPoll.insertOne({
        title: req.body.title,
        expiredAt: dayjs(Date.now() + 2.592e9).format("YYYY-MM-DD HH:mm"),
      });
      return res.sendStatus(201);
    } else {
      await dbPoll.insertOne(poll);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getpoll(req, res) {
  try {
    const poll = await dbPoll.find().toArray();

    res.send(poll);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getChoiceOptions(req, res) {
  const id = req.params.id;

  try {
    const listChoice = await dbChoice.find({ pollId: id }).toArray();

    if (listChoice.length === 0) {
      return res.status(404).send("poll not found");
    }

    res.send(listChoice);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function countVotes(req, res) {
  const id = req.params.id;

  try {
    const choice = await dbChoice.find({ pollId: id }).toArray();
    const vote = await db.collection("vote").find({}).toArray();
    const counter = [];
    let position = 0;
    let maior = 0;

    for (let i = 0; i < choice.length; i++) {
      counter.push(0);
    }

    for (let i = 0; i < choice.length; i++) {
      for (let j = 0; j < vote.length; j++) {
        if (choice[i]._id == new ObjectId(vote[j].choiceId).toString()) {
          counter[i]++;
          if (counter[i] > maior) {
            position = i;
            maior = counter[i];
          }
        }
      }
    }

    const poll = await dbPoll.findOne({ _id: new ObjectId(id) });

    res.send({
      ...poll,
      result: {
        title: choice[position].title,
        votes: Math.max(...counter),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
