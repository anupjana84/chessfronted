import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    --gap: 3px;
    --clr: #ffffff;
    --height: 12px;
    width: 40px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
  }

  .spinner span {
    background: var(--clr);
    width: 3px;
    height: var(--height);
    animation: grow 1s ease-in-out infinite;
  }

  .spinner span:nth-child(2) {
    animation: grow 1s ease-in-out 0.15s infinite;
  }

  .spinner span:nth-child(3) {
    animation: grow 1s ease-in-out 0.3s infinite;
  }

  .spinner span:nth-child(4) {
    animation: grow 1s ease-in-out 0.475s infinite;
  }

  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(1.5);
    }
  }
`;

export default Loader;
