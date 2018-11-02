import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #2f3136;
  border-bottom: 2px #232428 solid;
  font-size: 1.4em;
  font-weight: 500;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`;

export default class ServerHeader extends Component {
  render() {
    const { activeServerName } = this.props;
    return (
      <Container {...this.props}>
        <h5>{activeServerName}</h5>
      </Container>
    );
  }
}
