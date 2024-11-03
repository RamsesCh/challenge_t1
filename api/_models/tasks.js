import { ObjectId } from "mongodb";
import configdb from "../configdb.js";

class tasksModel {
  
  async createTask(task) {
    const tasks = configdb.db.collection("tasks");
    return await tasks.insertOne(task);
  }

  async getTasks() {
    const tasks = configdb.db.collection("tasks");
    return await tasks.find({enabled: true}).toArray();
  }

  async updateTask(idTask, dataTask) {
    const tasks = configdb.db.collection("tasks");
    return await tasks.updateOne(
      { _id: new ObjectId(idTask) },
      { $set: dataTask }
    );
  }

  async logicalDeleteTask(idTask) {
    const tasks = configdb.db.collection("tasks");
    const data = {
        "enabled": false
    };

    return await tasks.updateOne(
      { _id: new ObjectId(idTask) },
      { $set: dataTask }
    );
  }

  async deleteTask(idTask) {
    const tasks = configdb.db.collection("tasks");
    return await tasks.deleteOne({ _id: new ObjectId(idTask) });
  }
}

export default new tasksModel;