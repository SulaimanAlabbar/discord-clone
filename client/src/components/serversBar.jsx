import React, { Component } from "react";
//import posed from "react-pose";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";

// const Li = posed.li({
//   pressable: true,
//   hoverable: true,
//   init: {
//     scale: 1
//   },
//   hover: {
//     scale: 1.05
//   },
//   press: {
//     scale: 0.95
//   }
// });

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
      <div className="serversBar--container">
        <ul className="serversBar--ul">
          {servers.map(
            (server, index) =>
              index === activeServerIndex ? (
                <li
                  className="serversBar--li serversBar--activeServer"
                  key={index}
                >
                  <img
                    className="serversBar--img"
                    src={server.icon}
                    alt="server icon"
                  />
                </li>
              ) : (
                <li
                  className="serversBar--li serversBar--unactiveServer"
                  key={index}
                  onClick={() => this.setActiveServer(index)}
                >
                  <img
                    className="serversBar--img"
                    src={server.icon}
                    alt="server icon"
                  />
                </li>
              )
          )}
          <li
            className="serversBar--serverCJ"
            onClick={() => this.openModal("createjoin")}
          >
            +
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServersBar);
