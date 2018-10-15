import React, { Component } from 'react';
import styled from 'styled-components';

export default class Tout extends Component {

  handleClick = () => {
    this.props.onToutClick(this.props.index);
  }

  render() {
    return (
      <ToutContainer 
        className={this.props.className} 
        onClick={this.handleClick}
        style={
          {
            backgroundImage: `url(${this.props.src})`
          }
        }>
      </ToutContainer>
    );
  }
}

const toutGutter = '30px';

// padding-top size comes from aspect ratio given in PSD file
const ToutContainer = styled.div`
  width: calc(50% - ${toutGutter}/2);
  margin-top: ${toutGutter};
  padding-top: calc( ( 206 * 50% ) / 282 );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  position: relative;
  background-size: cover;

  @media screen and (max-width: 460px) {
    width: calc(50% - ${toutGutter}/4);
    margin-top: calc(${toutGutter}/2);
  }
`;
