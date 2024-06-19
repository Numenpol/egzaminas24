const express = require("express");
const userRouter = require("./routes/userRoutes");
const salonRouter = require("./routes/salonRoutes");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", salonRouter);

module.exports = app;