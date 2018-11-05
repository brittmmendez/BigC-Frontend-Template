import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactSlick from './ReactSlick';

import '../../styles/examples.scss';


@inject('shop')
@observer
class ReactSlickExample extends Component {
  render() {
    return (
      <div className="fluid react-slick">
        <div className="fluid__image-container">
          <ReactSlick {...{
            rimProps: {
              isHintEnabled: true,
              shouldHideHintAfterFirstActivation: false,
              enlargedImagePosition: 'over',
            },
          }}
          />
        </div>
        <div className="fluid__instructions">
          <h3>Carousel Example</h3>
          <p>
            Basic integration with&nbsp;
          </p>
          <p>
            In-place enlargement for mouse and touch input.
          </p>
          <p>
            Side-by-side enlargement supported, please see&nbsp;
          </p>
          <p>
            Responsive and fluid between breakpoints.
          </p>
          <p>
            Initial file size optimized via
            attributes.
          </p>
          <p>
            Please see
            for details.
          </p>
        </div>
        <div style={{ height: '1000px' }} />
      </div>
    );
  }
}

export default ReactSlickExample;
