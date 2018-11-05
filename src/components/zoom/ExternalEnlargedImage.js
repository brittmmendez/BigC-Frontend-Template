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
        <div>
          <div
            style={{ position: 'relative' }}
            id="portal"
            className="portal"
          />
        </div>
      </div>
    );
  }
}

export default ExternalEnlargedImage;
