import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
import addMessage from "../modules/socket/serverCom/addMessage";
const uuid = require("uuid/v4");

const Container = styled.section`
  background-color: #36393f;
  color: #d6d7cf;
  border-top: 2px solid #3e4147;
  margin-right: 20px;
  margin-left: 20px;

  .input {
    margin-top: 20px;
    background-color: #484c52;
    height: 45px;
    width: 1280px;
    color: #ffffff;
    border: 0;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 1em;
  }
  .input:focus {
    outline-width: 0;
  }
`;

class InputPanel extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    if (e.key === "Enter") {
      addMessage({
        id: uuid(),
        timestamp: new Date(),
        content: e.target.value,
        memberId: this.props.memberId,
        channelId: this.props.channelId,
        serverId: this.props.serverId
      });

      this.props.setInputPanelText("");
    } else this.props.setInputPanelText(e.target.value);
  }

  render() {
    const { activeChannelName, inputText } = this.props;
    return (
      <Container {...this.props}>
        <input
          type="text"
          className="input"
          placeholder={`Message #${activeChannelName}`}
          value={inputText}
          onChange={e => this.handleInputChange(e)}
          onKeyPress={e => this.handleInputChange(e)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  inputText:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].inputText,
  memberId: state.id,
  channelId:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].id,
  serverId: state.servers[state.activeServerIndex].id
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputPanel);
