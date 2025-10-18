import db from "../../../config/db.js";

export const getAllTrips = async () => {
  const [rows] = await db.query(
    `SELECT t.*, b.bus_number, r.start_location, r.end_location
     FROM trips t
     JOIN buses b ON t.bus_id = b.id
     JOIN routes r ON t.route_id = r.id
     ORDER BY t.trip_date, t.departure_time`
  );
  return rows;
};

export const getTripById = async (id) => {
  const [rows] = await db.query(
    `SELECT t.*, b.bus_number, r.start_location, r.end_location
     FROM trips t
     JOIN buses b ON t.bus_id = b.id
     JOIN routes r ON t.route_id = r.id
     WHERE t.id = ?`,
    [id]
  );
  return rows[0];
};

export const createTrip = async (data) => {
  const { bus_id, route_id, trip_date, departure_time, arrival_time } = data;
  const [result] = await db.query(
    "INSERT INTO trips (bus_id, route_id, trip_date, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?)",
    [bus_id, route_id, trip_date, departure_time, arrival_time]
  );
  return { id: result.insertId, ...data };
};

export const updateTrip = async (id, data) => {
  const { bus_id, route_id, trip_date, departure_time, arrival_time } = data;
  await db.query(
    "UPDATE trips SET bus_id=?, route_id=?, trip_date=?, departure_time=?, arrival_time=? WHERE id=?",
    [bus_id, route_id, trip_date, departure_time, arrival_time, id]
  );
  return { id, ...data };
};

export const deleteTrip = async (id) => {
  await db.query("DELETE FROM trips WHERE id=?", [id]);
};
