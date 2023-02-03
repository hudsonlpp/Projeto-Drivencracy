import choiceSchema from "../schemas/choice.schema.js";

export function choiceValidate(req, res, next) {
  const choice = req.body;

  const validation = choiceSchema.validate(choice);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}