import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.section`
  background-color: #2a2c31;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    height: 35px;
    width: 35px;
    border-radius: 25px;
    user-select: none;
  }
  p {
    padding-left: 10px;
    font-size: 1.1em;
    font-weight: 400;
  }
`;

export default class UserPanel extends Component {
  render() {
    const { username, avatar } = this.props;
    return (
      <Container {...this.props}>
        <img src={avatar} alt="avatar" />
        <p>{username}</p>
      </Container>
    );
  }
}
