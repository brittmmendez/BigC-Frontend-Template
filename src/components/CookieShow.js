import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Cookies } from 'react-cookie';

@inject('shop')
@observer
class CookieShow extends Component {
  render() {
    let cookies = new Cookies();
    cookies = cookies.get('token');
    return (
      <div>
        <h1>
          Here is your cookie:
          {cookies}
        </h1>
      </div>
    );
  }
}

export default CookieShow;
