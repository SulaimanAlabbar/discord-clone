import React, { Component } from "react";
import { connect } from "react-redux";
//import ServerPage from "./pages/serverPage";
//import Loading from "./pages/loading";
import getCurrentPage from "./utils/getCurrentPage";
import styled from "styled-components";
//Three main pages.
// 1) Home
// 2) Server
// 3) Settings

const Container = styled.div``;

class Discord extends Component {
  render() {
    // const { connectionStatus, currentPage } = this.props;
    // console.log(this.props.connectionStatus);
    // console.log(currentPage);

    const Page = getCurrentPage();

    return <Container>{Page}</Container>;
  }
}

const mapStateToProps = state => ({
  currentPage: state.currentPage,
  socket: state.socket
});

export default connect(mapStateToProps)(Discord);
