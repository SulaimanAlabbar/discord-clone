import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #2f3136;
  border-bottom: 2px #232428 solid;
  font-size: 1.5em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export default class ServerHeader extends Component {
  render() {
    const { activeServerName } = this.props;
    return (
      <Container {...this.props}>
        <h1>{activeServerName}</h1>
      </Container>
    );
  }
}
