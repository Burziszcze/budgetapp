import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentBudget,
  getTotalValue,
  deleteAccount,
  deleteBudget
} from "../../actions/budgetActions";

import Budget from "../budget/Budget";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getBudgetByHandle(this.props.match.params.handle);
    }
    this.props.getCurrentBudget();
    this.props.getTotalValue();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  onDeleteBudget(e) {
    this.props.deleteBudget();
  }
  render() {
    const { user } = this.props.auth;

    const { budget, loading } = this.props.budget;

    let dashboardContent;

    if (budget === null || loading) {
      dashboardContent = <div className="loader">loading...</div>;
    } else {
      // Check if logged in user has budget data
      if (Object.keys(budget).length > 0) {
        dashboardContent = (
          <div className="dashboardContent">
            <div className="row">
              <div className="col-md-12">
                <Budget />
                <button
                  onClick={this.onDeleteBudget.bind(this)}
                  className="btn btn-outline-warning"
                >
                  Delete My budget
                </button>
                <div className="text-center form-wrapper">
                  <div className="card-body">
                    <h5 className="card-title">Delete Your Account</h5>
                    <p className="card-text">
                      This operation can NOT be undone, your account will be
                      permanently deleted!
                    </p>
                    <button
                      onClick={this.onDeleteClick.bind(this)}
                      className="btn btn-outline-danger"
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no budget
        dashboardContent = (
          <div>
            <p className="lead">Welcome {user.name}</p>
            <p>
              You have not yet setup your budget profile, please add one and
              start manage your expenses
            </p>
            <Link to="/create-budget" className="btn btn-lg btn-outline-light">
              new budget
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard form-wrapper text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentBudget: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteBudget: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  total: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget,
  total: state.budget,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentBudget, deleteAccount, deleteBudget, getTotalValue }
)(Dashboard);
