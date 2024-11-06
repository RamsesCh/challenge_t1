import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTrashAlt, faHourglassHalf, faCircleCheck  } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import SubTasksComponent from "./subTasks.js";


function CardTask (props){

  const [dropDown, setDropDown] = useState(false);

  const openCloseDrop = () => {
    setDropDown(!dropDown)
  }

  const taskInfo = props.taskData;

  const setCompleted = () => {
    props.completeCall(taskInfo);
  };
  
  const deleteTask = () => {
    props.deleteCall(taskInfo);
  };
    

  return (
    <div className="row px-5 mb-3">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row d-flex align-items-center mb-3">
              <div className="col-8">
                <h5 className="card-title m-0">
                  <FontAwesomeIcon icon={faCalendar} className="me-2" />
                  <span className="fw-bold">{taskInfo.title}</span>
                  <br />
                  <span>{taskInfo.description}</span>
                </h5>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <span className="me-4">
                  <FontAwesomeIcon
                    icon={taskInfo.completed ? faCircleCheck : faHourglassHalf}
                    className={
                      taskInfo.completed ? "text-success me-2" : "me-2"
                    }
                  />
                  {taskInfo.completed ? "Completada" : "Pendiente"}
                </span>
                <div>
                  <Dropdown isOpen={dropDown} toggle={openCloseDrop}>
                    <DropdownToggle color="light" caret>
                      Mas
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={setCompleted}>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-success me-2"
                        />
                        Completada
                      </DropdownItem>
                      <DropdownItem
                        onClick={deleteTask}
                        className="text-danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <SubTasksComponent taskId={taskInfo._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTask;