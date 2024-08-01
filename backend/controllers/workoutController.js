const express = require("express");
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET All Workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(workouts); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout does not exist" });
  }
  res.status(200).json(workout);
};

//Create a new workout
const createWorkout = async (req, res) => {
  const { title, weight, reps } = req.body;

  // error handling for form 
  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!weight) {
    emptyFields.push('weight')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please Fill in All Fields", emptyFields})
  }

  try {
    const workout = await Workout.create({ title, weight, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Workout does not exist" });
  }
  res.status(200).json({ mssg: "Workout deleted" });
};

//Update Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist" });
  }
  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedWorkout) {
    return res.status(404).json({ error: "Workout does not exist" });
  }
  res.status(200).json({ mssg: "Workout updated" });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
