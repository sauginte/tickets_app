import Joi from "joi";
export default Joi.object({
  ticketId: Joi.string().required(),
  userId: Joi.string().required(),
});
