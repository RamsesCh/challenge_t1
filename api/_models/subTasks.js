import { ObjectId } from "mongodb";
import configdb from "../configdb.js";

const dbCollection = "sub_tasks";

class subTasksModel {
  async getSubTasks(idTask) {
    const tasks = configdb.db.collection(dbCollection);
    return await tasks.find({ id_task: idTask.id, enabled: true }).toArray();
  }

  async createSubTask(subTaskData) {
    const tasks = configdb.db.collection(dbCollection);
    return await tasks.insertOne(subTaskData);
  }

  async setSubTaskCompleted(idSubTask) {
    const dataTask = {
      "completed": true,
    };
    const subTasks = configdb.db.collection(dbCollection);
    return await subTasks.updateOne(
      { _id: new ObjectId(idSubTask.idSubTask) },
      { $set: dataTask }
    );
  }

  async logicalDeleteSubTask(idSubTask) {
    const data = {
      "enabled": false,
    };
    const subTasks = configdb.db.collection(dbCollection);

    return await subTasks.updateOne(
      { _id: new ObjectId(idSubTask.idSubTask) },
      { $set: data }
    );
  }
}

export default new subTasksModel();
