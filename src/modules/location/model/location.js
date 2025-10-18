import db from "../../../config/db.js";

export const updateLocation = async (bus_id, latitude, longitude) => {
  const [rows] = await db.query("SELECT id FROM locations WHERE bus_id = ?", [
    bus_id,
  ]);
  if (rows.length > 0) {
    await db.query(
      "UPDATE locations SET latitude=?, longitude=? WHERE bus_id=?",
      [latitude, longitude, bus_id]
    );
  } else {
    await db.query(
      "INSERT INTO locations (bus_id, latitude, longitude) VALUES (?, ?, ?)",
      [bus_id, latitude, longitude]
    );
  }
};

export const getBusLocation = async (bus_id) => {
  const [rows] = await db.query(
    `SELECT l.*, b.bus_number, r.start_location, r.end_location
     FROM locations l
     JOIN buses b ON l.bus_id = b.id
     JOIN routes r ON b.route_id = r.id
     WHERE l.bus_id = ?`,
    [bus_id]
  );
  return rows[0];
};

export const getAllLiveLocations = async () => {
  const [rows] = await db.query(
    `SELECT l.*, b.bus_number, r.start_location, r.end_location
     FROM locations l
     JOIN buses b ON l.bus_id = b.id
     JOIN routes r ON b.route_id = r.id`
  );
  return rows;
};

export const addToHistory = async (bus_id, latitude, longitude) => {
  await db.query(
    "INSERT INTO location_history (bus_id, latitude, longitude) VALUES (?, ?, ?)",
    [bus_id, latitude, longitude]
  );
};

export const getBusHistory = async (bus_id, date) => {
  const [rows] = await db.query(
    `SELECT bus_id, latitude, longitude, recorded_at
     FROM location_history
     WHERE bus_id = ? AND DATE(recorded_at) = ?
     ORDER BY recorded_at ASC`,
    [bus_id, date]
  );
  return rows;
};
