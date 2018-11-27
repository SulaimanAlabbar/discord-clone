import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";

class ChannelsBar extends Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(index) {
    this.props.setActiveChannel(index);
  }

  render() {
    const { channels, activeChannelIndex } = this.props;
    return (
      <div className="channelsBar--container">
        <ul className="channelsBar--ul">
          {channels.map(
            (channel, index) =>
              index === activeChannelIndex ? (
                <li
                  className="channelsBar--li channelsBar--activeChannel"
                  key={index}
                >
                  #{channel.name}
                </li>
              ) : (
                <li
                  key={index}
                  className="channelsBar--li channelsBar--unactiveChannel"
                  onClick={() => this.clickHandler(index)}
                >
                  #{channel.name}
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ChannelsBar);
