import React, { Component } from "react";
import { connect } from "react-redux";
import ServersBar from "../components/serversBar";
import ServerHeader from "../components/serverHeader";
import ChannelsBar from "../components/channelsBar";
import UserPanel from "../components/userPanel";
import ChannelHeader from "../components/channelHeader";
import ChatView from "../components/chatView";
import MemberList from "../components/memberList";

import styled from "styled-components";

const Container = styled.section`
  display: grid;
  grid-template-columns: 88px 240px minmax(auto, 100%) 233px;
  grid-template-rows: 48px minmax(auto, 877px) 52px;
  grid-template-areas:
    "ServersBar ServerHeader ChannelHeader ChannelHeader"
    "ServersBar ChannelsBar ChatView MemberList"
    "ServersBar UserPanel ChatView MemberList";

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
  .ml {
    grid-area: MemberList;
  }
`;

class ServerView extends Component {
  render() {
    const {
      username,
      avatar,
      activeServerName,
      activeChannelTopic
    } = this.props;
    return (
      <Container {...this.props}>
        <ServersBar className="sb" />
        <ServerHeader className="sh" activeServerName={activeServerName} />
        <ChannelsBar className="cb" />
        <UserPanel className="usp" username={username} avatar={avatar} />
        <ChannelHeader className="ch" activeChannelTopic={activeChannelTopic} />
        <ChatView className="cv" />
        <MemberList className="ml" />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  avatar: state.avatar,
  activeServerName: state.servers[state.activeServerIndex].name,
  activeChannelTopic:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].topic
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(ServerView);
