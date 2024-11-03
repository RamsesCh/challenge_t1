import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';



class Navbar extends React.Component {
    render(){
        return (
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark px-5">
            <Link className="navbar-brand" to="/">
              <FontAwesomeIcon icon={faReact} /> TaskManager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <FontAwesomeIcon icon={faTasks} /> Tareas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addNew">
                    <FontAwesomeIcon icon={faPlusCircle} /> Agregar tarea
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
    } 
}

export default Navbar;