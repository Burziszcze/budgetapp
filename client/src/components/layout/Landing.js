import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing my-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-light">
              <div className="landing-logo mb-2">
                <i className="fas fa-money-check-alt logo"></i>
                BudgetApp
              </div>
              <h3 className="display-3 mb-4">Manage your personal finance</h3>
              <p className="lead">
                Create your budget and manage your expenses and revenues
                </p>
              <Link to="/register" className="btn btn-lg btn-outline-light mr-2">
                Sign Up
                </Link>
              <Link to="/login" className="btn btn-lg btn-light">
                Login
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
