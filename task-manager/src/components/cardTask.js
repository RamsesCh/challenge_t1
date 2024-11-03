import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTrashAlt, faCheckCircle } from '@fortawesome/free-regular-svg-icons';


class CardTask extends React.Component{
    
    render(){
        let classStatus = "badge rounded-pill";
        let statusTask = '';

        if (this.props.completed) {
            classStatus += " text-light text-bg-success";
            statusTask = 'Completada';
        } else {
            classStatus += " text-light text-bg-warning";
            statusTask = 'Pendiente';
        };
        
        return (
          <div className="row px-5 mb-3">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                    <span className='fw-bold'>
                      {this.props.title}
                    </span>
                    <br />
                    <span className='text-secondary'>
                      {this.props.description}
                    </span>
                  </h5>
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <span className={classStatus}>{statusTask}</span>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-success btn-sm me-3"
                        onClick={this.props.propStatusOK}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={this.props.propDeleteTask}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default CardTask;