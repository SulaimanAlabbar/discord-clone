import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.nav`
  background-color: #2f3136;
  color: #a4a6aa;
  user-select: none;
  cursor: pointer;

  ul {
    padding-top: 20px;
    list-style-type: none;
  }
  li {
    padding: 5px 20px;
    font-size: 1.2em;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  img {
    height: 35px;
    width: 35px;
    border-radius: 25px;
  }
  p {
    padding-left: 10px;
    font-size: 1.1em;
    font-weight: 400;
  }

  .unactiveMember:hover {
    background-color: #36393f;
    color: #ffffff;
  }
  .activeMember {
    background-color: #42464d;
    color: #f6f6f2;
    cursor: default;
  }
`;

export default class MemberList extends Component {
  constructor() {
    super();

    this.state = {
      selectedMemberIndex: -1
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      selectedMemberIndex: -1
    });
    // Also unselect when clicking away
    //Doesn't unselect when changing servers
  }

  clickHandler(index) {
    this.setState({
      selectedMemberIndex: index
    });
  }

  render() {
    const { selectedMemberIndex } = this.state;
    const { members } = this.props;
    return (
      <Container {...this.props}>
        <ul>
          {members.map(
            (member, index) =>
              index === selectedMemberIndex ? (
                <li key={index} className="activeMember">
                  <img src={member.avatar} alt="avatar" />
                  <p>{member.name}</p>
                </li>
              ) : (
                <li
                  key={index}
                  className="unactiveMember"
                  onClick={() => this.clickHandler(index)}
                >
                  <img src={member.avatar} alt="avatar" />
                  <p>{member.name}</p>
                </li>
              )
          )}
        </ul>
      </Container>
    );
  }
}

// {members.map((member, index) => (
//   <li key={index}>
//     <img src={member.avatar} alt="avatar" />
//     <p>{member.name}</p>
//   </li>
// ))}
