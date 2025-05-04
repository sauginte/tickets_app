import express from "express";
import {
  SIGN_UP,
  LOGIN,
  NEW_JWT_TOKEN,
  ALL_USERS,
  USER_BY_ID,
  ALL_USERS_WITH_TICKETS,
  USER_BY_ID_WITH_TICKETS,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import signUpSchema from "../schemas/signup.js";
import loginSchema from "../schemas/login.js";

const router = express.Router();

router.post("/users/signup", validate(signUpSchema), SIGN_UP);

router.post("/users/login", validate(loginSchema), LOGIN);

router.get("/users/getNewJwtToken", NEW_JWT_TOKEN);

router.get("/users/getAllUsers", auth, ALL_USERS);

router.get("/users/getUserById/:id", auth, USER_BY_ID);

router.get("/users/getAllUsersWithTickets", auth, ALL_USERS_WITH_TICKETS);

router.get("/users/getUserByIdWithTickets/:id", auth, USER_BY_ID_WITH_TICKETS);

export default router;
