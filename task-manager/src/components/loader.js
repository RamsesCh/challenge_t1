import React from 'react';

const LoaderComponent = () => {
    return (
        <div className="container-fluid loaderContent">
            <div className="spinner-border text-primary" role="status" style={{width:"5rem", height: "5rem"}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        
    )
}

export default LoaderComponent;