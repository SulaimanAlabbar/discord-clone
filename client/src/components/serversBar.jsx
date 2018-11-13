import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";

const Container = styled.nav`
  background-color: #202225;
  user-select: none;
  box-sizing: border-box;

  img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }

  ul {
    padding-top: 20px;
    list-style-type: none;
  }
  /* li {
    padding: 5px 20px 5px 15px;
    font-size: 1.2em;
    font-weight: 500;
    cursor: pointer;
    border-left: 5px solid rgba(255, 255, 255, 0.001);
  } */
  .unactiveServer {
    padding: 5px 20px 5px 15px;
    font-size: 1.2em;
    font-weight: 500;
    cursor: pointer;
    border-left: 5px solid rgba(255, 255, 255, 0.001);
  }
  .unactiveServer:hover {
  }

  .activeServer {
    padding: 5px 20px 5px 15px;
    font-size: 1.2em;
    font-weight: 500;
    cursor: pointer;
    border-left: 5px solid rgba(255, 255, 255, 0.001);
    border-left: 5px solid white;
  }
  .serverCJ {
    /* padding: 5px 20px 5px 15px;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    border: 1px dashed white; */
    display: block;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 2px dashed white;
    text-align: center;
    font-size: 46px;
    margin-left: 20px;
    margin-top: 10px;
  }
`;

const Li = posed.li({
  pressable: true,
  hoverable: true,
  init: {
    scale: 1
  },
  hover: {
    scale: 1.05
  },
  press: {
    scale: 0.95
  }
});

class ServersBar extends Component {
  constructor() {
    super();

    this.setActiveServer = this.setActiveServer.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  setActiveServer(index) {
    this.props.setActiveServer(index);
  }
  openModal(view) {
    this.props.setServerModalView(view);
    this.props.setServerModalVisibility(true);
  }

  render() {
    const { servers, activeServerIndex } = this.props;

    return (
      <Container {...this.props}>
        <ul>
          {servers.map(
            (server, index) =>
              index === activeServerIndex ? (
                <Li key={index} className="activeServer">
                  <img src={server.icon} alt="server icon" />
                </Li>
              ) : (
                <Li
                  key={index}
                  className="unactiveServer"
                  onClick={() => this.setActiveServer(index)}
                >
                  <img src={server.icon} alt="server icon" />
                </Li>
              )
          )}
          <Li onClick={() => this.openModal("createjoin")} className="serverCJ">
            +
          </Li>
        </ul>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServersBar);
