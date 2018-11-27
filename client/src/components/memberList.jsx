import React, { Component } from "react";

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
      <div className="memberList--container">
        <ul className="memberList--ul">
          {members.map(
            (member, index) =>
              index === selectedMemberIndex ? (
                <li
                  className="memberList--li memberList--activeMember"
                  key={index}
                >
                  <img
                    className="memberList--img"
                    src={member.avatar}
                    alt="avatar"
                  />
                  <p className="memberList--p">{member.name}</p>
                </li>
              ) : (
                <li
                  className="memberList--li memberList--unactiveMember"
                  key={index}
                  onClick={() => this.clickHandler(index)}
                >
                  <img
                    className="memberList--img"
                    src={member.avatar}
                    alt="avatar"
                  />
                  <p className="memberList--p">{member.name}</p>
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
}
