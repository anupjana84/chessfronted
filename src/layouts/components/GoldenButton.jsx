import React from "react";
import styled from "styled-components";

const Button = ({ text }) => {
  return (
    <StyledWrapper>
      <button className="button">
        <span>{text}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    background-color: #03543f;
    padding: 8px 25px;
    border: solid 2px gold;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: 0.1s linear 0.1s;
  }
  .button span {
    color: gold;
    font-weight: 500;
    letter-spacing: 2px;
    position: relative;
    z-index: 2;
    transition: 0.2s linear 0.1s;
  }
  .button::after {
    display: block;
    content: "";

    background-color: #faca15;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: absolute;
    top: 100%;
    transform: translateX(-40%);
    transition: 0.2s linear 0.1s;
    z-index: 1;
  }
  .button:hover {
    box-shadow: 0px 0px 20px gold;
  }
  .button:hover::after {
    top: -50%;
  }
  .button:hover span {
    color: #03543f;
    letter-spacing: 4px;
  }
`;

export default Button;
