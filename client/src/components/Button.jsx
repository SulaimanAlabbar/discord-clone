import React, { Component } from "react";
import styled from "styled-components";

const BTN = styled.button`
  font-weight: 500;
  line-height: 16px;
  padding: 2px 16px;

  color: white;
  background-color: #7289da;
  height: 44px;
  width: 230px;
  display: flex;
  border: none;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  outline-width: 0;

  :hover {
    background-color: #5067b9;
  }
  :active {
    background-color: #404697;
  }
`;

export default class Button extends Component {
  render() {
    const { buttonText } = this.props;
    return <BTN {...this.props}>{buttonText}</BTN>;
  }
}
