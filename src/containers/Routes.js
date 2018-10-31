import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import ProductsPage from './ProductsPage';
import ProductShow from './ProductShow';
import NotFound from './NotFound';
import FormikLogin from './FormikLogin';
import FormikRegister from './FormikRegister';
import Account from './Account';
import OrderConfirmation from './OrderConfirmation';
import FormikSearch from '../components/FormikSearch';
import Payment from './Payment';
import MyCart from './MyCart';
import Checkout from './Checkout';
import Help from './Help';
import ContactUs from './ContactUs';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products-page" component={ProductsPage} />
    <Route exact path="/products-page/:productId" component={ProductShow} />
    <Route exact path="/search" component={FormikSearch} />
    <Route exact path="/search/:searchTerm" component={ProductsPage} />
    <Route path="/help" component={Help} />
    <Route path="/contact-us" component={ContactUs} />
    <Route path="/my-cart" component={MyCart} />
    <Route path="/payment" component={Payment} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/order-confirmation" component={OrderConfirmation} />
    <Route path="/register" component={FormikRegister} />
    <Route path="/login" component={FormikLogin} />
    <Route path="/account" component={Account} />
    <Route component={NotFound} />
  </Switch>);


export default (Routes);
