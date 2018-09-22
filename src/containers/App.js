import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Routes from '../Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

@inject('shop')
@observer
class App extends Component {
  render() {
    return (
      <Router>
        <div id="main-wrapper">
          <div className="App">
            <DevTools />
            <NavBar />
            {!this.props.shop.products.data.length && (
            <div className="container">
              <div className="content has-text-centered">
                <i className="fa fa-spinner fa-pulse fa-7x fa-fw" />
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            )}
            {this.props.shop.products.data.length !== 0 && <Routes />}
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
