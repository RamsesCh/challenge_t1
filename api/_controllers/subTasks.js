import subTasksModel from "../_models/subTasks.js";

class subTasksController {
  constructor() {}

  async allSubTasks(req, res) {
    try {
      const idTask = req.params;
      const data = await subTasksModel.getSubTasks(idTask);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async createSubTasks(req, res) {
    try {
      const dataSubTask = {
        ...req.body,
        completed: false,
        enabled: true,
        creation_date: new Date(Date.now()),
      };
      const data = await subTasksModel.createSubTask(dataSubTask);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async setSubTaskCompleted(req, res) {
    try {
      const id = req.params;
      const data = await subTasksModel.setSubTaskCompleted(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  }

  async deleteSubTask(req, res) {
    try {
      const id = req.params;
      const data = await subTasksModel.logicalDeleteSubTask(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  }
}

export default new subTasksController();
