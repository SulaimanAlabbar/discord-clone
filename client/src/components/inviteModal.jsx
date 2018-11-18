import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
const Container = styled.section`
  background-color: blue;
  position: absolute;
  width: 540px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 342px;
`;
class InviteModal extends Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.props.setInviteModalVisibility(false);
  }
  render() {
    const { inviteLink } = this.props;
    return (
      <Container {...this.props}>
        <p>{`Invite link: ${inviteLink}`}</p>
        <button onClick={() => this.clickHandler()}>X</button>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;
export default connect(
  null,
  mapDispatchToProps
)(InviteModal);
