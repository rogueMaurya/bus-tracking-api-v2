import db from "../../../config/db.js";

export const findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

export const createUser = async (username, hashedPassword, role) => {
  const [result] = await db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hashedPassword, role]
  );
  return { id: result.insertId, username, role };
};
