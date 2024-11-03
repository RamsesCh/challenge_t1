import React from 'react';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardTask from './cardTask';
import LoaderComponent from './loader';
import AddNew from './addNew';
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

    handleStatusOk = async (value)=> {
        let task = {
            id: value.id,
            title: value.title,
            completed: true
        }
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }

            await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}${value.id}`, config);
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

    handleDeleteTask = async (value)=> {
        let task = {
            id: value.id
        }
        try {
            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }
            await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}${value.id}`, config);
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

    handleSubmit = async (value) => {
        this.setState({
            loading: true
        });
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }
            
            await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}`, config);
            await this.getAllTasks();
            this.props.history.push('/');
            this.setState({
              loading: false,
            });
        } catch (error) {
            this.setState({
                loading: false,
                error
            });
        }
    }

    render(){
        if(this.state.loading){
            return <LoaderComponent/>
        } else {
            return (
              <div>
                <AddNew 
                    propSubmit={this.handleSubmit}
                />
                <div className="py-3">
                  <div className="row mb-3 px-5">
                    <div className="col-12">
                      <h5 className="text-info">
                        <FontAwesomeIcon icon={faTasks} />
                        <span className="ms-3">Lista de tareas</span>
                      </h5>
                    </div>
                  </div>

                  {this.state.tasks.map((task) => {
                    return (
                      <CardTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        propStatusOK={() => this.handleStatusOk(task)}
                        propDeleteTask={() => this.handleDeleteTask(task)}
                      />
                    );
                  })}
                </div>
              </div>
            );
        }
    }
}

export default TasksComponent;