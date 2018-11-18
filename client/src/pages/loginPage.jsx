import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "../modules/actions";
import Login from "../modules/socket/serverCom/login";
const Container = styled.section`
  display: grid;
  grid-template-columns: 88px 240px minmax(auto, 100%) 233px;
  grid-template-rows: 48px minmax(auto, 835px) 40px 52px;
  grid-template-areas:
    "ServersBar ServerHeader ChannelHeader ChannelHeader"
    "ServersBar ChannelsBar ChatView MemberList"
    "ServersBar ChannelsBar InputPanel MemberList"
    "ServersBar UserPanel InputPanel MemberList";

  .sb {
    grid-area: ServersBar;
  }
  .sh {
    grid-area: ServerHeader;
  }
  .cb {
    grid-area: ChannelsBar;
  }

  .usp {
    grid-area: UserPanel;
  }
  .ch {
    grid-area: ChannelHeader;
  }
  .cv {
    grid-area: ChatView;
    word-break: break-word;
    overflow: hidden;
  }
  .ip {
    grid-area: InputPanel;
  }
  .ml {
    grid-area: MemberList;
  }
`;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    Login(this.state.name);
  }

  render() {
    return (
      <Container {...this.props}>
        <form>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="submit"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
