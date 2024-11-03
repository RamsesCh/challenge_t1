import configdb from "../configdb.js";

class tasksModel {

    async createTask(task){
        const tasks = configdb.db.collection('tasks');
        return await tasks.insertOne(task);
    }

}

export default new tasksModel;