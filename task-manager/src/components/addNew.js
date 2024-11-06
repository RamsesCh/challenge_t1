import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import * as CONSTANTS from "../global/constants";
import LoaderComponent from "./loader";
import { useNavigate } from "react-router-dom";

function AddNew () {

  const [loading, setLoading] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeDesc = (event) => {
    setDescription(event.target.value);
  };

  const saveTask = async (e) => {
    setLoading(true);
    const data = {
      "title": title,
      "description": description,
    };
    try {
      let config = {
        method: "POST",
        redirect: "manual",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("acc_tk")}`,
        },
        body: JSON.stringify(data),
      };

      await fetch( `${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}${CONSTANTS.ENDPOINTS.CREATE}`, config).then((res) => {
        if (res.ok) {
          setLoading(false);
          navigate("/tasks");
        } else {
          setLoading(false);
          res.json().then((json) => {
            alert(json.error);
          });
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  return (
    <div className="container container-custom">
      {loading ? (
        <LoaderComponent />
      ) : (
      <form
        id="formTask"
        onSubmit={saveTask}
        autoComplete="off"
        className="container bg-white py-3 shadow-sm rounded mx-5"
      >
        <div className="row mb-2 px-3">
          <div className="col-12">
            <h5 className="text-info">
              <FontAwesomeIcon icon={faPlusCircle} />
              <span className="ms-3">Agregar tarea</span>
            </h5>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label>Tìtulo de la tarea</label>
              <input
                type="text"
                className="form-control"
                onChange={changeTitle}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="form-group">
              <label>Descripciòn</label>
              <textarea
                rows={5}
                type="text"
                className="form-control"
                onChange={changeDesc}
              />
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success btn-block">
              Guardar
            </button>
          </div>
        </div>
      </form>)}
    </div>
  );
}

export default AddNew;
