import * as AuthService from "../service/authService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await AuthService.login(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
