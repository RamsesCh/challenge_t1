import commentsModel from "../_models/comments.js";

class commentsController {
  constructor() {}

  async allComments(req, res) {
    try {
      const idTask = req.params;
      const data = await commentsModel.getComments(idTask);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async createComment(req, res) {
    try {
      const dataComment = {
        ...req.body,
        enabled: true,
        creation_date: new Date(Date.now()),
      };
      const data = await commentsModel.createComment(dataComment);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const id = req.params;
      const data = await commentsModel.logicalDeleteComment(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

}

export default new commentsController();