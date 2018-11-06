import React, { Component } from "react";
import { connect } from "react-redux";
import ServerPage from "./pages/serverPage";
import styled from "styled-components";
//Three main pages.
// 1) Home
// 2) Server
// 3) Settings

const Container = styled.div``;

class Discord extends Component {
  render() {
    //console.log(this.props);
    return (
      <Container>
        <ServerPage />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeServer: state
});

export default connect(mapStateToProps)(Discord);
