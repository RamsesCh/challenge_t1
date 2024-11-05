import 'dotenv/config';
import express from 'express';
import usersController from "./_controllers/users.js";
import tasksController from './_controllers/tasks.js';
import subTasksController from './_controllers/subTasks.js';
import commentsController from "./_controllers/comments.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from "jsonwebtoken";
import usersModel from './_models/users.js'

const secret = process.env.SECRET_KEY;

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(async (req, res, next) => {
  req.session = {idUser: null};
  if (req.url != "/auth" || req.url != "/logout") {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret);
        const tokenExists = await usersModel.validateToken(token);

        if (Date.now() < payload.exp) {
          if (tokenExists) {
            req.session.idUser = payload.sub;
          } else {
            return res.status(401).send({ error: "invalid token" });
          }
        } else {
          return res.status(401).send({ error: "token expired" });
        }
      }
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
  
  next()
})

app.get("/", (req, res) => {
  res.send("API REST CHALLENGE :-)");
});

app.post("/auth", usersController.login);

app.delete("/logout", usersController.logOut);

//TASKS ENDPOINTS//
app.get("/task", tasksController.allTask);

app.post("/task/create", tasksController.createTask);

app.put("/task/:id/set-completed", tasksController.setTaskCompleted);

app.put("/task/:id/delete", tasksController.deleteTask);

//SUBTASKS ENPOINTS//
app.get("/task/:id/sub-tasks", subTasksController.allSubTasks);

app.post("/sub-tasks/create", subTasksController.createSubTasks);

app.put("/sub-tasks/:idSubTask/set-completed", subTasksController.setSubTaskCompleted);

app.put("/sub-tasks/:idSubTask/delete", subTasksController.deleteSubTask);

//COMMENTS ENPOINTS//
app.get("/task/:id/comments", commentsController.allComments);

app.post("/comments/create", commentsController.createComment);

app.put("/comments/:idComment/delete", commentsController.deleteComment);

try {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
  });
} catch (e) {
  console.log(e);
}

