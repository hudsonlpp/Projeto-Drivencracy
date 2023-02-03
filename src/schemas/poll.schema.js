import joi from "joi";
import date from "@joi/date"

const joiDate=joi.extend(date)
const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joiDate.date().empty("").format("YYYY-MM-DD HH:mm"),
});

export default pollSchema;