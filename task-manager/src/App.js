import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginComponent from "./components/login";
import TasksComponent from "./components/tasks";
import AddNew from "./components/addNew";
import Navbar from "./components/navbar";

function App() {

  const [isLogged, setIsLogged] = useState();

  const updateLogged = async (data) => {
    setIsLogged(data);
  };

  return (
    <BrowserRouter>
      <div className="bg-light min-height100">
        {isLogged ? <Navbar logged={updateLogged} /> : ""}
        <div className="container-fluid">
          <Routes>
            <Route
              path="/"
              exact
              element={<LoginComponent logged={updateLogged} />}
            />
            <Route path="/tasks" element={<TasksComponent />} />
            <Route path="/addNew" element={<AddNew />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
