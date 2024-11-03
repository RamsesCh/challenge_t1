import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import TasksComponent from "./components/tasks";
import AddNew from "./components/addNew";
import Navbar from "./components/navbar";


function App() {
  return (
    <BrowserRouter>
      <div className="bg-light min-height100">
        <Navbar />
        <div className="container container-custom pt-45">
          <Routes>
            <Route path="/" exact element={<TasksComponent />} />
            <Route path="/addNew" element={<AddNew />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
