import React, { Component } from "react";
import { connect } from "react-redux";
//import ServerPage from "./pages/serverPage";
//import Loading from "./pages/loading";
import getCurrentPage from "./utils/getCurrentPage";
//Three main pages.
// 1) Home
// 2) Server
// 3) Settings

class Discord extends Component {
  render() {
    // const { connectionStatus, currentPage } = this.props;
    // console.log(this.props.connectionStatus);
    // console.log(currentPage);

    const Page = getCurrentPage();

    return <div className="discord--container">{Page}</div>;
  }
}

const mapStateToProps = state => ({
  currentPage: state.currentPage,
  socket: state.socket
});

export default connect(mapStateToProps)(Discord);
