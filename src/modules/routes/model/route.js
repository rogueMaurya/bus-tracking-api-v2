import db from "../../../config/db.js";

export const getAllRoutes = async () => {
  const [rows] = await db.query("SELECT * FROM routes");
  return rows;
};

export const getRouteById = async (id) => {
  const [rows] = await db.query("SELECT * FROM routes WHERE id = ?", [id]);
  return rows[0];
};

export const createRoute = async (route) => {
  const { name, start_location, end_location, distance_km, estimated_time } =
    route;
  const [result] = await db.query(
    "INSERT INTO routes (name, start_location, end_location, distance_km, estimated_time) VALUES (?, ?, ?, ?, ?)",
    [name, start_location, end_location, , distance_km, estimated_time]
  );
  return { id: result.insertId, ...route };
};

export const updateRoute = async (id, route) => {
  const { name, start_location, end_location, distance_km, estimated_time } =
    route;
  await db.query(
    "UPDATE routes SET name = ?, start_location = ?, end_location = ?, distance_km = ?, estimated_time = ? WHERE id = ?",
    [name, start_location, end_location, distance_km, estimated_time, id]
  );
  return { id, ...route };
};

export const deleteRoute = async (id) => {
  await db.query("DELETE FROM routes WHERE id = ?", [id]);
};
