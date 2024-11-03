import 'dotenv/config';
import express from 'express';
import usersController from "./_controllers/users.js";
import tasksController from './_controllers/tasks.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("API REST CHALLENGE :-)");
});

app.post("/login", usersController.login);

app.get("/task", tasksController.allTask);

app.post("/task", tasksController.createTask);

app.put("/task/:id", tasksController.updateTask);

app.delete("/task/:id", tasksController.deleteTask);

try {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
  });
} catch (e) {
  console.log(e);
}

