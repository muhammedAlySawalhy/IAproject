require("esm")(module /*, options*/);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// Import and use the routes
const userRoutes = require("./routes/user");
const patientRoutes = require("./routes/patient");
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
app.use("/api/user", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/categories", categoryRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
