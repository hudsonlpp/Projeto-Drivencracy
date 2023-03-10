import pollSchema from "../schemas/poll.schema.js";

export function validatepoll(req, res, next) {
  const poll = req.body;

  const validation = pollSchema.validate(poll);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}