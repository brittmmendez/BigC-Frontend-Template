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
        <div style={{ height: '1000px' }} />
      </div>
    );
  }
}

export default ReactSlickExample;
