import React from "react";
import { Link } from "react-router-dom";

const AddNewItem = () => {
  return (
    <div className="add-new-item">
      <Link to="/add-to-budget" className="btn btn-lg btn-outline-success">
        Add New item
      </Link>
    </div>
  );
};

export default AddNewItem;
