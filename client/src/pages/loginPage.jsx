import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "../modules/actions";

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
      id: "",
      name: "",
      avatar: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "id") {
      this.setState({ id: e.target.value });
    } else if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "avatar") {
      this.setState({ avatar: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id, name, avatar } = this.state;

    this.props.login({
      userId: id,
      userName: name,
      avatar: avatar
    });
  }

  render() {
    return (
      <Container {...this.props}>
        <form>
          <input
            type="text"
            name="id"
            className="input"
            placeholder={`id`}
            value={this.state.id}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="name"
            className="input"
            placeholder={`name`}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="avatar"
            className="input"
            placeholder={`avatar`}
            value={this.state.avatar}
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
