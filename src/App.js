import React, { Component } from 'react';
import styled from 'styled-components';

import Gallery from './Gallery';

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Gallery />
      </AppWrapper>
    );
  }
}

// limiting it to mobile size because it's supposed to be mobile-only
const AppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

export default App;
