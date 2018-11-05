import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';

import '../../styles/react-slick.scss';

import front500 from '../../static/images/versace-blue/front-500.jpg';
import front1426 from '../../static/images/versace-blue/front-1426.jpg';

import back500 from '../../static/images/versace-blue/back-500.jpg';
import back1426 from '../../static/images/versace-blue/back-1426.jpg';

const frontSrcSet = [
  { src: front500, setting: '500w' },
  { src: front1426, setting: '1426w' },
]
  .map(item => `${item.src} ${item.setting}`)
  .join(', ');

const backSrcSet = [
  { src: back500, setting: '500w' },
  { src: back1426, setting: '1426w' },
]
  .map(item => `${item.src} ${item.setting}`)
  .join(', ');

const dataSource = [
  {
    srcSet: frontSrcSet,
    small: front500,
    large: front1426,
  },
  {
    srcSet: backSrcSet,
    small: back500,
    large: back1426,
  },
];

const styles = { maxWidth: 'none' };

@inject('shop')
@observer
class ReactSlickExample extends Component {
  render() {
    const {
      rimProps,
    } = this.props;

    return (
      <ReactSlick
        {...{
          dots: true,
          infinite: true,
          speed: 500,
          // fade: true,
          // autoplay: true,
          // autoplaySpeed: 2000,
          pauseOnHover: true,
          swipeToSlide: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }}
      >
        {dataSource.map(src => (
          <div>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Wristwatch by Versace',
                  isFluidWidth: true,
                  src: src.small,
                  srcSet: src.srcSet,
                  sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                },
                largeImage: {
                  src: src.large,
                  width: 1426,
                  height: 2000,
                },
                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                imageStyle: styles,
                enlargedImageStyle: styles,
              }}
              {...rimProps}
            />
          </div>
        ))}
      </ReactSlick>
    );
  }
}

export default ReactSlickExample;
