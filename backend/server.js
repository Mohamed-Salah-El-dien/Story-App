require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const storyRoutes = require("./routes/stories");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/stories", storyRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
    //listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
