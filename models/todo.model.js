const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task required!"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
