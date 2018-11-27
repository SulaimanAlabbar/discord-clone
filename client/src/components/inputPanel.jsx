import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
import addMessage from "../modules/socket/serverCom/addMessage";
const uuid = require("uuid/v4");

class InputPanel extends Component {
  constructor() {
    super();
    this.inputPanel = React.createRef();
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

  componentDidMount = () => {
    this.inputPanel.current.focus();
  };

  componentDidUpdate = () => {
    this.inputPanel.current.focus();
  };

  render() {
    const { activeChannelName, inputText } = this.props;
    return (
      <div className="inputPanel--container">
        <input
          type="text"
          className="inputPanel--input"
          placeholder={`Message #${activeChannelName}`}
          value={inputText}
          onChange={e => this.handleInputChange(e)}
          onKeyPress={e => this.handleInputChange(e)}
          ref={this.inputPanel}
        />
      </div>
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
