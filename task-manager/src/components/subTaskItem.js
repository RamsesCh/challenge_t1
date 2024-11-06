import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckCircle, faHourglassHalf} from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SubTasksComponent from "./subTasks.js";

function SubTaskItem(props) {
  const subTask = props.subTaskInfo;

  let subStatus = "badge";
  let statusSubTask = "";

  if (subTask.completed) {
    subStatus += " text-light ms-4 text-bg-success";
    statusSubTask = "Completada";
  } else {
    subStatus += " text-light ms-4 text-bg-warning";
    statusSubTask = "Pendiente";
  }

  const setCompleted = () => {
    props.completeCall(subTask);
  };

  const deleteTask = () => {
    props.deleteCall(subTask);
  };

  return (
    <li className="d-flex justify-content-between list-group-item">
      <div>
        <span className="fw-bold">{subTask.title}</span>
      </div>

      <div>
        <span className={subStatus}>{statusSubTask}</span>
      </div>

      <div>
        {!subTask.completed ? (
          <button
            type="button"
            className="btn btn-outline-success btn-sm me-3"
            onClick={setCompleted}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
        ) : (
          ""
        )}

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={deleteTask}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </li>
  );
}

export default SubTaskItem;
