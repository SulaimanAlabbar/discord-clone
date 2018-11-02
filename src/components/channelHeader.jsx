import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #36393f;
  border-bottom: 2px #292b2f solid;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  padding-left: 10px;
  user-select: none;
`;

export default class ChannelHeader extends Component {
  render() {
    const { activeChannelTopic } = this.props;

    return (
      <Container {...this.props}>
        <h3>{activeChannelTopic}</h3>
      </Container>
    );
  }
}
