import tasksModel from '../_models/tasks.js';

class tasksController {
  constructor() {}

  allTask(req, res) {
    try {
      res.status(201).json({ status: "getAll-ok" });
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async createTask(req, res) {
    try {
        const data = await tasksModel.createTask(req.body);
        res.status(201).json(data)
    } catch (e) {
        res.status(500).send(e)
    }
  }

  updateTask(req, res) {
    try {
      res.status(201).json({ status: "update-ok" });
    } catch (e) {
      res.status(500).send(e);
    }
  }

  deleteTask(req, res) {
    try {
      res.status(201).json({ status: "delete-ok" });
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default new tasksController();