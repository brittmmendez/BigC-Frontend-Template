import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactSlick from './ReactSlick';

import '../../styles/examples.scss';

@inject('shop')
@observer
class ExternalEnlargedImage extends Component {
  render() {
    return (
      <div className="fluid react-slick">
        <div className="fluid__image-container">
          <ReactSlick {...{
            rimProps: {
              enlargedImagePortalId: 'portal',
              isHintEnabled: true,
              enlargedImageContainerDimensions: {
                width: '100%',
                height: '100%',
              },
            },
          }}
          />
        </div>
        <div className="fluid__instructions" style={{ position: 'relative' }}>
          <div
            id="portal"
            className="portal"
          />
          <h3>External Enlarged Image Example</h3>
          <p>
              Render enlarged image into an HTML element of your choosing.
          </p>
          <p>
              Ignored for touch input by default but will be honored if
              isEnlargedImagePortalEnabledForTouch is implemented.
          </p>
          <p>
              Use cases include a scenario where an ancestor element of
              react-image-magnify implements overflow hidden.
          </p>
          <p>
              Requires React v16.
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

export default ExternalEnlargedImage;
