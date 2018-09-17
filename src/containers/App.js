import React, { Component } from "react";
import DevTools from 'mobx-react-devtools';
import Routes from "../Routes";
import { BrowserRouter as Router} from "react-router-dom";
import "../static/App.css";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { observer, inject} from 'mobx-react'
import Spinner from 'react-spinkit';

@inject("shop")
@observer
class App extends Component {

  render() {
    if (!this.props.shop.products.data.length) {
      return (
        <div className="container">
          <div id="divElement">
            <Spinner name="pacman" color="#7EC4D7"/>
          </div>
        </div>
      )
      } else {
      return (
        <Router>
        <div id="main-wrapper" >
          <div className="App">
            <DevTools />
            <NavBar />
            <div className="text-center test">
              <Routes />
            </div>
            <Footer />
          </div>
        </div>
        </Router>
      );
    }
  }
}

export default App;