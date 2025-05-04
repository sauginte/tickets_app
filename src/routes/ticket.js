import express from "express";
import { INSERT_TICKET, BUY_TICKET } from "../controllers/ticket.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import createTicketSchema from "../schemas/ticket.js";
import buyTicketSchema from "../schemas/buyTicket.js";

const router = express.Router();

router.post("/tickets", auth, validate(createTicketSchema), INSERT_TICKET);

router.put("/tickets/buy", auth, validate(buyTicketSchema), BUY_TICKET);

export default router;
