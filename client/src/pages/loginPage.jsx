import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
import login from "../modules/socket/serverCom/login";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    login(this.state.name);
  }

  render() {
    return (
      <div className="loginPage--container">
        <form>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={e => this.handleSubmit(e)}>
            submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
