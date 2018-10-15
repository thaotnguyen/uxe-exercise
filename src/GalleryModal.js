import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

export default class GalleryModal extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      startingTouchLocation: 0,
      currentTouchLocation: 0,
      showControls: true, 
    };
  }

  handleTouchStart = (evt) => {
    this.setState({
      startingTouchLocation: evt.touches[0].clientX,
      currentTouchLocation: evt.touches[0].clientX,
    })
  }

  handleTouchMove = (evt) => {
    const touchDistance = evt.targetTouches[0].clientX - this.state.startingTouchLocation;
    this.setState({
      currentTouchLocation: evt.targetTouches[0].clientX,
    })
    document.querySelector('.gallery__modal-body').style.transform =
      `translateX(calc(${this.props.slide * -100}vw + ${touchDistance}px))`;
  }

  handleTouchEnd = (evt) => {
    const modalBody = document.querySelector('.gallery__modal-body');
    modalBody.style.transform = '';
    modalBody.style.transition = 'transform 0.3s';
    setTimeout(() => {
      modalBody.style.transition = 'none';
    }, 300);
    const touchDistance = this.state.currentTouchLocation - this.state.startingTouchLocation;
    if (touchDistance  > 10 && this.props.slide > 0) {
      this.props.prevSlide();
    } else if (touchDistance < -10 && this.props.slide < this.props.images.length - 1) {
      this.props.nextSlide();
    }
    if (Math.abs(touchDistance) < 2) {
      this.toggleControls();
    } 
  }

  closeModal = (evt) => {
    evt.stopPropagation();
    this.props.closeModal();
  }

  toggleControls = () => {
    this.setState((prevState) => {
      return {
        showControls: !prevState.showControls,
      }
    })
  }

  render() {
    return (
      <GalleryModalContainer 
        top={$(window).scrollTop()}
        {...this.props}>
        <ModalHeader className='gallery__modal-header' showControls={this.state.showControls}>
          {this.props.images[this.props.slide].title}
          <img src='/icons/close.png' onClick={this.closeModal} alt='close'/> 
        </ModalHeader> 
        <ModalBody 
          className='gallery__modal-body'
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          slide={this.props.slide}>
          {this.props.images.map((img, index) => 
            <ModalTout className='gallery__modal-tout' index={index} key={index}>
              <img src={`/img/${img.path}`} alt={img.title} />
            </ModalTout>  
          )}
        </ModalBody>
        <ModalFooter className='gallery__modal-footer' showControls={this.state.showControls}>
          <img src='/icons/plus_one.png' alt='plus_one'/>
          <img src='/icons/comment.png' alt='comment'/>
          <img src='/icons/add.png' alt='add'/>
          <img src='/icons/share.png' alt='share'/>
        </ModalFooter>
      </GalleryModalContainer>
    )
  }
}

const modalControlColor = '#333';

const GalleryModalContainer = styled.div`
  position: absolute;
  top: ${props => `${props.top}px`};
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  overflow: ${ props => props.isOpen ? 'visible' : 'hidden' };
  background: black;
  z-index: 5;
  opacity: ${ props => props.isOpen ? 1 : 0 };
  pointer-events: ${ props => props.isOpen ? 'auto' : 'none' };
  transition: opacity 0.3s;
`;

const ModalHeader = styled.div`
  background: ${modalControlColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  padding: 25px;
  color: #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${ props => props.showControls ? 1 : 0 };
  pointer-events: ${ props => props.showControls ? 'auto' : 'none' };
  transition: opacity 0.3s;
  z-index: 5;

  img {
    position: absolute;
    right: 60px;

    @media screen and (max-width: 420px) {
      transform: scale(0.75);
      right: 30px;
    }
  }
`;

const ModalFooter = styled.div`
  background: ${modalControlColor};
  position: absolute;
  padding: 30px 50px;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${ props => props.showControls ? 1 : 0 };
  pointer-events: ${ props => props.showControls && props.isOpen ? 'auto' : 'none' };
  transition: opacity 0.3s;
  z-index: 5;

  @media screen and (max-width: 420px) {
    padding: 15px 25px;

    img {
      transform: scale(0.75);
    }
  }
`;

const ModalBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: row;
  transform: translateX(${props => `${props.slide * -100}vw` })
`;

const ModalTout = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img {
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
  }
`;
