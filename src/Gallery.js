import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import GalleryModal from './GalleryModal';
import Tout from './Tout';

export default class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      slide: 0,
      isOpen: false,
    }
  }

  // replacing api call with hardcoded JSON to save time, only 8 hardcoded images
  componentDidMount() {
    this.setState({
      images: [
        {
          title: 'Air',
          path: 'air.jpg',
        },
        {
          title: 'Desks',
          path: 'desks.jpg',
        },
        {
          title: 'Hive',
          path: 'hive.jpg',
        },
        {
          title: 'Logo',
          path: 'logo.jpg',
        },
        {
          title: 'Lounge',
          path: 'lounge.jpg',
        },
        {
          title: 'Lounge',
          path: 'lounge2.jpg',
        },
        {
          title: 'Mountain View',
          path: 'mountainview.jpg',
        },
        {
          title: 'Racecar',
          path: 'racecar.jpg',
        }
      ]
    })
  }

  onToutClick = (index) => {
    disableBodyScroll();
    $('body').css({
      height: '100%',
      width: '100%',
      position: 'fixed',
    });
    $('.gallery__modal-body').css('transform', `translateX(${this.state.slide * 100})vw`)
    this.setState({
      slide: index,
      isOpen: true,
    })
  }

  onCloseModal = () => {
    enableBodyScroll();
    $('body').css('position', '');
    this.setState({
      isOpen: false,
    })
  }

  prevSlide = () => {
    this.setState((prevState) => {
      return { slide: prevState.slide - 1 };
    });
  }

  nextSlide = () => {
    this.setState((prevState) => {
      return { slide: prevState.slide + 1 };
    });
  }

  render() {
    if (!this.state.images.length) {
      return null;
    }
    return (
      <div>
        <GalleryHeader>
          Image gallery
        </GalleryHeader>
        <GalleryBody>
          { this.state.images.map((img, index) => 
            <Tout 
              src={`/img/${img.path}`} 
              alt={img.title} 
              index={index}
              key={index}
              onToutClick={this.onToutClick}/>
          )}
        </GalleryBody>
        <GalleryModal 
          className='gallery__modal'
          closeModal={this.onCloseModal}
          prevSlide={this.prevSlide}
          nextSlide={this.nextSlide}
          {...this.state}/>
      </div>
    );
  }
}

const GalleryHeader = styled.header`
  width: 100%;
  background: #f5f5f5;
  border-bottom: 1px solid #e3e3e3;
  color: #4a4a4a;
  padding: 25px;
`;

const GalleryBody = styled.main`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 30px 30px 30px;
  @media screen and (max-width: 460px) {
    padding: 0 15px 15px 15px;
  }
`;
