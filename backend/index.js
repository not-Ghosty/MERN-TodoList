const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//env
const port = process.env.PORT;
const URI = process.env.MONGO_URI;

//middleware
app.use(express.json());
app.use("/api/todolist", todoRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
