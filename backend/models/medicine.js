import { z } from "zod";
import pool from "../controllers/dbController";
import AdminModel from "./AdminModel";

export const MedicineSchema = z.object({
  medicine_id: z.number(),
  medicine_name: z.string(),
  medicine_description: z.string(),
  medicine_category: z.string(),
});

class Medicine {
  medicine_id;
  medicine_name;
  medicine_description;
  medicine_category;

  constructor(data) {
    const validatedData = MedicineSchema.parse(data);
    this.medicine_id = validatedData.medicine_id;
    this.medicine_name = validatedData.medicine_name;
    this.medicine_description = validatedData.medicine_description;
    this.medicine_category = validatedData.medicine_category;
  }

  static async getAllmedicine() {
    try {
      const query = "select * from medicine";
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }
  static async get_category_by_name(name) {
    try {
      const query = "SELECT * FROM category WHERE name = $1";
      const values = [name];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        return null;
      }

      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error("Failed to get category by name");
    }
  }

  static async create_medicine(name, category_name, quantity) {
    try {
      let category_id;

      // Check if the category already exists
      const checkCategoryResult = await Category.get_category_by_name(
        category_name
      );

      if (checkCategoryResult) {
        // Use the existing category id
        category_id = checkCategoryResult.id;
      } else {
        // Create the category if it doesn't exist
        const createCategoryResult = await AdminModel.addCategory(
          category_name
        );
        category_id = createCategoryResult.id;
      }

      // Create the medicine
      const createMedicineQuery =
        "INSERT INTO medicine(name, category_id, quantity) VALUES($1,$2,$3) RETURNING *";
      const createMedicineValues = [name, category_id, quantity];
      const createMedicineResult = await pool.query(
        createMedicineQuery,
        createMedicineValues
      );

      return createMedicineResult.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create medicine");
    }
  }

  // functions

  static async edit_medicine(name, newName) {
    const query = "UPDATE medicine SET name = $1 WHERE name = $1";
    const values = [newName, name];
    try {
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }

  static async delete_medicine(medicine_name) {
    try {
      const query = "DELETE FROM medicine WHERE name = $1";
      const values = [medicine_name];

      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }

  async search_medicine(name) {
    try {
      const query = "select * from medicine where name= $1";
      const values = [name];
      const { rows } = await pool.query(query);
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      console.error(err);
    }
  }
}

export default Medicine;
