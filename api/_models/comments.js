import { ObjectId } from "mongodb";
import configdb from "../configdb.js";

const dbCollection = "comments";

class commentsModel {
  async getComments(idTask) {
    const comments = configdb.db.collection(dbCollection);
    return await comments.find({ id_task: idTask.id, enabled: true }).toArray();
  }

  async createComment(commentData) {
    const comments = configdb.db.collection(dbCollection);
    return await comments.insertOne(commentData);
  }

  async logicalDeleteComment(idComment) {
    const data = {
      "enabled": false,
    };
    const comments = configdb.db.collection(dbCollection);

    return await comments.updateOne(
      { _id: new ObjectId(idComment.idComment) },
      { $set: data }
    );
  }

}

export default new commentsModel;