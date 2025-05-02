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
    isPurchased: false,
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

  const findTicket = await ticketModel.findOne({ id: reqData.ticketId });
  if (!findTicket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  if (findTicket.isPurchased) {
    return res
      .status(400)
      .json({ message: "This ticket is already purchased" });
  }

  const findUser = await userModel.findOne({ id: reqData.userId });

  if (findUser.moneyBalance < findTicket.ticketPrice) {
    return res.status(400).json({
      message: "Money balance is too low. You can't buy this ticket.",
      balance: "Your balance: " + findUser.moneyBalance,
    });
  }

  const updateUser = await userModel.findOneAndUpdate(
    { id: reqData.userId },
    {
      $inc: { moneyBalance: -findTicket.ticketPrice },
      $push: { boughtTickets: reqData.ticketId },
    },
    { new: true }
  );

  const updateTicket = await ticketModel.findOneAndUpdate(
    { id: reqData.ticketId },
    { $set: { isPurchased: true } },
    { new: true }
  );

  res.status(200).json({
    message: "You bought a ticket",
    user: updateUser,
    ticket: updateTicket,
  });
};

export { INSERT_TICKET, BUY_TICKET };
