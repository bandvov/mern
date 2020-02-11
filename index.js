const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("port") || 5000;
const mongoose = require("mongoose");

app.use(express.json())

app.use("/api",require('./routes/authRoutes'));

async function start() {
  try {
    mongoose.connect(config.get("mongoUrl"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {});
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
}
start();
