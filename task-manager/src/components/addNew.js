import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import * as CONSTANTS from "../global/constants";

class AddNew extends React.Component{

    state = {
        title:"",
        description: "",
    };
    
    handleChange = event => {
        let partialState = {};
        partialState[event.target.name] = event.target.value;
        this.setState(partialState);
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        let config = {
          method: "POST",
          redirect: "manual",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        };
          
        await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.TASKS}`, config).then(res=> {
          if(res.ok){
            console.log(res);
          }
        });
        
      } catch (error) {
        console.log(error)
        this.setState({
            loading: false,
            error
        });
      }
    }

    render(){
        return (
          <div className="container container-custom">
            <form
              id="formTask"
              onSubmit={this.handleSubmit}
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
                      id="InputTitulo"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
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
                      id="InputDesc"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
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
            </form>
          </div>
        );
    }
}

export default AddNew;