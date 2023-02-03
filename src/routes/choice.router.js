import express from "express";
import { setChoice, setVote } from "../controllers/choices.controller.js";
import { choiceValidate } from "../middlewares/validateChoice.js";

const choiceRouter = express.Router();
choiceRouter.post("/choice", choiceValidate, setChoice);
choiceRouter.post("/choice/:id/vote", setVote);

export default choiceRouter;
