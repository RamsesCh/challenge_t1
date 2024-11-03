import React from 'react';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardTask from './cardTask';
import LoaderComponent from './loader';
import * as CONSTANTS from '../global/constants';

class TasksComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: false,
            error: null,
        }
    }

    async componentDidMount(){
        await this.getAllTasks();
    }

    getAllTasks = async () => {
        this.setState({
          loading: true,
        });
        try {
            let res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}`)
            let data = await res.json()
            console.log(data);
            this.setState({
                tasks: data,
                loading: false
            });
        } catch (error) {
            this.setState({
                loading: false,
                error
            })
        }
    }

    statusOk = async (value)=> {
        let dataTask = {
            completed: true
        }
        try {
            let config = {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataTask),
            };

            await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}/${value._id}`, config);
            await this.getAllTasks();
            this.setState({
              loading: false,
            });
        } catch (error) {
            this.setState({
                loading: false,
                error
            })            
        }
    }

    deleteTask = async (value)=> {
        console.log(value);
        let dataTask = {
            enabled: false
        }
        try {
            let config = {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataTask),
            };
            await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}/${value._id}`, config);
            await this.getAllTasks();
            this.setState({
              loading: false,
            });
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                error
            })            
        }
    }


    render(){
        const tasksLength = this.state.tasks.length;
        if(this.state.loading){
            return <LoaderComponent/>
        } else {
            return (
              <div className="container container-custom">
                <div className="py-3">
                  <div className="row mb-3 px-5">
                    <div className="col-12">
                      <h5 className="text-info">
                        <FontAwesomeIcon icon={faTasks} />
                        <span className="ms-3">Lista de tareas</span>
                      </h5>
                    </div>
                  </div>

                  {tasksLength ? (
                    this.state.tasks.map((task) => {
                      return (
                        <CardTask
                          key={task._id}
                          id={task._id}
                          title={task.title}
                          description={task.description}
                          completed={task.completed}
                          propStatusOK={() => this.statusOk(task)}
                          propDeleteTask={() => this.deleteTask(task)}
                        />
                      );
                    })
                  ) : (
                    <div class="alert alert-warning" role="alert">
                      No se han registrado tareas aun :(
                    </div>
                  )}
                </div>
              </div>
            );
        }
    }
}

export default TasksComponent;