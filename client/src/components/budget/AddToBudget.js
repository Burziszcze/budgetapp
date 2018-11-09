import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
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
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-to-budget form-wrapper">
        <Link to="/dashboard" className="btn btn-outline-light">
          Go Back
        </Link>
        <h1 className="display-4 text-center">Add new Item</h1>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.onSubmit}>
              <div className="form-row ">
                <div className="col-sm-7">
                  <TextFieldGroup
                    placeholder="description"
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />
                </div>
                <div className="col-sm-3">
                  <TextFieldGroup
                    placeholder="value"
                    name="value"
                    type="Number"
                    value={this.state.value}
                    onChange={this.onChange}
                    error={errors.value}
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-lg btn-outline-success"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddToBudget.propTypes = {
  addBudgetItem: PropTypes.func.isRequired,
  total: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  total: state.budget,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBudgetItem }
)(withRouter(AddToBudget));
