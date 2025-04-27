import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SIGN_UP = async (req, res) => {
  const data = req.body;

  const salt = bcrypt.genSaltSync(5);
  const passwordHash = bcrypt.hashSync(data.password, salt);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    return res.status(400).json({
      message: "Incorrect email format",
    });
  }

  const passwordRegex = /[0-9]/;
  if (!passwordRegex.test(data.password)) {
    return res.status(400).json({
      message: "Password must contain at least one number",
    });
  }

  const isFirstNameLetterLowercase = (uName) => {
    if (uName.charAt(0).toLowerCase()) {
      uName = uName.charAt(0).toUpperCase() + uName.slice(1);
    }
    return uName;
  };

  data.name = isFirstNameLetterLowercase(data.name);

  const user = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    password: passwordHash,
    moneyBalance: data.moneyBalance,
  };

  const response = await userModel(user);
  response.save();

  const token = jwt.sign({ email: user.email, userId: user.id }, "jWtT0k3n", {
    expiresIn: "2h",
  });

  res.status(200).json({
    message: "SIGN UP successfull",
    jwt: token,
  });
};

const LOGIN = async (req, res) => {
  const data = req.body;

  const user = await userModel.findOne({ email: data.email });

  if (!user) {
    return res.status(404).json({
      message: "User doesn't exists",
    });
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch) {
    return res.status(404).json({
      message: "User name or password is incorrect",
    });
  }

  const token = jwt.sign({ email: user.email, userId: user.id }, "jWtT0k3n", {
    expiresIn: "2h",
  });

  return res.status(200).json({
    message: "LOGIN successfull",
    jwt: token,
  });
};

export { SIGN_UP, LOGIN };
