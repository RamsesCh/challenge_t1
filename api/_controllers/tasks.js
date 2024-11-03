import tasksModel from '../_models/tasks.js';

class tasksController {
  constructor() {}

  async allTask(req, res) {
    try {
      const data = await tasksModel.getTasks();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async createTask(req, res) {
    const dataTask = { ...req.body, "completed": false, "enabled": true };
    try {
        const data = await tasksModel.createTask(dataTask);
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send(e)
    }
  }

  async updateTask(req, res) {
    try {
      const id = req.params;
      const data = await tasksModel.updateTask(id, req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  async deleteTask(req, res) {
    try {
      const id = req.params;
      const data = await tasksModel.logicalDeleteTask(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default new tasksController();