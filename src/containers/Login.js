import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import { Link } from "react-router-dom";
import "../static/App.css";

@inject('shop')
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: false
    };
  }

  validateForm() {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({
        loginError: true
      })
      return false
    }else{
      return true
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.validateForm()){
      this.props.shop.user.logIn(this.state);
      this.props.history.push('/account')
    }
  }
  
  render() {
    return (
      <div className="container has-text-centered">
        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label is-marginless">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                autoFocus 
                id="email"
                class="input" 
                type="email" 
                placeholder="Email" 
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label is-marginless">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input 
                id="password"
                class="input" 
                type="password" 
                placeholder="Password" 
                value={this.state.password}
                onChange={this.handleChange}
                />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          {this.state.loginError && <p class="help is-danger">Please Enter Username & Password</p>}
          <div class="field">
            <p class="control has-text-centered">
              <button class="button is-dark " type="submit">
                Login
              </button>
            </p>
          </div>
        </form>
        <h5> Need an account? <Link to="/register"> Register Here!</Link> </h5>
      </div>
    );
  }
}