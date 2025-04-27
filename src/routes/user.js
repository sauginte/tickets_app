import express from "express";
import { SIGN_UP, LOGIN, NEW_JWT_TOKEN } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/users/signup", SIGN_UP);

router.post("/users/login", LOGIN);

router.get("/users/getNewJwtToken", NEW_JWT_TOKEN);

export default router;
