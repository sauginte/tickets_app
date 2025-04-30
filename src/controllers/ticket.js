import { v4 as uuidv4 } from "uuid";
import ticketModel from "../models/ticket.js";
import userModel from "../models/user.js";

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

const BUY_TICKET = async (req, res) => {
  const reqData = req.body;

  const response = await userModel.findOneAndUpdate(
    { id: reqData.userId },
    { $push: { boughtTickets: reqData.ticketId } },
    { new: true }
  );

  res.status(200).json({
    message: "You bought a ticket",
    user: response,
  });
};

export { INSERT_TICKET, BUY_TICKET };
