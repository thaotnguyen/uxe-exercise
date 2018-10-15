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
    $('.gallery__modal-body').css('transform', `translateX(${this.state.slide * 100})vw`);

    const rootOffset = $('main').offset().left;

    // get current dimensions and offset to animate from
    const originalSetting = $(`.gallery__tout:nth-child(${index + 1})`);

    // clone tout that was clicked on so empty space isn't created
    const clone = originalSetting.clone();
    clone.css({
      position: 'fixed',
      top: `calc(${originalSetting.offset().top}px)`,
      left: `${originalSetting.offset().left}px`,
      height: `${originalSetting.outerHeight()}`,
      width: `${originalSetting.outerWidth()}`,
      'padding-top': 0,
      'margin-top': 0,
      'z-index': 5,
      transition: 'none',
    });
    $('#root').append(clone);
    
    clone.css('transition', 'all 0.3s');

    // get new dimensions and offset to animate to
    const newSettingParent = $(`.gallery__modal-tout:nth-child(${index + 1})`);
    const newSetting = $(`.gallery__modal-tout:nth-child(${index + 1}) img`);

    // hide old and new images so only clone is visible during animation, also hide controls
    originalSetting.css('opacity', 0);
    newSetting.css('opacity', 0);
    $('.gallery__modal-header').css('visibility', 'hidden');
    $('.gallery__modal-footer').css('visibility', 'hidden');

    clone.css({
      left: `${newSetting.offset().left - newSettingParent.offset().left + rootOffset}px`,
      top: `${newSetting.offset().top - newSettingParent.offset().top}px`,
      height: `${newSetting.outerHeight()}px`,
      width: `${newSetting.outerWidth()}px`,
    });
    setTimeout(() => {
      clone.remove();
      originalSetting.css('opacity', 1);
      newSetting.css('opacity', 1);
      $('.gallery__modal-header').css('visibility', 'visible');
      $('.gallery__modal-footer').css('visibility', 'visible');
    }, 300);
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

    const rootOffset = $('main').offset().left;

    // get current dimensions and offset to animate from
    const newSetting = $(`.gallery__tout:nth-child(${this.state.slide + 1})`);
    const originalSetting = $(`.gallery__modal-tout:nth-child(${this.state.slide + 1}) img`);

    // clone tout that was clicked on so empty space isn't created
    const clone = newSetting.clone();
    $('#root').append(clone);
    clone.css({
      position: 'fixed',
      top: `calc(${originalSetting.offset().top}px)`,
      left: `${originalSetting.offset().left}px`,
      height: `${originalSetting.outerHeight()}`,
      width: `${originalSetting.outerWidth()}`,
      'z-index': 5,
      'padding-top': 0,
      'margin-top': 0,
    });

    // hide old and new images so only clone is visible during animation, also hide controls
    originalSetting.css('opacity', 0);
    newSetting.css('opacity', 0);

    clone.animate({
      left: `${newSetting.offset().left}px`,
      top: `${newSetting.offset().top}px`,
      height: `${newSetting.outerHeight()}px`,
      width: `${newSetting.outerWidth()}px`,
    }, 300, () => {
      clone.remove();
      originalSetting.css('opacity', 1);
      newSetting.css('opacity', 1);
    });
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
              className='gallery__tout'
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
