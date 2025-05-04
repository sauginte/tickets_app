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

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    message: "SIGN UP successfull",
    jwt_token: token,
    jwt_refresh_token: refreshToken,
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

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const refreshToken = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return res.status(200).json({
    message: "LOGIN successfull",
    jwt_token: token,
    jwt_refresh_token: refreshToken,
  });
};

const NEW_JWT_TOKEN = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      message: "Token not found. Try to login",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Token not found. Try to login",
      });
    }

    const refreshedToken = jwt.sign(
      { email: decoded.email, userId: decoded.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "LOGIN successfull",
      jwt_token: refreshedToken,
      jwt_refresh_token: req.headers.authorization,
    });
  });
};

const ALL_USERS = async (req, res) => {
  const users = await userModel.find();

  users.sort((a, b) => (a.name > b.name ? 1 : -1));

  return res.status(200).json({
    users: users,
  });
};

const USER_BY_ID = async (req, res) => {
  const user = await userModel.findOne({ id: req.params.id });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user: user,
  });
};

const ALL_USERS_WITH_TICKETS = async (req, res) => {
  const usersWithTickets = await userModel.aggregate([
    {
      $lookup: {
        from: "tickets",
        localField: "boughtTickets",
        foreignField: "id",
        as: "boughtTickets",
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        moneyBalance: 1,
        boughtTickets: {
          id: 1,
          title: 1,
          ticketPrice: 1,
          fromLocation: 1,
          toLocation: 1,
          toLocationPhotoUrl: 1,
        },
      },
    },
  ]);

  return res.status(200).json({ usersWithTickets: usersWithTickets });
};

const USER_BY_ID_WITH_TICKETS = async (req, res) => {
  const user = await userModel.findOne({ id: req.params.id });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const userWithTickets = await userModel.aggregate([
    {
      $match: { id: user.id },
    },
    {
      $lookup: {
        from: "tickets",
        localField: "boughtTickets",
        foreignField: "id",
        as: "boughtTickets",
      },
    },
    {
      $project: {
        id: 1,
        name: 1,
        email: 1,
        moneyBalance: 1,
        boughtTickets: {
          id: 1,
          title: 1,
          ticketPrice: 1,
          fromLocation: 1,
          toLocation: 1,
          toLocationPhotoUrl: 1,
        },
      },
    },
  ]);

  return res.status(200).json({ userWithTickets: userWithTickets });
};

export {
  SIGN_UP,
  LOGIN,
  NEW_JWT_TOKEN,
  ALL_USERS,
  USER_BY_ID,
  ALL_USERS_WITH_TICKETS,
  USER_BY_ID_WITH_TICKETS,
};
