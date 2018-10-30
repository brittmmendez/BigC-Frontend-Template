import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TotalAmount from '../components/TotalAmount';
import ShopProductsBtn from '../components/ShopProductsBtn';

@inject('shop')
@observer
class Checkout extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      street_1: '',
      street_2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      email: '',
      sameAsBilling: true,
      billing_first_name: '',
      billing_last_name: '',
      billing_street_1: '',
      billing_street_2: '',
      billing_city: '',
      billing_state: '',
      billing_zip: '',
      billing_country: '',
      billing_phone: '',
      billing_email: '',
      ErrorFirstName: false,
      ErrorLastName: false,
      ErrorEmail: false,
      ErrorAddress: false,
      ErrorPhone: false,
      ErrorBilling: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleCheckBox = () => {
    this.setState({
      sameAsBilling: !this.state.sameAsBilling,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.formErrors();
    if (this.validateForm()) {
      const { shop } = this.props;
      shop.checkout.addShippingInfo(this.state);
      console.log('Added Bill/Ship Info');
      console.log(this.state);
      this.props.history.push('/payment');
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

  confirmPhone() {
    if (this.state.phone.length === 0) {
      this.setState({
        ErrorPhone: true,
      });
    } else {
      this.setState({
        ErrorPhone: false,
      });
    }
    return this.state.phone.length !== 0;
  }

  confirmAddress() {
    if (this.state.street_1.length === 0
      || this.state.city.length === 0
      || this.state.state.length === 0
      || this.state.zip.length === 0
      || this.state.country.length === 0) {
      this.setState({
        ErrorAddress: true,
      });
      return false;
    }
    this.setState({
      ErrorAddress: false,
    });
    return true;
  }

  confirmBilling() {
    if (this.state.sameAsBilling) {
      this.setState({
        ErrorBilling: false,
      });
      return true;
    } if (
      this.state.billing_first_name.length === 0
      || this.state.billing_last_name.length === 0
      || this.state.billing_phone.length === 0
      || this.state.billing_email.length === 0
      || this.state.billing_city.length === 0
      || this.state.billing_state.length === 0
      || this.state.billing_zip.length === 0
      || this.state.billing_country.length === 0) {
      this.setState({
        ErrorBilling: true,
      });
      return false;
    }
    this.setState({
      ErrorBilling: false,
    });
    return true;
  }

  formErrors() {
    this.confirmFirstName();
    this.confirmLastName();
    this.confirmEmail();
    this.confirmPhone();
    this.confirmAddress();
    this.confirmBilling();
  }

  validateForm() {
    return (
      this.confirmFirstName()
      && this.confirmLastName()
      && this.confirmEmail()
      && this.confirmPhone()
      && this.confirmAddress()
      && this.confirmBilling()
    );
  }

  render() {
    const { cart } = this.props.shop;
    const { shop } = this.props;

    if (cart.itemCount > 0) {
      return (
        <div className="container has-text-centered">
          {!shop.user.loggedIn
          && (
          <p className="has-text-right">
            You must
            {' '}
            <strong>
              <Link to="/login"> Log In </Link>
            </strong>
            {' '}
            to Checkout.
          </p>
          )}

          <TotalAmount />

          <div className="container has-text-centered">
            <form onSubmit={this.handleSubmit}>
              <h1> Shipping Information </h1>
              <div className="field">
                <label className="label">First Name</label>
                {this.state.ErrorFirstName && <p className="help is-danger">Please Enter First Name!</p>}
                <div className="control has-icons-left has-icons-right">
                  <input
                    id="firstName"
                    className={this.state.ErrorFirstName ? 'input is-danger' : 'input'}
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
                <label className="label">Last Name</label>
                {this.state.ErrorLastName && <p className="help is-danger">Please Enter Last Name!</p>}
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

              <div className={this.state.ErrorAddress ? '' : ''}>
                <div className="field">
                  <label className="label">Address</label>
                  {this.state.ErrorAddress && <p className="help is-danger">Please Correct Address!</p>}
                  <div className="control has-icons-right">
                    <input
                      id="street_1"
                      className="input"
                      type="text"
                      placeholder="Street 1"
                      value={this.state.street_1}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-right">
                    <input
                      id="street_2"
                      className="input"
                      type="text"
                      placeholder="Street 2"
                      value={this.state.street_2}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-right">
                    <input
                      id="city"
                      className="input"
                      type="text"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-right">
                    <input
                      id="state"
                      className="input"
                      type="text"
                      placeholder="State"
                      value={this.state.state}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-right">
                    <input
                      id="zip"
                      className="input"
                      type="text"
                      placeholder="Zip Code"
                      value={this.state.zip}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-right">
                    <input
                      id="country"
                      className="input"
                      type="text"
                      placeholder="Country"
                      value={this.state.country}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                {this.state.ErrorEmail && <p className="help is-danger">Please Enter Valid Email!</p>}
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
                <label className="label">Phone</label>
                {this.state.ErrorPhone && <p className="help is-danger">Please Enter Valid Phone Number!</p>}
                <div className="control has-icons-left has-icons-right">
                  <input
                    id="phone"
                    className={this.state.ErrorPhone ? 'input is-danger' : 'input'}
                    type="tel"
                    placeholder="Phone Number"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone" />
                  </span>
                  {this.state.ErrorPhone && (
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                  )}
                </div>
              </div>

              <label className="checkbox">
                <input type="checkbox" value="sameAsBilling" id="sameAsBilling" checked={this.state.sameAsBilling} onChange={this.handleCheckBox} />
                    Billing address same as shipping
              </label>

              {!this.state.sameAsBilling
                && (
                <div className={this.state.ErrorBilling ? 'is-danger' : ''}>
                  <div className="field">
                    <label className="label">Billing Information</label>
                    {this.state.ErrorBilling && <p className="help is-danger">Please Correct Billing Address Information!</p>}
                    <div className="control has-icons-left has-icons-right">
                      <input
                        id="billing_first_name"
                        className="input"
                        type="text"
                        placeholder="First Name"
                        value={this.state.billing_first_name}
                        onChange={this.handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control has-icons-left has-icons-right">
                      <input
                        id="billing_last_name"
                        className="input"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.billing_last_name}
                        onChange={this.handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_street_1"
                        className="input"
                        type="text"
                        placeholder="Street 1"
                        value={this.state.billing_street_1}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_street_2"
                        className="input"
                        type="text"
                        placeholder="Street 2"
                        value={this.state.billing_street_2}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_city"
                        className="input"
                        type="text"
                        placeholder="City"
                        value={this.state.billing_city}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_state"
                        className="input"
                        type="text"
                        placeholder="State"
                        value={this.state.billing_state}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_zip"
                        className="input"
                        type="text"
                        placeholder="Zip Code"
                        value={this.state.billing_zip}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <input
                        id="billing_country"
                        className="input"
                        type="text"
                        placeholder="Country"
                        value={this.state.billing_country}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        id="billing_email"
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={this.state.billing_email}
                        onChange={this.handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Phone</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        id="billing_phone"
                        className="input"
                        type="tel"
                        placeholder="Phone Number"
                        value={this.state.billing_phone}
                        onChange={this.handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-phone" />
                      </span>
                    </div>
                  </div>
                </div>
                )}

              <div className="field">
                <p className="control has-text-centered">
                  <button
                    className="button is-primary"
                    type="submit"
                    disabled={!shop.user.loggedIn}
                  >
                            Add Payment
                  </button>
                </p>
              </div>
            </form>
          </div>
          <Link to="/my-cart"> Modify Cart</Link>
        </div>);
    }
    return (
      <div className="container has-text-centered">
        <h3>Sorry, you have no items in your cart yet!</h3>
        <ShopProductsBtn />
      </div>
    );
  }
}

export default Checkout;
