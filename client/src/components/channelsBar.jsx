import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

const Container = styled.nav`
  background-color: #2f3136;
  color: #72767d;
  user-select: none;
  ul {
    padding-top: 20px;
    list-style-type: none;
  }
  li {
    padding: 5px 20px;
    font-size: 1.2em;
    font-weight: 500;
    cursor: pointer;
  }
  .unactiveChannel:hover {
    background-color: #36393f;
    color: #b9bbba;
  }
  .activeChannel {
    background-color: #42464d;
    color: #f6f6f2;
    cursor: default;
  }
`;

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
      <Container {...this.props}>
        <ul>
          {channels.map(
            (channel, index) =>
              index === activeChannelIndex ? (
                <li key={index} className="activeChannel">
                  #{channel.name}
                </li>
              ) : (
                <li
                  key={index}
                  className="unactiveChannel"
                  onClick={() => this.clickHandler(index)}
                >
                  #{channel.name}
                </li>
              )
          )}
        </ul>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ChannelsBar);

//npm uuid
