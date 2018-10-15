import React, { Component } from 'react';
import styled from 'styled-components';

export default class Tout extends Component {

  handleClick = () => {
    this.props.onToutClick(this.props.index);
  }

  render() {
    return (
      <ToutContainer onClick={this.handleClick}>
        <img src={ this.props.src } alt={ this.props.alt } />
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

  @media screen and (max-width: 460px) {
    width: calc(50% - ${toutGutter}/4);
    margin-top: calc(${toutGutter}/2);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    flex-shrink: 0;
    min-height: 100%;
    min-width: 100%;
    height: 100%;
    width: 100%;
  }
`;
