import pool from "../controllers/dbController";
import UserModel from "./UserModel";
import { z } from "zod";
const patientSchema = z.object({
  medicine: z.string().array(),
});
class Patient extends UserModel {
  constructor(username, password = "123", email, medicine = []) {
    super({ username, password, email });
    this.medicine = patientSchema.parse(medicine);
  }

  static async addMedicine(medicine, patient_id) {
    try {
      await pool.query(
        "INSERT INTO patient (medicine) where patient.id =$1 VALUES ($2)",
        [patient_id, medicine]
      );

      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to add medicine");
    }
  }

  static async deleteMedicine(medicine, patient_id) {
    try {
      await pool.query("delete from patient where patient.id =$1 values($2)", [
        patient_id,
        medicine,
      ]);

      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to delete medicine");
    }
  }
}

export default Patient;
