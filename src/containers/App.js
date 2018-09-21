import React, { Component } from "react";
import DevTools from 'mobx-react-devtools';
import Routes from "../Routes";
import { BrowserRouter as Router} from "react-router-dom";
import "../static/App.css";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { observer, inject} from 'mobx-react'

@inject("shop")
@observer
class App extends Component {

  render() {
      return (
        <Router>
          <div id="main-wrapper" >
            <div className="App">
              <DevTools />
              <NavBar />
              {!this.props.shop.products.data.length ?
                <div className="container" >
                  <div className="content has-text-centered">
                    <i class="fa fa-spinner fa-pulse fa-7x fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              :
                <Routes />
              }
              <Footer />
            </div>
          </div>
        </Router>
      );
    }
  }
  
export default App;