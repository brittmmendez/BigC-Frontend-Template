import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const style = {
  bottom: '0',
  width: '100%',
  height: '60px',
  background: '#6cf',
};

@inject('shop')
@observer
class Footer extends Component {
  render() {
    return (
      <footer className="footer has-background-danger" style={style}>
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-size-7">
              <div className="columns">
                <div className="column">
                  <Link className="button" to="/">
                    LOGO GOES HERE
                  </Link>
                </div>
              </div>
            </div>
            <div className="column is-6">
              <div className="columns">
                <div className="column is-4">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
                <div className="column is-4 is-size-7">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
                <div className="column is-4 is-size-7">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
                <div className="column is-4 is-size-7">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
                <div className="column is-4 is-size-7">
                  <p className="title is-7 is-marginless has-text-white"> Footer Goodness </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
