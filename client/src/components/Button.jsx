import React, { Component } from "react";
export default class Button extends Component {
  render() {
    const { buttonText } = this.props;
    return <div className="button">{buttonText}</div>;
  }
}
