import { v4 as uuidv4 } from "uuid";
import ticketModel from "../models/ticket.js";

const INSERT_TICKET = async (req, res) => {
  const data = req.body;

  const ticket = {
    id: uuidv4(),
    title: data.title,
    ticketPrice: data.ticketPrice,
    fromLocation: data.fromLocation,
    toLocation: data.toLocation,
    toLocationPhotoUrl: data.toLocationPhotoUrl,
  };

  const response = await ticketModel(ticket);
  response.save();

  res.status(200).json({
    message: "New ticket inserted",
    ticket: ticket,
  });
};

export { INSERT_TICKET };
