import React, { useState } from "react";
import * as CONSTANTS from "../global/constants";


function AddSubTaskComponent(props) {

    const idTask = props.taskId;

    const [title, setTitle] = useState();

    const changeTitle = (event) => {
      setTitle(event.target.value);
    };

    const saveSubTask = async (e) => {
        e.preventDefault();
      
        const data = {
            title: title,
            description: "descripcion",
            id_task: idTask,
        };
        try {
            let config = {
            method: "POST",
            redirect: "manual",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("acc_tk")}`,
            },
            body: JSON.stringify(data),
            };

            await fetch(
            `${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.SUB_TASKS}${CONSTANTS.ENDPOINTS.CREATE}`,
            config
            ).then((res) => {
            if (res.ok) {
                props.completeAddCall(true);
            } else {
                res.json().then((json) => {
                  alert(json.error);
                });
            }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
      <form className="py-3" onSubmit={saveSubTask} autoComplete="off">
        <div className="row">
          <div className="col-10">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Agrerar sub-tarea"
                onChange={changeTitle}
              />
            </div>
          </div>
          <div className="col-2 text-end">
            <button
              type="submit"
              className="btn btn-info text-light btn-block"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    );
}

export default AddSubTaskComponent;
