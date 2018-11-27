import React, { Component } from "react";
import { connect } from "react-redux";

//scroll to bottom when user sends a message
//and keep at bottom unless user scrolls

// var scrolling = false;

// $( window ).scroll( function() {
//   scrolling = true;
// });

// setInterval( function() {
//   if ( scrolling ) {
//     scrolling = false;
//     // Do your thang!
//   }
// }, 250 );

class ChatView extends Component {
  constructor() {
    super();

    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.scrollRef.current.scrollTo({
      top: this.scrollRef.current.scrollHeight,
      behavior: "auto"
    });
  }

  componentDidUpdate = () => {
    const scrollRef = this.scrollRef.current;
    const { id, messages, smoothScroll } = this.props;
    if (!smoothScroll) {
      scrollRef.scrollTo({ top: scrollRef.scrollHeight, behavior: "auto" });
    } else if (
      scrollRef.scrollHeight - scrollRef.offsetHeight - scrollRef.scrollTop <=
        500 ||
      messages[messages.length - 1].memberId === id
    ) {
      scrollRef.scrollTo({ top: scrollRef.scrollHeight, behavior: "smooth" });
    }

    // //this.scrollRef.current.scrollIntoView({ behavior: "smooth" });
    // // console.log(this.scrollRef.current.scrollTop); //
    // // console.log(this.scrollRef.current.scrollHeight); //offsetHeight 840
    // // console.log(this.scrollRef.current.offsetHeight);
    // // this.scrollRef.current.

    // if (
    //   scrollRef.scrollHeight - scrollRef.offsetHeight - scrollRef.scrollTop <=
    //   500
    // )
    //   scrollRef.scrollTo({ top: scrollRef.scrollHeight, behavior: "smooth" });

    console.log("UPDATE");
  };

  render() {
    const { members, messages } = this.props;
    return (
      <div className="chatView--container">
        <ul className="chatView--ul" ref={this.scrollRef}>
          {messages.map((message, index) => {
            const member = members.find(
              member => member.id === message.memberId
            );

            return (
              <li className="chatView--li" key={index}>
                <img
                  className="chatView--img"
                  src={member.avatar}
                  alt="avatar"
                />
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
          <li />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeServerIndex: state.activeChannelsIndices,
  activeChannelsIndices: state.activeChannelsIndices,
  id: state.id,
  messages:
    state.servers[state.activeServerIndex].channels[
      state.activeChannelsIndices[state.activeServerIndex]
    ].messages,
  smoothScroll: state.smoothScroll
});

export default connect(
  mapStateToProps,
  null
)(ChatView);
