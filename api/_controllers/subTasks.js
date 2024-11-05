import subTasksModel from "../_models/subTasks.js";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

class subTasksController {
  constructor() {}

  async allSubTasks(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const idTask = req.params;
        const data = await subTasksModel.getSubTasks(idTask);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async createSubTasks(req, res) {
    const dataSubTask = { ...req.body, completed: false, enabled: true };
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const data = await subTasksModel.createSubTask(dataSubTask);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async setSubTaskCompleted(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const id = req.params;
        const data = await subTasksModel.setSubTaskCompleted(id);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  }

  async deleteSubTask(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const id = req.params;
        const data = await subTasksModel.logicalDeleteSubTask(id);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  }
}

export default new subTasksController();
