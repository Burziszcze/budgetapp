import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBudgetItem } from "../../actions/budgetActions";

class AddToBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      value: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const itemData = {
      description: this.state.description,
      value: this.state.value
    };

    this.props.addBudgetItem(itemData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled
      //   current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-to-budget">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-outline-light">
                Go Back
              </Link>
              <h3 className="text-white text-center">
                Add New Item to your budget
              </h3>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="description"
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="value"
                  name="value"
                  type="Number"
                  value={this.state.value}
                  onChange={this.onChange}
                  error={errors.value}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-outline-light btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddToBudget.propTypes = {
  addBudgetItem: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  budget: state.budget,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBudgetItem }
)(withRouter(AddToBudget));
