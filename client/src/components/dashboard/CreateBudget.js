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
      name: "",
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

    const budgetData = {
      name: this.state.name
    };

    this.props.createBudget(budgetData, this.props.history);
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
              <h1 className=" lead text-center">add your budget</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="type your budget name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
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
