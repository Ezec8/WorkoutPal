const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require('./routes/user')
const mongoose = require("mongoose");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use('/api/user', userRoutes ) 

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${port} and connected to DB`);
      });
  })
  .catch((error) => {
    console.log(error);
  });


