import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #36393f;
  color: #d6d7cf;
`;

export default class ChatView extends Component {
  render() {
    return <Container {...this.props}> Thanks guys</Container>;
  }
}
