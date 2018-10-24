import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getCurrentBudget, deleteAccount } from "../../actions/budgetActions";
import ProfileActions from "./ProfileActions";
import Profile from "../profile/Profile";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentBudget();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
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
                <Profile />
                <ProfileActions />
                <div className="text-center">
                  <div className="card-body">
                    <h5 className="card-title">Delete Your Account</h5>
                    <p className="card-text">
                      This operation can NOT be undone, your account will be
                      permanently deleted!
                    </p>
                    <button
                      onClick={this.onDeleteClick.bind(this)}
                      className="btn btn-danger"
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
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a budget, please add some info</p>
            <Link to="/create-budget" className="btn btn-lg btn-light">
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
  auth: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentBudget, deleteAccount }
)(Dashboard);
