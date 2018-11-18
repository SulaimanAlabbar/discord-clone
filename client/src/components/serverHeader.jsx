import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";

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

  button {
    margin-left: 50px;
    float: right;
    width: 50px;
  }
`;

class ServerHeader extends Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.setInviteModalVisibility(true);
  }

  render() {
    const { activeServerName } = this.props;
    return (
      <Container {...this.props}>
        <h5>{activeServerName}</h5>
        <button onClick={() => this.clickHandler()}>+</button>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServerHeader);
