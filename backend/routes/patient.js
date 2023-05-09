const express = require("express");
const { z } = require("zod");

import medicine from "../models/medicine";
import patientModel from "../models/patientModel";
const router = express.Router();

// zod schema for add_medicine request body

// router.post("/medicine", async (req, res) => {
//   const result = await medicine.getAllmedicine();
//   res.send(result);
// });

router.post("/add_medicine", async (req, res) => {
  try {
    // validate the request body against the schema
    addMedicineSchema.parse(req.body);

    const { medicineName, patient_id } = req.body;

    const result = await patientModel.addMedicine(medicineName, patient_id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Invalid request body." });
  }
});

// zod schema for delete_medicine request body

router.post("/delete_medicine", async (req, res) => {
  try {
    // validate the request body against the schema
    deleteMedicineSchema.parse(req.body);

    const { medicineName, patient_id } = req.body;

    const result = await patientModel.deleteMedicine(medicineName, patient_id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Invalid request body." });
  }
});

// zod schema for request_help request body

router.post("/search_medicine", async (req, res) => {
  try {
    // validate the request body against the schema
    searchMedicineSchema.parse(req.body);

    const { medicine_name } = req.body;
    const result = await medicine.search_medicine(medicine_name);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Invalid request body." });
  }
});

module.exports = router;
