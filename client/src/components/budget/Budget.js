import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddNewItem from "../dashboard/AddNewItem";
import BudgetItem from "./BudgetItem";
import { getBudgetByHandle, getTotalValue } from "../../actions/budgetActions";

class Budget extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.budget.budget === null && this.props.budget.loading) {
      this.props.history.push("/not-found");
    }
    this.props.getTotalValue();
  }
  render() {
    const { budget, loading, total } = this.props.budget;

    let budgetContent;

    if (budget === null || loading) {
      budgetContent = <div className="loader">loading...</div>;
    } else {
      budgetContent = (
        <div>
          <div className="budget clear-padd">
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-lg-6 form-wrapper">
                <h1 className="dashboard-heading">Dashboard</h1>
                <img
                  className="rounded-circle img-fluid"
                  src={budget.user.avatar}
                  alt={budget.user.name}
                />
                <h1 className="text-center">{budget.user.name}</h1>
              </div>
              <div className="col-xs-12 col-sm-4 col-lg-6 item-align-center my-4">
                <h1 className="budget-name">your budget name:</h1>
                <h3 className="text-center">{budget.name}</h3>
                <div className="total-value form-wrapper">
                  <h1 className="display-4">Total:</h1>
                  <h1 className="budet-total">{total} PLN</h1>
                </div>
                <br />
                <AddNewItem />
              </div>
            </div>
            <br />
            <BudgetItem BudgetItem={budget.data} />
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
  budget: PropTypes.object.isRequired,
  total: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget,
  total: state.budget
});

export default connect(
  mapStateToProps,
  {
    getBudgetByHandle,
    getTotalValue
  }
)(Budget);
