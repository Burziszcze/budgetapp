import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createBudget } from "../../actions/budgetActions";

class CreateBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const itemData = {
      total: this.state.total
    };

    this.props.createBudget(itemData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-budget form-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="lead text-white text-center">add your budget</h2>
              <small className="d-block pb-3 text-center">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="are you millionaire?"
                  name="total"
                  type="Number"
                  value={this.state.total}
                  onChange={this.onChange}
                  error={errors.total}
                  info="you can leave this field with sum of zero"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-outline-light btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBudget.propTypes = {
  budget: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createBudget }
)(withRouter(CreateBudget));
