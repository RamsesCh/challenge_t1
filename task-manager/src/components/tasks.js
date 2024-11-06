import React, { useEffect, useState } from "react";
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardTask from './cardTask';
import LoaderComponent from './loader';
import * as CONSTANTS from '../global/constants';

function TasksComponent (){

    const [loading, setLoading] = useState();
    const [tasks = [], setTasks] = useState();
    
    const getAllTasks = async (e) => {
        setLoading(true);
        
        try {
          let config = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem('acc_tk')
            }
          };
          await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}`, config).then(res=> {
            if (res.ok) {
              res.json().then((json) => {
                setTasks(json);
                setLoading(false);
              });
            }else{
              setLoading(false);
            };
          });
        } catch (error) {
            setLoading(false);
        }
    }

    const setCompletedTask = async (data) => {
      setLoading(true);
        try {
          let config = {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem('acc_tk')
            }
          };
          await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}/${data._id}${CONSTANTS.ENDPOINTS.SET_COMPLETED}`, config).then(res=> {
            if (res.ok) {
              setLoading(false);
              getAllTasks();
            }else{
              setLoading(false);
            };
          });
        } catch (error) {
            setLoading(false);
        }
    };
    
    const deleteTask = async (data) => {
      setLoading(true);
        try {
          let config = {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem('acc_tk')
            }
          };
          await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}/${data._id}${CONSTANTS.ENDPOINTS.DELETE}`, config).then(res=> {
            if (res.ok) {
              setLoading(false);
              getAllTasks();
            }else{
              setLoading(false);
            };
          });
        } catch (error) {
            setLoading(false);
        }
    };

      useEffect(() => {
        getAllTasks();
      }, []);

    return (
      <div>
        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="container container-custom">
            <div>
              <div className="row mb-2 px-5 d-flex align-items-center">
                <div className="col-8">
                  <h5 className="text-info">
                    <FontAwesomeIcon icon={faTasks} />
                    <span className="ms-3">Lista de tareas</span>
                  </h5>
                </div>
              </div>

              {tasks.length ? (
                tasks.map((task) => {
                  return (
                    <CardTask
                      key={task._id}
                      taskData={task}
                      completeCall={setCompletedTask}
                      deleteCall={deleteTask}
                    />
                  );
                })
              ) : (
                <div className="alert alert-warning" role="alert">
                  No se han registrado tareas aun :(
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );

}

export default TasksComponent;