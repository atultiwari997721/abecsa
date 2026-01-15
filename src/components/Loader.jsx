import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

// Constructed "A" using Google's 4 colors
// Blue: Left leg
// Red: Top cap / Upper Right
// Yellow: Crossbar
// Green: Lower Right
const GoogleStyleA = () => (
  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue: Left diagonal up to top */}
    <path 
      d="M20 90 L50 20" 
      stroke="#4285F4" 
      strokeWidth="14" 
      strokeLinecap="round" 
    />
    
    {/* Red: Right diagonal top section */}
    <path 
      d="M50 20 L65 55" 
      stroke="#EA4335" 
      strokeWidth="14" 
      strokeLinecap="round" 
    />
    
    {/* Yellow: Crossbar - slightly curved to look friendly/logo-like */}
    <path 
      d="M32 58 L72 58" 
      stroke="#FBBC05" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />

    {/* Green: Right diagonal bottom section */}
    <path 
      d="M65 55 L80 90" 
      stroke="#34A853" 
      strokeWidth="14" 
      strokeLinecap="round" 
    />
  </svg>
);

const LogoWrapper = styled.div`
  animation: ${pulse} 1.5s ease-in-out infinite;
  margin-bottom: 20px;
`;

const LoadingBar = styled.div`
  width: 150px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    background: #4285F4;
    border-radius: 2px;
    animation: moveBar 1.5s infinite linear;
  }

  @keyframes moveBar {
    0% { left: -30%; }
    100% { left: 100%; }
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LogoWrapper>
        <GoogleStyleA />
      </LogoWrapper>
      <LoadingBar />
    </LoaderContainer>
  );
};

export default Loader;
