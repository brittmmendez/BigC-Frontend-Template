import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('shop')
@observer
export default class Register extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      verifyEmail: '',
      password: '',
      verifyPassword: '',
      ErrorFirstName: false,
      ErrorLastName: false,
      ErrorEmail: false,
      ErrorVerifyEmail: false,
      ErrorPassword: false,
      ErrorVerifyPassword: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.formErrors();
    if (this.validateForm()) {
      this.props.shop.user.register(this.state);
      // this.props.history.push('/account');
      this.props.history.push('/login');
    }
  }

  confirmFirstName() {
    if (this.state.firstName.length === 0) {
      this.setState({
        ErrorFirstName: true,
      });
    } else {
      this.setState({
        ErrorFirstName: false,
      });
    }
    return this.state.firstName.length !== 0;
  }

  confirmLastName() {
    if (this.state.lastName.length === 0) {
      this.setState({
        ErrorLastName: true,
      });
    } else {
      this.setState({
        ErrorLastName: false,
      });
    }
    return this.state.lastName.length !== 0;
  }

  confirmEmail() {
    if (this.state.email.length === 0) {
      this.setState({
        ErrorEmail: true,
      });
    } else {
      this.setState({
        ErrorEmail: false,
      });
    }
    return this.state.email.length !== 0;
  }

  verifyEmail() {
    if (this.state.verifyEmail.length === 0 || this.state.email !== this.state.verifyEmail) {
      this.setState({
        ErrorVerifyEmail: true,
      });
    } else {
      this.setState({
        ErrorVerifyEmail: false,
      });
    }
    return this.state.email === this.state.verifyEmail;
  }

  confirmPassword() {
    if (this.state.password.length === 0) {
      this.setState({
        ErrorPassword: true,
      });
    } else {
      this.setState({
        ErrorPassword: false,
      });
    }
    return this.state.password.length !== 0;
  }

  verifyPassword() {
    if (this.state.verifyPassword.length === 0
      || this.state.password !== this.state.verifyPassword) {
      this.setState({
        ErrorVerifyPassword: true,
      });
    } else {
      this.setState({
        ErrorVerifyPassword: false,
      });
    }
    return this.state.password === this.state.verifyPassword;
  }

  formErrors() {
    this.confirmFirstName();
    this.confirmLastName();
    this.confirmEmail();
    this.confirmPassword();
    this.verifyEmail();
    this.verifyPassword();
  }

  validateForm() {
    return (
      this.confirmFirstName()
      && this.confirmLastName()
      && this.confirmEmail()
      && this.confirmPassword()
      && this.verifyEmail()
      && this.verifyPassword()
    );
  }

  render() {
    return (
      <div className="container has-text-centered">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label is-marginless">First Name</label>
            {this.state.ErrorFirstName && <p className="help is-danger is-marginless">Please Enter First Name!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="firstName"
                className={this.state.ErrorFirstName ? 'input is-danger is-marginless' : 'input'}
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
              {this.state.ErrorFirstName && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Last Name</label>
            {this.state.ErrorLastName && <p className="help is-danger is-marginless">Please Enter Last Name!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="lastName"
                className={this.state.ErrorLastName ? 'input is-danger' : 'input'}
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {this.state.ErrorLastName && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Email</label>
            {this.state.ErrorEmail && <p className="help is-danger is-marginless">Please Enter Valid Email!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="email"
                className={this.state.ErrorEmail ? 'input is-danger' : 'input'}
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              {this.state.ErrorEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Confirm Email</label>
            {this.state.ErrorVerifyEmail && <p className="help is-danger is-marginless">Email and Confirmation Email Do Not Match!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="verifyEmail"
                className={this.state.ErrorVerifyEmail ? 'input is-danger' : 'input'}
                type="email"
                placeholder="Confirm Email"
                value={this.state.verifyEmail}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {this.state.ErrorVerifyEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Password</label>
            {this.state.ErrorPassword && <p className="help is-danger is-marginless">Please Enter Password!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="password"
                className={this.state.ErrorPassword ? 'input is-danger' : 'input'}
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              {this.state.ErrorPassword && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Confirm Password</label>
            {this.state.ErrorVerifyPassword && <p className="help is-danger is-marginless">Password and Confirmation Password Do Not Match!</p>}
            <div className="control has-icons-left has-icons-right">
              <input
                id="verifyPassword"
                className={this.state.ErrorVerifyPassword ? 'input is-danger' : 'input'}
                type="password"
                placeholder="Confirm Password"
                value={this.state.verifyPassword}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              {this.state.ErrorVerifyPassword && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <p className="control has-text-centered">
              <button className="button is-dark" type="submit">
                  Register
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
