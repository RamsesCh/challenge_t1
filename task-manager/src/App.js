import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginComponent from './components/login';
import TasksComponent from "./components/tasks";
import AddNew from "./components/addNew";
import Navbar from "./components/navbar";


function App() {
  const acc_tk = sessionStorage.getItem('acc_tk');

  return (
    <BrowserRouter>
      <div className="bg-light min-height100">
        {acc_tk ? <Navbar /> : <Navbar />}
        <div className="container pt-45">
          <Routes>
            {/* <Route path="/" exact element={<LoginComponent />} /> */}
            <Route path="/" element={<TasksComponent />} />
            <Route path="/addNew" element={<AddNew />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
