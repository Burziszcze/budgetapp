import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteBudgetItem } from "../../actions/budgetActions";

class BudgetItem extends Component {
  onDeleteClick(id) {
    this.props.deleteBudgetItem(id);
  }

  render() {
    const budgetItem = this.props.BudgetItem.map(data => (
      <tr key={data._id}>
        {/* <td>{data.user}</td> */}
        <td>{data.value} PLN</td>
        <td>{data.description}</td>
        <td>
          <Moment format="DD/MM/YYYY HH:mm">{data.date}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, data._id)}
            className="btn btn-outline-primary"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="table-responsive">
        <h3 className="mb-4 font-weight-light">Current Items</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th>User</th> */}
              <th>Value</th>
              <th>Description</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>{budgetItem}</tbody>
        </table>
      </div>
    );
  }
}

BudgetItem.propTypes = {
  deleteBudgetItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBudgetItem }
)(BudgetItem);
