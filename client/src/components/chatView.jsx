import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.section`
  background-color: #36393f;
  color: #d6d7cf;

  ul {
    list-style-type: none;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      margin-right: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #2f3136;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #202225;
      border-radius: 10px;
    }
  }

  li {
    border-bottom: 2px solid #3e4147;
    margin-right: 20px;
    margin-left: 20px;
    padding: 20px 20px 20px 20px;
    font-size: 1.2em;
    font-weight: 500;
    display: flex;
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 25px;
    margin-right: 20px;
    user-select: none;
    cursor: pointer;
    transition: opacity 0.2s linear;
  }
  img:hover {
    opacity: 0.8;
  }
  .name {
    cursor: pointer;
    color: white;
  }
  .date {
    font-size: 0.7em;
    color: #585a5f;
    font-weight: bold;
    padding-left: 10px;
  }
  .flex {
    display: flex;
    flex-direction: column;
  }
  .top {
    order: 1;
    display: flex;
    vertical-align: middle;
  }
  .message {
    order: 2;
    padding-top: 5px;
    font-size: 0.9em;
  }
`;

//scroll to bottom when user sends a message
//and keep at bottom unless user scrolls

export default class ChatView extends Component {
  render() {
    const { members, messages } = this.props;
    return (
      <Container {...this.props}>
        <ul>
          {messages.map((message, index) => {
            const member = members.find(
              member => member.id === message.memberId
            );

            return (
              <li key={index}>
                <img src={member.avatar} alt="avatar" />
                <div className="flex">
                  <div className="top">
                    <h5 className="name">{member.name}</h5>
                    <p className="date">
                      {new Date(message.timestamp)
                        .toString()
                        .split(" ")
                        .slice(0, 5)
                        .join(" ")}
                    </p>
                  </div>
                  <p className="message">{message.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  }
}
