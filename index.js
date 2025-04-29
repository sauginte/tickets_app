import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import usersRouter from "./src/routes/user.js";
import ticketsRouter from "./src/routes/ticket.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(usersRouter);
app.use(ticketsRouter);

app.listen(process.env.PORT);
