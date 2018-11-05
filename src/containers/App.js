import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

@inject('shop')
@observer
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <DevTools />
          <NavBar />
          <Routes />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
