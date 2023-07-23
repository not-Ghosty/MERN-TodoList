const mongoose = require("mongoose");
const TodoList = require("../models/todoModel");

//GET
const getAllLists = async (req, res) => {
  const user_id = req.user._id;
  const data = await TodoList.find({user_id}).sort({createdAt: -1});
  res.status(200).json(data);
};

//GET ONE
const getOne = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({error: "Invalid ID value"});
  } else {
    const data = await TodoList.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({error: "No such document is found"});
    }
  }
};
//POST
const postOne = async (req, res) => {
  const {title, duration} = req.body;
  const user_id = req.user._id;
  const empty = [];
  try {
    const data = await TodoList.create({title, duration, user_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

//PATCH
const updateOne = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({error: "Invalid Object ID"});
  }
  const data = await TodoList.findByIdAndUpdate({_id: id}, {...req.body});
  if (!data) {
    res.status(500).json({error: "No doucment is Found"});
  }
  res.status(200).json(data);
};
//DELETE
const deleteOne = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({error: "Invalid Object ID"});
  }
  const data = await TodoList.findByIdAndDelete(id);
  if (!data) {
    res.status(500).json({error: "No doucment is Found"});
  }
  res.status(200).json(data);
};
module.exports = {
  getAllLists,
  postOne,
  getOne,
  updateOne,
  deleteOne,
};
