import tasksModel from '../_models/tasks.js';
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

class tasksController {
  constructor() {}

  async allTask(req, res) {
    try {
      const {idUser} = req.session;

      if(!idUser){
        return res.status(401).send({ error: "authorization required" }); 
      }

      const data = await tasksModel.getTasks(idUser);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({error: err.message});
    }
  }

  async createTask(req, res) {
    try {
      const { idUser } = req.session;

      if (!idUser) {
        return res.status(401).send({ error: "authorization required" });
      }

      const dataTask = {
        ...req.body,
        id_user: idUser,
        completed: false,
        enabled: true,
      };
      const data = await tasksModel.createTask(dataTask);
      res.status(200).json(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  }

  async setTaskCompleted(req, res) {
    try {
      const { idUser } = req.session;

      if (!idUser) {
        return res.status(401).send({ error: "authorization required" });
      }

      const id = req.params;
      const data = await tasksModel.setTaskCompleted(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({error: err.message});
    }
  }

  async deleteTask(req, res) {
    try {
      const { idUser } = req.session;

      if (!idUser) {
        return res.status(401).send({ error: "authorization required" });
      }

      const id = req.params;
      const data = await tasksModel.logicalDeleteTask(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
}

export default new tasksController();