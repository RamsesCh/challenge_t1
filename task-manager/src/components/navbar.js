import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTasks, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import * as CONSTANTS from "../global/constants";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "./loader";

function Navbar(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const logOut = async (e) => {
    setLoading(true);

    try {
      let config = {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("acc_tk")}`,
        },
      };

      await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.LOGOUT}`, config).then((res) => {
        setLoading(false);
        if (res.ok) {
          sessionStorage.removeItem("acc_tk");
          navigate("/");
          props.logged(false);
        } else {
          res.json().then((json) => {
            alert(json.error);
          });
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <LoaderComponent />
      ) : (
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-2">
                <Link className="nav-link" to="/tasks">
                  <FontAwesomeIcon icon={faTasks} /> Tareas
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link className="nav-link" to="/addNew">
                  <FontAwesomeIcon icon={faPlusCircle} /> Agregar tarea
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Salir
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
