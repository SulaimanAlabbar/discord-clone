import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #202225;
`;

export default class ServersBar extends Component {
  render() {
    return <Container {...this.props} />;
  }
}
