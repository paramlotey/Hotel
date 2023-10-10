const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;

const roomRoutes = require("./Routes/roomRoute");
const userRoutes = require("./Routes/userRoute");
const bookingRoutes = require("./Routes/bookingRoute");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hotel:hotel@cluster0.an39bed.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
db();

app.use(express.json());
app.use(cors());

app.use("/", roomRoutes);
app.use("/", userRoutes);
app.use("/", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
