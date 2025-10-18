import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as AuthModel from "../model/authModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const register = async ({ username, password, role }) => {
  const existing = await AuthModel.findUserByUsername(username);
  if (existing) throw new Error("Username already exists");

  const hashed = await bcrypt.hash(password, 10);
  return await AuthModel.createUser(username, hashed, role || "passenger");
};

export const login = async ({ username, password }) => {
  const user = await AuthModel.findUserByUsername(username);
  if (!user) throw new Error("Invalid username or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid username or password");

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role },
  };
};
