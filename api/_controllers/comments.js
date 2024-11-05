import commentsModel from "../_models/comments.js";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

class commentsController {
  constructor() {}

  async allComments(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const idTask = req.params;
        const data = await commentsModel.getComments(idTask);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async createComment(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const dataComment = { ...req.body, enabled: true };
        const data = await commentsModel.createComment(dataComment);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  async deleteComment(req, res) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);

        if (Date.now() > payload.exp) {
          return res.status(401).send({ error: "token expired" });
        }

        const id = req.params;
        const data = await commentsModel.logicalDeleteComment(id);
        res.status(200).json(data);
      } else {
        res.status(401).send({ error: "authorization required" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

}

export default new commentsController();