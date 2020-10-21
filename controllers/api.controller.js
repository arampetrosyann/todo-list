const Todo = require("../models/todo.model");
const { wrapper } = require("../middlewares/errorHandling.middleware");
const flexibleError = require("../public/javascripts/helpers/flexibleError.helper");

exports.addTodo = wrapper(async (req, res) => {
  const newTodo = await Todo.create(req.body);

  res.status(201).json({ success: true, data: newTodo });
});

exports.getTodo = wrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    throw new flexibleError(404, "Not found");
  }

  res.status(200).json({ success: true, data: todo });
});

exports.getTodos = wrapper(async (req, res) => {
  const todos = await Todo.find().sort({ created: -1 });

  res.status(200).json({ success: true, data: todos });
});

exports.updateTodo = wrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    throw new flexibleError(404, "Not found");
  }

  res.status(200).json({ success: true, data: todo });
});

exports.deleteTodo = wrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    throw new flexibleError(404, "Not found");
  }

  res.status(200).json({ success: true, data: todo });
});
