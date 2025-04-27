import express from "express";
import { SIGN_UP, LOGIN } from "../controllers/user.js";

const router = express.Router();

router.post("/users/signup", SIGN_UP);

router.post("/users/login", LOGIN);

export default router;
