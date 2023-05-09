const express = require("express");
import pool from "../controllers/dbController";
import { z } from "zod";
import AdminModel from "../models/AdminModel";
const router = express.Router();

const categorySchema = z.object({
  name: z.string().min(1),
});

router.post("/createCategory", async (req, res, next) => {
  try {
    const { name } = categorySchema.parse(req.body);
    const result = await pool.query("INSERT INTO category (name) VALUES ($1)", [
      name,
    ]);
    res.status(201).send("Category created successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ message: error.errors });
    } else {
      next(error);
    }
  }
});
router.post("/getCategoryByName", async (req, res, next) => {
  try {
    const { name } = categorySchema.parse(req.body);
    const result = await AdminModel.getCategoryByName(name);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ message: error.errors });
    } else {
      next(error);
    }
  }
});

router.get("/allCategories", async (req, res, next) => {
  try {
    const result = await AdminModel.getCategories();
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
});
router.post("/updateCategory", async (req, res, next) => {
  const { oldName, newName } = req.body();
  try {
    const result = await AdminModel.updateCategory(oldName, newName);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
});
router.post("/deleteCategory", async (req, res, next) => {
  const { name } = req.body();
  try {
    const result = await AdminModel.deleteCategory(name);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
});
router.post("/searchCategoriesByname", async (req, res, next) => {
  const { name } = req.body();
  try {
    const result = await AdminModel.searchCategories(name);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
