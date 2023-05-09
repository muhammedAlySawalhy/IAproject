import pool from "../controllers/dbController";
import UserModel from "./UserModel";
class AdminModel extends UserModel {
  constructor(username, password, email) {
    super({ username, password, email });
  }
  //patient
  static async getPatients() {
    try {
      const query = "SELECT * FROM patient";
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }

  static async createPatient(username, password, email) {
    try {
      const query =
        "INSERT INTO patient(username, password, email) VALUES($1, $2,$3)";
      const values = [username, password, email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async editPatient(email, newPassword) {
    try {
      const query = "UPDATE patient SET  password = $2 WHERE email = $3";
      const values = [newPassword, email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async deletePatient(email) {
    try {
      const query = "DELETE FROM patient WHERE email = $1";
      const values = [email];

      await pool.query(query, values);
    } catch (err) {
      console.error(err);
    }
  }

  static async searchPatientByName(username) {
    try {
      const query = "SELECT * FROM patient WHERE username ILIKE $1";
      const values = [`${username}%`];

      const result = await pool.query(query, values);

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }

  //category
  static async addCategory(name) {
    try {
      const query = "insert into category(name) values ($1)";
      const values = [name];

      const result = await pool.query(query, values);

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }

  static async getCategoryByName(name) {
    try {
      const query = "SELECT * FROM category WHERE name = $1";
      const values = [name];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error(err);
    }
  }

  // Read all categories
  static async getCategories() {
    try {
      const query = "SELECT * FROM category";
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }

  // Update a category by name
  static async updateCategory(oldName, newName) {
    try {
      const query = "UPDATE category SET name = $1 WHERE name = $2";
      const values = [newName, oldName];
      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (err) {
      console.error(err);
    }
  }

  // Delete a category by name
  static async deleteCategory(name) {
    try {
      const query = "DELETE FROM category WHERE name = $1";
      const values = [name];
      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (err) {
      console.error(err);
    }
  }

  // Search for categories by name
  static async searchCategories(name) {
    try {
      const query = "SELECT * FROM category WHERE name ILIKE $1";
      const values = [`%${name}%`];
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error(err);
    }
  }
}
export default AdminModel;
