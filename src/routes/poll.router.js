import express from "express";
import { setpoll, getpoll, getChoiceOptions, countVotes } from "../controllers/poll.controller.js";
import { validatepoll } from "../middlewares/validatePoll.js";

const pollRouter = express.Router();
pollRouter.post("/poll", validatepoll, setpoll);
pollRouter.get("/poll", getpoll);
pollRouter.get("/poll/:id/choice", getChoiceOptions);
pollRouter.get("/poll/:id/result", countVotes);

export default pollRouter;