import React, { Component } from "react";

export default class UserPanel extends Component {
  render() {
    const { username, avatar } = this.props;
    return (
      <div className="userPanel--container">
        <img className="userPanel--img" src={avatar} alt="avatar" />
        <p className="userPanel--p">{username}</p>
      </div>
    );
  }
}
