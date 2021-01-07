// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/rsconnect-nodejs-backend", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Port
const PORT = process.env.PORT || 5000;

// Add middleware
app.use(express.json({ extended: false }));

// Root url
app.get("/api/v1", (req, res) => res.send("Api is running..."));

// Define routes
app.use("/api/v1/images", require("./routes/images"));

// Listen request
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
