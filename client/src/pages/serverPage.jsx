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
// import PrePosedServerCJModal from "../components/serverCJModal";
import ServerCJModal from "../components/serverCJModal";
import InviteModal from "../components/inviteModal";
//import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";

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

  .shade {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

// const Shade = posed.div({
//   enter: { opacity: 1 },
//   exit: { opacity: 0 }
// });

// const ServerCJModal = posed(PrePosedServerCJModal)({
//   enter: {
//     opacity: 1,
//     delay: 50,
//     transition: {
//       default: { duration: 50 }
//     }
//   },
//   exit: {
//     opacity: 0,
//     delay: 50,
//     transition: { duration: 50 }
//   }
// });

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
      <Container {...this.props}>
        <ServersBar
          className="sb"
          servers={servers}
          activeServerIndex={activeServerIndex}
        />
        <ServerHeader className="sh" activeServerName={activeServerName} />
        <ChannelsBar
          className="cb"
          channels={channels}
          activeChannelIndex={activeChannelIndex}
        />
        <UserPanel className="usp" username={username} avatar={avatar} />
        <ChannelHeader className="ch" activeChannelTopic={activeChannelTopic} />
        <ChatView className="cv" members={members} messages={messages} />
        <InputPanel className="ip" activeChannelName={activeChannelName} />
        <MemberList className="ml" members={members} />
        {serverModalVisible && [
          <div
            key="shade"
            className="shade"
            onClick={() => this.closeModal("")}
          />,
          <ServerCJModal
            key="modal"
            serverModalView={serverModalView}
            id={id}
          />
        ]}
        {inviteModalVisible && <InviteModal inviteLink={inviteLink} />}
      </Container>
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
