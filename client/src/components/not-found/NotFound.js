import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="not-found form-wrapper">
      <Link to="/" className="btn btn-outline-light">
        Go Back
      </Link>
      <div className="row">
        <div className="col-sm-12 text-center text-white">
          <i className="fas fa-exclamation-triangle" />
          <h1 className="display-4">Page Not Found</h1>
          <p>Sorry, this page does not exist</p>
        </div>
      </div>
    </div>
  );
};
