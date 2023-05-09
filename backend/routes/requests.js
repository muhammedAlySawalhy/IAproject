const express = require("express");

const { request } = require("../models/requests");
const router = express.Router();
// Route to create a new request
router.post("/request", async (req, res, next) => {
  try {
    const { medicineId, patientId } = req.body;
    const result = await request.createRequest(medicineId, patientId);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Route to update an existing request
router.put("/request/:requestId", async (req, res, next) => {
  try {
    const { medicineId, patientId } = req.body;
    const { requestId } = req.params;
    const result = await request.updateRequest(
      requestId,
      medicineId,
      patientId
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Route to delete a request
router.delete("/request/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const result = await request.deleteRequest(requestId);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Route to get all requests for a given patient
router.get("/request/:patientId", async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const result = await request.getRequestsByPatient(patientId);
    res.send(result);
  } catch (err) {
    next(err);
  }
});
router.get("/history/:patientId", async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const result = await request.getPatientRequestHistory(patientId);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
