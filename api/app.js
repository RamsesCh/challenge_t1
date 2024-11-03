import express from 'express';
import tasksController from './_controllers/tasks.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("API REST CHALLENGE :-)");
});

app.get("/tasks", tasksController.allTask);

app.post("/task", tasksController.createTask);

app.put("/:id", tasksController.updateTask);

app.delete("/:id", tasksController.deleteTask);

try {
    app.listen(8000, () => {
      console.log("Server iniciado en el puerto 8000.");
    });
} catch (e) {
    console.log(e);
}

