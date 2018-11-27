import React, { Component } from "react";

export default class ChannelHeader extends Component {
  render() {
    const { activeChannelTopic } = this.props;

    return (
      <div className="channelHeader--container">
        <h5>{activeChannelTopic}</h5>
      </div>
    );
  }
}
