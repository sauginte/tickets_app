import express from "express";
import { INSERT_TICKET, BUY_TICKET } from "../controllers/ticket.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/tickets", auth, INSERT_TICKET);

router.post("/tickets/buy", BUY_TICKET);

export default router;
