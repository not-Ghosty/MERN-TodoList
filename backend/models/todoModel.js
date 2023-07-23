const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      requried: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("todoList", todoSchema);
