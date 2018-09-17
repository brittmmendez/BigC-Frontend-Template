import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";

@inject("shop")
@observer
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            email: "",
            sameAsBilling: true, 
            billing_first_name: "",
            billing_last_name: "",
            billing_street_1: "",
            billing_street_2: "",
            billing_city: "",
            billing_state: "",
            billing_zip: "",
            billing_country: "",
            billing_phone: "",
            billing_email: "",
            ErrorFirstName: false,
            ErrorLastName: false,
            ErrorEmail: false,
            ErrorAddress: false,
            ErrorPhone: false,
            ErrorBilling: false
        }
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

      confirmPhone() {
        if(this.state.phone.length === 0){
          this.setState({
            ErrorPhone: true
          })
        }else{
          this.setState({
            ErrorPhone: false
          })
        }
        return this.state.phone.length !== 0;
      }

      confirmAddress() {
        if(this.state.street_1.length === 0 ||
            this.state.city.length === 0 ||
            this.state.state.length === 0 ||
            this.state.zip.length === 0 ||
            this.state.country.length === 0
        ){
          this.setState({
            ErrorAddress: true
          })
          return false;
        }else{
          this.setState({
            ErrorAddress: false
          })
          return true;
        }
      }

      confirmBilling() {
        if(this.state.sameAsBilling){
            this.setState({
                ErrorBilling: false
            })
            return true
        }else if(
            this.state.billing_first_name.length === 0 ||
            this.state.billing_last_name.length === 0 ||
            this.state.billing_phone.length === 0 ||
            this.state.billing_email.length === 0 ||
            this.state.billing_city.length === 0 ||
            this.state.billing_state.length === 0 ||
            this.state.billing_zip.length === 0 ||
            this.state.billing_country.length === 0){
            debugger
                this.setState({
                    ErrorBilling: true
                })
            return false;
        }else{
            this.setState({
                ErrorBilling: false
            })
            return true
        }
      }

    formErrors() {
        this.confirmFirstName() 
        this.confirmLastName() 
        this.confirmEmail() 
        this.confirmPhone() 
        this.confirmAddress() 
        this.confirmBilling()
    }
    
    validateForm() {
      return (
        this.confirmFirstName() &&
        this.confirmLastName() &&
        this.confirmEmail() &&
        this.confirmPhone() &&
        this.confirmAddress() &&
        this.confirmBilling()
      )
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleCheckBox = event => {
      this.setState({
        sameAsBilling: !this.state.sameAsBilling
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      this.formErrors()
      
      if(this.validateForm()){
        alert("Yay!")
        const { shop } = this.props;
        shop.checkout.addShippingInfo(this.state);
        console.log("Added Bill/Ship Info")
        console.log(this.state)
        this.props.history.push('/payment')
      }else{
          alert("boo!")
      }
    }

  render() {
    const { basket } = this.props.shop
    const { shop } = this.props
    
    if (basket.itemCount > 0 ) {
      return (
        <div>
          <h1>Checkout</h1>
          <h3> Subtotal: <strong> ${basket.subTotal} </strong></h3>
          <p>(Shipping included)</p>

          {!shop.user.loggedIn &&
          <p> Continue as Guest or <strong> <Link to="/login"> Log In </Link> </strong> </p>}
    
          <div>
            <form onSubmit={this.handleSubmit}>
            <h1> Shipping Address </h1>
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

        <div className={this.state.ErrorAddress ? "is-danger" : ""}>
            <div class="field">
                <label class="label">Address</label>
                {this.state.ErrorAddress && <p class="help is-danger">Please Correct Address!</p>}
                <div class="control has-icons-right">
                <input 
                    id="street_1"
                    className="input"
                    type="text" 
                    placeholder="Street 1" 
                    value={this.state.street_1}
                    onChange={this.handleChange}
                />       
                {this.state.ErrorLastName && <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>}
                </div>
            </div>
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
              <label class="label">Phone</label>
              <div class="control has-icons-left has-icons-right">
                <input 
                  id="phone"
                  className={this.state.ErrorPhone ? "input is-danger" : "input"}
                  type="tel" 
                  placeholder="Phone Number" 
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
                {this.state.ErrorPhone && <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>}
              </div>
              {this.state.ErrorPhone && <p class="help is-danger">Please Enter Valid Phone Number!</p>}
            </div>

            <label class="checkbox">
                <input type="checkbox" value="sameAsBilling" id="sameAsBilling" checked={this.state.sameAsBilling} onChange={this.handleCheckBox}/>
                Billing address same as shipping
            </label>  

            {!this.state.sameAsBilling && 
            <div className={this.state.ErrorBilling ? "is-danger" : ""}>
                <div class="field">
                    <label class="label">Billing Information</label>
                    {this.state.ErrorBilling && <p class="help is-danger">Please Correct Billing Address Information!</p>}
                    <div class="control has-icons-left has-icons-right">
                        <input 
                            id="billing_first_name"
                            className="input"
                            type="text" 
                            placeholder="First Name" 
                            value={this.state.billing_first_name}                    
                            onChange={this.handleChange}
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input 
                        id="billing_last_name"
                        className="input"
                        type="text" 
                        placeholder="Last Name" 
                        value={this.state.billing_last_name}
                        onChange={this.handleChange}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                 <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <div class="control has-icons-right">
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
            <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                    <input 
                    id="billing_email"
                    className="input"
                    type="email" 
                    placeholder="Email" 
                    value={this.state.billing_email}
                    onChange={this.handleChange}
                    />
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>

            <div class="field">
                <label class="label">Phone</label>
                <div class="control has-icons-left has-icons-right">
                    <input 
                    id="billing_phone"
                    className="input"
                    type="tel" 
                    placeholder="Phone Number" 
                    value={this.state.billing_phone}
                    onChange={this.handleChange}
                    />
                    <span class="icon is-small is-left">
                    <i class="fas fa-phone"></i>
                    </span>     
                </div>
            </div>
        </div>} 

        <div class="field">
            <p class="control">
                <button class="button is-dark" type="submit">
                    Add Payment
                </button>
            </p>
        </div>        
    </form>
        </div>
          <Link to="/my-cart"> Modify Cart</Link>
        </div>
    )}else{
      return (
        <div>
            <h1>Checkout</h1>
            <h3>Sorry, you have no items yet!</h3>
            <Link class="button is-dark" to="/products-page">
                <span>Shop Products</span>
            </Link>
        </div>
      )}
    }
  }
  
export default Checkout;