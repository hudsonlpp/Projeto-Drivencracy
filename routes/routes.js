import { Router } from "express";
import pollPost from "../controllers/poll.controller.js";

const pollPostRoute = Router();

pollPostRoute.post("/poll", pollPost);

const routes = { pollPostRoute };

export default routes;