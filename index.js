const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB ", err));

app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log("Server running on port " + PORT));