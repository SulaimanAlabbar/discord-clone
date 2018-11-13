import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actions";
import Button from "../components/Button";

const Container = styled.section`
  position: absolute;
  width: 540px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;

  main {
    height: 342px;
    background: #36393f;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  footer {
    height: 78px;
    background: #2f3136;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .join {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .create {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .serverIcon {
    background-color: #a6b4c5;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

  .serverIcon p {
    font-size: 12px;
    padding-top: 30px;
    visibility: hidden;
  }

  .serverIcon:hover p {
    visibility: visible;
  }
  .serverIcon:hover {
    background-color: #94a3a4;
  }
`;

class ServerCJModal extends Component {
  constructor() {
    super();

    this.serverModalViewHandler = this.serverModalViewHandler.bind(this);
  }

  serverModalViewHandler(button) {
    const { serverModalView } = this.props;

    const view =
      serverModalView === "createjoin" && button === "button1"
        ? "create"
        : serverModalView === "createjoin" && button === "button2"
          ? "join"
          : serverModalView === "create" && button === "button1"
            ? "createjoin"
            : serverModalView === "create" && button === "button2"
              ? "createcreate"
              : serverModalView === "join" && button === "button1"
                ? "createjoin"
                : serverModalView === "join" && button === "button2"
                  ? "joinjoin"
                  : "";

    if (view === "createcreate" || view === "joinjoin") {
      this.props.setServerModalView("");
      this.props.setServerModalVisibility(false);
    } else this.props.setServerModalView(view);
  }
  render() {
    const { serverModalView } = this.props;
    const buttonText =
      serverModalView === "createjoin"
        ? ["Create Server", "Join Server"]
        : serverModalView === "create"
          ? ["Back", "Create Server"]
          : serverModalView === "join"
            ? ["Back", "Join Server"]
            : ["", ""];

    return (
      <Container {...this.props}>
        <main>
          {serverModalView === "createjoin" ? (
            <div className="createjoin">createjoin</div>
          ) : serverModalView === "create" ? (
            <div className="create">
              <h2>CREATE A SERVER</h2>

              <p>
                Enter server name and upload a server icon, server icon not
                required.
              </p>

              <div className="serverIcon">
                <p>SERVER ICON </p>
              </div>
              <input type="text" placeholder="Enter Server Name Here" />
            </div>
          ) : serverModalView === "join" ? (
            <div className="join">
              <h2>JOIN A SERVER</h2>

              <p>Enter an instant invite below to join an existing server.</p>

              <input type="text" placeholder="Enter Invite Link Here" />
            </div>
          ) : null}
        </main>
        <footer>
          <Button
            buttonText={buttonText[0]}
            onClick={() => this.serverModalViewHandler("button1")}
          />
          <Button
            buttonText={buttonText[1]}
            onClick={() => this.serverModalViewHandler("button2")}
          />
        </footer>
      </Container>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServerCJModal);

// class ServerCJModal extends Component {
//   constructor() {
//     super();

//     this.serverModalViewHandler = this.serverModalViewHandler.bind(this);
//   }

//   serverModalViewHandler = button => {
//     const { serverModalView } = this.props;

//     const view =
//       serverModalView === "createjoin" && button === "button1"
//         ? "create"
//         : serverModalView === "createjoin" && button === "button2"
//           ? "join"
//           : serverModalView === "create" && button === "button1"
//             ? "createjoin"
//             : serverModalView === "create" && button === "button2"
//               ? "createcreate"
//               : serverModalView === "join" && button === "button1"
//                 ? "createjoin"
//                 : serverModalView === "join" && button === "button2"
//                   ? "joinjoin"
//                   : null;

//     actionCreators.setServerModalView(view);
//   };
//   render() {
//     const { serverModalView } = this.props;
//     const buttonText =
//       serverModalView === "createjoin"
//         ? ["Create Server", "Join Server"]
//         : serverModalView === "create"
//           ? ["Back", "Create Server"]
//           : serverModalView === "join"
//             ? ["Back", "Join Server"]
//             : null;

//     return (
//       <Container ref={this.props.innerRef}>
//         <main>hello</main>
//         <footer>
//           <Button
//             buttonText={buttonText[0]}
//             onClick={() => this.serverModalViewHandler("button1")}
//           />
//           <Button
//             buttonText={buttonText[1]}
//             onClick={() => this.serverModalViewHandler("button2")}
//           />
//         </footer>
//       </Container>
//     );
//   }
// }

// const mapDispatchToProps = actionCreators;

// export default connect(
//   null,
//   mapDispatchToProps
// )(
//   React.forwardRef((props, ref) => <ServerCJModal innerRef={ref} {...props} />)
// );
