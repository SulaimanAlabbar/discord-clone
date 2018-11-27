import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";

class ServerHeader extends Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.setInviteModalVisibility(true);
  }

  render() {
    const { activeServerName } = this.props;
    return (
      <div className="serverHeader--container">
        <h5>{activeServerName}</h5>
        <button
          className="serverHeader--button"
          onClick={() => this.clickHandler()}
        >
          +
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServerHeader);
