import React, { useEffect, useState } from "react";
import LoaderComponent from "./loader";
import * as CONSTANTS from "../global/constants";
import SubTaskItem from './subTaskItem.js'
import AddSubTaskComponent from "./addSubTask.js";

function SubTasksComponent (props) {
    
    const taskId = props.taskId;
    const [subTasks = [], setSubTasks] = useState();
    const [loading, setLoading] = useState();

    const getSubTasks = async () =>{
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
          await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}/${taskId}${CONSTANTS.ENDPOINTS.SUB_TASKS}`,config).then((res) => {
            if (res.ok) {
              res.json().then((json) => {
                setSubTasks(json);
                setLoading(false);
              });
            } else {
              setLoading(false);
            }
          });
        } catch (error) {
            setLoading(false);
        }
    };

    const setCompleted = async (data) => {
      setLoading(true);
      try {
        let config = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("acc_tk"),
          },
        };
        await fetch(
          `${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.SUB_TASKS}/${data._id}${CONSTANTS.ENDPOINTS.SET_COMPLETED}`,
          config
        ).then((res) => {
          if (res.ok) {
            setLoading(false);
            getSubTasks();
          } else {
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);
      }
    };

    const deleteSub = async (data) => {
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
          await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.SUB_TASKS}/${data._id}${CONSTANTS.ENDPOINTS.DELETE}`, config).then(res=> {
            if (res.ok) {
              setLoading(false);
              getSubTasks();
            }else{
              setLoading(false);
            };
          });
        } catch (error) {
            setLoading(false);
        }
    };

    const setCompleteAdd = async (data) => {
      if(data) getSubTasks();
    }

    useEffect(() => {
        getSubTasks();
    }, []);

    return (
      <div className="container-fluid">
        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="">
            <div className="row">
              <div className="col-12">
                <AddSubTaskComponent
                  taskId={taskId}
                  completeAddCall={setCompleteAdd}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <ul className="list-group w-100 rounded-1">
                  {subTasks.length
                    ? subTasks.map((subTask) => {
                        return (
                          <SubTaskItem
                            key={subTask._id}
                            subTaskInfo={subTask}
                            completeCall={setCompleted}
                            deleteCall={deleteSub}
                          />
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default SubTasksComponent;