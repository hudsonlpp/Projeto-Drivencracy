import express from "express";
import pollRouter from "./poll.router.js";
import choiceRouter from "./choice.router.js";

const router = express.Router();
router.use(pollRouter);
router.use(choiceRouter);

export default router;