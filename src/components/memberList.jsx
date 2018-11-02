import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #2f3136;
`;

export default class MemberList extends Component {
  render() {
    return <Container {...this.props} />;
  }
}
