import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getBudgetByHandle } from "../../actions/budgetActions";

class Budget extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.budget.budget === null && this.props.budget.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { budget, loading } = this.props.budget;
    let budgetContent;

    if (budget === null || loading) {
      budgetContent = <div className="loader">loading...</div>;
    } else {
      budgetContent = (
        <div>
          <div className="budget">
            <img
              className="rounded-circle"
              src={budget.user.avatar}
              alt={budget.user.name}
            />
            <h3 className="budget-name">your budget name: {budget.name}</h3>
            <h1 className="text-center">{budget.user.name}</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="budget">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{budgetContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Budget.propTypes = {
  getBudgetByHandle: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget
});

export default connect(
  mapStateToProps,
  { getBudgetByHandle }
)(Budget);
