import express from "express";
import { BUY_TICKET, INSERT_TICKET } from "../controllers/ticket.js";

const router = express.Router();

router.post("/tickets", INSERT_TICKET);

router.get("/tickets", BUY_TICKET);

export default router;
