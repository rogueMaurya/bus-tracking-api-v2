import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// === CONFIGURATION === //
const API_URL = "http://localhost:3000/api/locations";
const AUTH_TOKEN = process.env.SIMULATOR_TOKEN;
const UPDATE_INTERVAL = 8000; // 8 seconds

// Sri Lanka latitude/longitude boundaries roughly
const MIN_LAT = 5.9;
const MAX_LAT = 9.8;
const MIN_LNG = 79.7;
const MAX_LNG = 81.9;

// === HELPER FUNCTIONS === //
const randomCoordinate = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(6));

const BUS_IDS = [1, 2, 3, 4, 5];

// === MAIN LOOP === //
async function updateBusLocation(bus_id) {
  const latitude = randomCoordinate(MIN_LAT, MAX_LAT);
  const longitude = randomCoordinate(MIN_LNG, MAX_LNG);

  try {
    await axios.post(
      API_URL,
      { bus_id, latitude, longitude },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );
    console.log(`Updated bus ${bus_id} → Lat: ${latitude}, Lng: ${longitude}`);
  } catch (err) {
    console.error(
      `Failed to update bus ${bus_id}:`,
      err.response?.data || err.message
    );
  }
}

// === SIMULATION LOOP === //
function startSimulation() {
  console.log("Starting live GPS simulation...");
  setInterval(() => {
    BUS_IDS.forEach((bus_id) => updateBusLocation(bus_id));
  }, UPDATE_INTERVAL);
}

startSimulation();
