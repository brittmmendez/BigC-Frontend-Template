import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

import '../../styles/examples.scss';

import watchImg687 from '../../static/images/wristwatch_687.jpg';
import watchImg1200 from '../../static/images/wristwatch_1200.jpg';

const styles = { maxWidth: 'none' };

const BasicExample = () => (
  <div className="fluid">
    <div className="fluid__image-container">
      <ReactImageMagnify {...{
        smallImage: {
          alt: 'Wristwatch by Ted Baker London',
          isFluidWidth: true,
          src: watchImg687,
        },
        largeImage: {
          src: watchImg1200,
          width: 1200,
          height: 1800,
        },
        imageStyle: styles,
        enlargedImageStyle: styles,
      }}
      />
    </div>
  </div>
);

export default BasicExample;
