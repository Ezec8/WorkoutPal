const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth)

//Get all workouts
router.get("/", getWorkouts);

//Get single workout
router.get("/:id", getWorkout);

//create a workout
router.post("/", createWorkout);

//update a workout
router.patch("/:id", updateWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
