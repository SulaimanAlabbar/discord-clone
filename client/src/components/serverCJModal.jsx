import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "../modules/actions";
import Button from "../components/Button";
import joinServer from "../modules/socket/serverCom/joinServer";
//import sendServerIcon from "../modules/socket/serverCom/sendServerIcon";
import createServer from "../modules/socket/serverCom/createServer";
import openedSJCModal from "../modules/socket/serverCom/openedSJCModal";
import ServerIconDefaultImage from "../images/serverIcon_default.png";
const axios = require("axios");
const Container = styled.section`
  position: absolute;
  width: 540px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

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
  .fff {
    display: flex;
    flex-direction: row;
  }
  .filepond {
    order: 1;
    height: 250px;
    width: 250px;
    border-radius: 100%;
    margin-top: 20px;
  }
  .servernameInput {
    order: 2;
    width: 250px;
    height: 40px;
    margin-top: 60px;
    margin-left: 20px;
  }
`;

class ServerCJModal extends Component {
  constructor() {
    super();
    this.state = {
      serverName: "",
      inviteLink: "",
      serverIcon: ServerIconDefaultImage
    };
    this.uploadInput = React.createRef();
    this.serverModalViewHandler = this.serverModalViewHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.serverIconClickHandler = this.serverIconClickHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.createServer = this.createServer.bind(this);
    this.joinServer = this.joinServer.bind(this);
  }

  componentDidMount = () => {
    openedSJCModal();
    this.props.setServerModalView("loading");
  };

  createServer(id) {
    createServer({
      memberId: id,
      serverName: this.state.serverName
    });
    this.props.setServerModalView("loading");
  }

  joinServer(id) {
    joinServer({
      memberId: id,
      inviteLink: this.state.inviteLink
    });

    this.props.setServerModalView("loading");
  }

  serverModalViewHandler(view) {
    this.props.setServerModalView(view);
    if (view === "") this.props.setServerModalVisibility(false);
  }

  handleChange(view, input) {
    if (view === "create") {
      this.setState({
        serverName: input.target.value
      });
    } else if (view === "join") {
      this.setState({
        inviteLink: input.target.value
      });
    }
  }

  serverIconClickHandler() {
    this.uploadInput.current.click();
  }

  uploadHandler(id, event) {
    if (event.target.files[0] !== undefined) {
      const file = new File(
        [event.target.files[0]],
        `${id}_${Date.now()}_${event.target.files[0].name}`
      );
      // sendServerIcon(event.target.files[0]);
      this.setState({
        serverIcon: URL.createObjectURL(event.target.files[0])
      });
      const formData = new FormData();
      formData.append("imageUpload", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      axios
        .post("/images", formData, config)
        .then(response => {
          console.log("IMAGEUPLOADED");
        })
        .catch(error => {});
    }
  }

  componentWillUnmount() {
    this.setState({
      serverName: "",
      inviteLink: ""
    });
  }
  render() {
    const { id, serverModalView } = this.props;
    const { serverName, inviteLink, serverIcon } = this.state;

    //============================================================
    //=========================CREATEJOIN=========================
    //============================================================
    if (serverModalView === "createjoin") {
      return (
        <Container {...this.props}>
          <main>CreateJoin</main>
          <footer>
            <Button
              buttonText="Create Server"
              onClick={() => this.serverModalViewHandler("create")}
            />
            <Button
              buttonText="Join Server"
              onClick={() => this.serverModalViewHandler("join")}
            />
          </footer>
        </Container>
      );
    }

    //============================================================
    //===========================CREATE===========================
    //============================================================
    if (serverModalView === "create") {
      return (
        <Container {...this.props}>
          <main>
            <div className="create">
              <h2>CREATE A SERVER</h2>

              <p>
                Enter server name and upload a server icon, server icon not
                required.
              </p>
              <div className="fff">
                <div onClick={() => this.serverIconClickHandler()}>
                  <img
                    className="serverIcon"
                    src={serverIcon}
                    alt="servericon"
                  />
                  <p>SERVER ICON </p>
                </div>
                <input
                  className="servernameInput"
                  type="text"
                  placeholder="Enter Server Name Here"
                  value={serverName}
                  onChange={e => this.handleChange("create", e)}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  name="file"
                  ref={this.uploadInput}
                  onChange={e => this.uploadHandler(id, e)}
                />
              </div>
            </div>
          </main>
          <footer>
            <Button
              buttonText="Back"
              onClick={() => this.serverModalViewHandler("createjoin")}
            />
            <Button
              buttonText="Create Server"
              onClick={() => this.createServer(id)}
            />
          </footer>
        </Container>
      );
    }

    //============================================================
    //============================JOIN============================
    //============================================================
    if (serverModalView === "join") {
      return (
        <Container {...this.props}>
          <main>
            <div className="join">
              <h2>JOIN A SERVER</h2>

              <p>Enter an instant invite below to join an existing server.</p>

              <input
                type="text"
                placeholder="Enter Invite Link Here"
                value={inviteLink}
                onChange={e => this.handleChange("join", e)}
              />
            </div>
          </main>
          <footer>
            <Button
              buttonText="Back"
              onClick={() => this.serverModalViewHandler("createjoin")}
            />
            <Button
              buttonText="Join Server"
              onClick={() => this.joinServer(id)}
            />
          </footer>
        </Container>
      );
    }

    //============================================================
    //===========================LOADING==========================
    //============================================================
    if (serverModalView === "loading") {
      return (
        <Container {...this.props}>
          <main>LOADING...</main>
          <footer />
        </Container>
      );
    }

    //============================================================
    //===========================SUCCESS==========================
    //============================================================
    if (serverModalView === "success") {
      return <Container {...this.props}>Success</Container>;
    }
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ServerCJModal);
