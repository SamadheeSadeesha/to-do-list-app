import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res
      .status(400)
      .json({ error: true, msg: "Title and date are required." });
  }

  try {
    const newTask = new Task({ title, date, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;

  if (!title || !date) {
    return res
      .status(400)
      .json({ error: true, msg: "Title and date are required." });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, date },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ error: true, msg: "Task not found or unauthorized." });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: true, msg: "Task not found or unauthorized." });
    }

    res.json({ msg: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: true, msg: err.message });
  }
};
