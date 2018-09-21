import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import "../static/App.css";
import ShopProductsBtn from '../components/ShopProductsBtn'

@inject("shop")
@observer
export default class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardnum: "",
            expiry: "",
            cvc: ""
        };
    }

    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { shop } = this.props;
        shop.proccessOrder();
        this.props.history.push('/order-confirmation')
    }
    render() {
        if (this.props.shop.basket.items.length > 0) {
            return (
                <div className="container has-text-centered">
                    <form onSubmit={this.handleSubmit}>
                        <div class="field">
                            <label class="label">Card Number</label>
                            <div class="control has-icons-left">
                                <input 
                                    autoFocus
                                    id="cardnum"
                                    className="input"
                                    type="text" 
                                    placeholder="1234 1234 1234 1234" 
                                    value={this.state.cardnum}                    
                                    onChange={this.handleChange}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-credit-card"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Expiration Date</label>
                            <div class="control has-icons-left">
                                <input 
                                    id="expiry"
                                    className="input"
                                    type="text" 
                                    placeholder="MM / YY" 
                                    value={this.state.expiry}                    
                                    onChange={this.handleChange}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-credit-card"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">CVC</label>
                            <div class="control has-icons-left">
                                <input 
                                    id="cvc"
                                    className="input"
                                    type="text" 
                                    placeholder="CVC" 
                                    value={this.state.cvc}                    
                                    onChange={this.handleChange}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-credit-card"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <p class="control has-text-centered">
                                <button class="button is-dark" type="submit">
                                    Submit Order
                                </button>
                            </p>
                        </div>    
                    </form>
                    <h5> <a href="/my-cart">Back to Cart</a> </h5>
                </div>
            );
        }

        return (
            <div className="container has-text-centered">
                <h1>Payment</h1>
                < ShopProductsBtn/> 
            </div>
        );
    }
};