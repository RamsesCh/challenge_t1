import { ObjectId } from "mongodb";
import configdb from "../configdb.js";

const dbCollection = "tasks";

class tasksModel {
  
  async createTask(task) {
    const tasks = configdb.db.collection(dbCollection);
    return await tasks.insertOne(task);
  }

  async getTasks(idUser, filterStatus) {
    const tasks = configdb.db.collection(dbCollection);
    let queryFilter = {
      id_user: idUser,
      enabled: true
    };
    
    if (filterStatus != undefined){
      if (filterStatus == "true"){
        queryFilter.completed = true;
      } else {
        queryFilter.completed = false;
      }
    }
      

    return await tasks.find(queryFilter).toArray();
  }

  async setTaskCompleted(idTask) {
    const dataTask = {
      "completed": true
    }
    const tasks = configdb.db.collection(dbCollection);
    return await tasks.updateOne(
      { _id: new ObjectId(idTask) },
      { $set: dataTask }
    );
  }

  async logicalDeleteTask(idTask) {
    const tasks = configdb.db.collection(dbCollection);
    const data = {
        "enabled": false
    };

    return await tasks.updateOne({ _id: new ObjectId(idTask) }, { $set: data });
  }

  async deleteTask(idTask) {
    const tasks = configdb.db.collection("tasks");
    return await tasks.deleteOne({ _id: new ObjectId(idTask) });
  }
}

export default new tasksModel;