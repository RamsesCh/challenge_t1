import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class AddNew extends React.Component{

    state = {
        title:'',
        completed:'0'
    };
    
    handleChange = event => {
        let partialState = {};
        partialState[event.target.name] = event.target.value;
        this.setState(partialState);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.propSubmit(this.state);
        document.getElementById("formTask").reset();
        this.setState({title: ''})
    }

    render(){
        return (
          <div className="bg-white py-3 shadow-sm rounded mx-5">
            <div className="row mb-2 px-3">
              <div className="col-12">
                <h5 className="text-info">
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <span className="ms-3">Agregar tarea</span>
                </h5>
              </div>
            </div>
            <form className="row px-3" id="formTask" onSubmit={this.handleSubmit} autoComplete="off">
                <div className="col-10">
                    <div className="form-group">
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
                <div className="col-2 text-end">
                    <button type="submit" className="btn btn-success btn-block">
                        Guardar
                    </button>
                </div>
            </form>
          </div>
        );
    }
}

export default AddNew;