import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

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
  li {
    padding: 5px 20px 5px 15px;
    font-size: 1.2em;
    font-weight: 500;
    cursor: pointer;
    border-left: 5px solid rgba(255, 255, 255, 0.001);
  }
  .unactiveServer:hover {
  }
  .activeServer {
    border-left: 5px solid white;
  }
`;

class ServersBar extends Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(index) {
    this.props.setActiveServer(index);
  }

  render() {
    const { servers, activeServerIndex } = this.props;
    return (
      <Container {...this.props}>
        <ul>
          {servers.map(
            (server, index) =>
              index === activeServerIndex ? (
                <li key={index} className="activeServer">
                  <img src={server.icon} alt="server icon" />
                </li>
              ) : (
                <li
                  key={index}
                  className="unactiveServer"
                  onClick={() => this.clickHandler(index)}
                >
                  <img src={server.icon} alt="server icon" />
                </li>
              )
          )}
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
