import pool from "../controllers/dbController";
import { UserSchema } from "./UserModel";
import { MedicineSchema } from "./medicine";

const { EventEmitter } = require("events");
const requestEmitter = new EventEmitter();

// Function to publish request events
function publishRequestEvent(eventName, eventData) {
  requestEmitter.emit(eventName, eventData);
}

export class Request {
  constructor(patient, medicine) {
    this.patient = UserSchema.parse(patient);
    this.medicine = MedicineSchema.parse(medicine);
  }

  static async createRequest(medicineId, patientId, action) {
    try {
      const query =
        "INSERT INTO request (medicine_id, patient_id) VALUES ($1, $2) RETURNING id";
      const values = [medicineId, patientId];

      const result = await pool.query(query, values);

      // Publish "requestCreated" event
      const requestData = {
        medicine_id: medicineId,
        patient_id: patientId,
        action: action,
      };
      publishRequestEvent("requestCreated", requestData);

      return result.rows[0];
    } catch (err) {
      console.error(err);
    }
  }

  static async getPatientRequestHistory(patientId) {
    try {
      const query =
        "SELECT * FROM history WHERE event_payload ->> 'patient_id' = $1 AND event_payload ->> 'model' = 'request'";
      const values = [patientId];

      const result = await pool.query(query, values);

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }

  static async storeHistoryEvent(eventData) {
    try {
      const query =
        "INSERT INTO history (event_type, event_payload) VALUES ($1, $2)";
      const values = [eventData.action, JSON.stringify(eventData.data)];
      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }
}

// Event listener for request events

requestEmitter.on("requestCreated", (requestData) => {
  // Store request event in history model
  const historyData = {
    action: requestData.action,
    data: {
      medicine_id: requestData.medicine_id,
      patient_id: requestData.patient_id,
    },
  };
  storeHistoryEvent(historyData);
});
