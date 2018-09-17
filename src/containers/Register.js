import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import "../static/App.css";

@inject('shop')
@observer
export default class Register extends Component {
  constructor(props) {
    
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      verifyEmail: "",
      password: "",
      verifyPassword: "",
      ErrorFirstName: false,
      ErrorLastName: false,
      ErrorEmail: false,
      ErrorVerifyEmail: false,
      ErrorPassword: false,
      ErrorVerifyPassword: false,
    };
  }

  confirmFirstName() {
    if(this.state.firstName.length === 0){
      this.setState({
        ErrorFirstName: true
      })
    }else{
      this.setState({
        ErrorFirstName: false
      })
    }
    return this.state.firstName.length !== 0
  }

  confirmLastName() {
    if(this.state.lastName.length === 0){
      this.setState({
        ErrorLastName: true
      })
    }else{
      this.setState({
        ErrorLastName: false
      })
    }
    return this.state.lastName.length !== 0;
  }

  confirmEmail() {
    if(this.state.email.length === 0){
      this.setState({
        ErrorEmail: true
      })
    }else{
      this.setState({
        ErrorEmail: false
      })
    }
    return this.state.email.length !== 0;
  }

  verifyEmail() {
    if(this.state.verifyEmail.length===0 || this.state.email !== this.state.verifyEmail){
      this.setState({
        ErrorVerifyEmail: true
      })
    }else{
      this.setState({
        ErrorVerifyEmail: false
      })
    }
    return this.state.email === this.state.verifyEmail;
  }

  confirmPassword() {
    if(this.state.password.length === 0){
      this.setState({
        ErrorPassword: true
      })
    }else{
      this.setState({
        ErrorPassword: false
      })
    }
    return this.state.password.length !== 0;
  }
  
  verifyPassword() {
    if(this.state.verifyPassword.length===0 || this.state.password !== this.state.verifyPassword){
      this.setState({
        ErrorVerifyPassword: true
      })
    }else{
      this.setState({
        ErrorVerifyPassword: false
      })
    }
    return this.state.password === this.state.verifyPassword;
  }

  formErrors() {
    this.confirmFirstName() 
    this.confirmLastName() 
    this.confirmEmail() 
    this.confirmPassword() 
    this.verifyEmail() 
    this.verifyPassword()
}

validateForm() {
  return (
    this.confirmFirstName() &&
    this.confirmLastName() &&
    this.confirmEmail() &&
    this.confirmPassword() &&
    this.verifyEmail() &&
    this.verifyPassword()
  )
}

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.formErrors()
    // if(this.validateForm()){
    //   // this.props.shop.user.register(this.state);
    //   alert("yay")
    
    // }else{
    //   alert("you have errors")
    // }

    if(this.validateForm()){
      alert("Yay!")
    }
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input 
                id="firstName"
                className={this.state.ErrorFirstName ? "input is-danger" : "input"}
                  type="text" 
                  placeholder="First Name" 
                  value={this.state.firstName}                    
                  onChange={this.handleChange}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              {this.state.ErrorFirstName && <span class="icon is-small is-right">
                <i className= "fas fa-exclamation-triangle"></i>
               </span>}
            </div>
            {this.state.ErrorFirstName && <p class="help is-danger">Please Enter First Name!</p>}
          </div>

          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
               <input 
                id="lastName"
                className={this.state.ErrorLastName ? "input is-danger" : "input"}
                type="text" 
                placeholder="Last Name" 
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
                    
              {this.state.ErrorLastName && <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>}
            </div>
            {this.state.ErrorLastName && <p class="help is-danger">Please Enter Last Name!</p>}
          </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input 
                  id="email"
                  className={this.state.ErrorEmail ? "input is-danger" : "input"}
                  type="email" 
                  placeholder="Email" 
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                {this.state.ErrorEmail && <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>}
              </div>
              {this.state.ErrorEmail && <p class="help is-danger">Please Enter Valid Email!</p>}
            </div>

            <div class="field">
              <label class="label">Confirm Email</label>
              <div class="control has-icons-left has-icons-right">
                <input 
                  id="verifyEmail"
                  className={this.state.ErrorVerifyEmail ? "input is-danger" : "input"}
                  type="email" 
                  placeholder="Confirm Email" 
                  value={this.state.verifyEmail}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                
                {this.state.ErrorVerifyEmail && <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>}
              </div>
              {this.state.ErrorVerifyEmail && <p class="help is-danger">Email and Confirmation Email Do Not Match!</p>}
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input 
                  id="password"
                  className={this.state.ErrorPassword ? "input is-danger" : "input"}
                  type="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                {this.state.ErrorPassword && <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>}
              </div>
              {this.state.ErrorPassword && <p class="help is-danger">Please Enter Password!</p>}
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left has-icons-right">
                <input 
                  id="verifyPassword"
                  className={this.state.ErrorVerifyPassword ? "input is-danger" : "input"}
                  type="password" 
                  placeholder="Confirm Password" 
                  value={this.state.verifyPassword}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                {this.state.ErrorVerifyPassword && <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>}
              </div>
              {this.state.ErrorVerifyPassword && <p class="help is-danger">Password and Confirmation Password Do Not Match!</p>}
            </div>

            <div class="field">
              <p class="control">
                <button class="button is-dark" type="submit">
                  Register
                </button>
              </p>
            </div>  
        </form>
      </div>
    );
  }
}