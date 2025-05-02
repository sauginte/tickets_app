import express from "express";
import {
  SIGN_UP,
  LOGIN,
  NEW_JWT_TOKEN,
  ALL_USERS,
  USER_BY_ID,
  ALL_USERS_WITH_TICKETS,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/users/signup", SIGN_UP);

router.post("/users/login", LOGIN);

router.get("/users/getNewJwtToken", NEW_JWT_TOKEN);

router.get("/users/getAllUsers", auth, ALL_USERS);

router.get("/users/getUserById/:id", auth, USER_BY_ID);

router.get("/users/getAllUsersWithTickets", auth, ALL_USERS_WITH_TICKETS);

export default router;
