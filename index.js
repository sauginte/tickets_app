import express from "express";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
