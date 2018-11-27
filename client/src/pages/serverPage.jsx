import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
import ServersBar from "../components/serversBar";
import ServerHeader from "../components/serverHeader";
import ChannelsBar from "../components/channelsBar";
import UserPanel from "../components/userPanel";
import ChannelHeader from "../components/channelHeader";
import ChatView from "../components/chatView";
import MemberList from "../components/memberList";
import InputPanel from "../components/inputPanel";
import ServerCJModal from "../components/serverCJModal";
import InviteModal from "../components/inviteModal";

class ServerPage extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(view) {
    this.props.setServerModalView(view);
    this.props.setServerModalVisibility(false);
  }
  render() {
    const {
      id,
      username,
      avatar,
      servers,
      channels,
      members,
      activeServerIndex,
      activeServerName,
      activeChannelIndex,
      activeChannelName,
      activeChannelTopic,
      messages,
      serverModalVisible,
      serverModalView,
      inviteModalVisible,
      inviteLink
    } = this.props;

    return (
      <div className="serverPage--container">
        <div className="serverPage--serversBar">
          <ServersBar servers={servers} activeServerIndex={activeServerIndex} />
        </div>
        <div className="serverPage--serverHeader">
          <ServerHeader activeServerName={activeServerName} />
        </div>
        <div className="serverPage--channelsBar">
          <ChannelsBar
            channels={channels}
            activeChannelIndex={activeChannelIndex}
          />
        </div>
        <div className="serverPage--userPanel">
          <UserPanel username={username} avatar={avatar} />
        </div>
        <div className="serverPage--channelHeader">
          <ChannelHeader activeChannelTopic={activeChannelTopic} />
        </div>
        <div className="serverPage--chatView">
          <ChatView members={members} messages={messages} />
        </div>
        <div className="serverPage--inputPanel">
          <InputPanel activeChannelName={activeChannelName} />
        </div>
        <div className="serverPage--memberList">
          <MemberList members={members} />
        </div>
        {serverModalVisible && [
          <div
            key="shade"
            className="serverPage--serverCJShade"
            onClick={() => this.closeModal("")}
          />,
          <ServerCJModal
            key="modal"
            serverModalView={serverModalView}
            id={id}
          />
        ]}
        {inviteModalVisible && <InviteModal inviteLink={inviteLink} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.id,
  username: state.name,
  avatar: state.avatar,
  servers: state.servers,
  channels: state.servers[state.activeServerIndex].channels,
  members: state.servers[state.activeServerIndex].members,
  activeServerIndex: state.activeServerIndex,
  activeServerName: state.servers[state.activeServerIndex].name,
  activeChannelIndex: state.activeChannelsIndices[state.activeServerIndex],
  activeChannelName:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].name,
  activeChannelTopic:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].topic,
  messages:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].messages,
  serverModalVisible: state.serverModalVisible,
  serverModalView: state.serverModalView,
  inviteModalVisible: state.inviteModalVisible,
  inviteLink: state.servers[state.activeServerIndex].id
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerPage);
