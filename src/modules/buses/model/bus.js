import db from "../../../config/db.js";

export const getAllBuses = async () => {
  const [rows] = await db.query(
    `SELECT b.*, r.start_location, r.end_location 
     FROM buses b 
     JOIN routes r ON b.route_id = r.id`
  );
  return rows;
};

export const getBusById = async (id) => {
  const [rows] = await db.query(
    `SELECT b.*, r.start_location, r.end_location 
     FROM buses b 
     JOIN routes r ON b.route_id = r.id 
     WHERE b.id = ?`,
    [id]
  );
  return rows[0];
};

export const createBus = async (data) => {
  const { bus_number, route_id, operator_name, status } = data;
  const [result] = await db.query(
    "INSERT INTO buses (bus_number, route_id, operator_name, status) VALUES (?, ?, ?, ?)",
    [bus_number, route_id, operator_name, status || "active"]
  );
  return { id: result.insertId, ...data };
};

export const updateBus = async (id, data) => {
  const { bus_number, route_id, operator_name, status } = data;
  await db.query(
    "UPDATE buses SET bus_number=?, route_id=?, operator_name=?, status=? WHERE id=?",
    [bus_number, route_id, operator_name, status, id]
  );
  return { id, ...data };
};

export const deleteBus = async (id) => {
  await db.query("DELETE FROM buses WHERE id=?", [id]);
};
