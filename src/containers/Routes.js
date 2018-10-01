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
import Payment from './Payment';
import MyCart from './MyCart';
import Checkout from './Checkout';
import Help from './Help';
import ContactUs from './ContactUs';
import Product1 from '../components/product/Product1';
import Product2 from '../components/product/Product2';
import Product3 from '../components/product/Product3';
import Product4 from '../components/product/Product4';
import About1 from '../components/about/About1';
import About2 from '../components/about/About2';
import About3 from '../components/about/About3';
import About4 from '../components/about/About4';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products-page" component={ProductsPage} />
    <Route exact path="/products-page/:productId" component={ProductShow} />
    <Route path="/product1" component={Product1} />
    <Route path="/product2" component={Product2} />
    <Route path="/product3" component={Product3} />
    <Route path="/product4" component={Product4} />
    <Route path="/about1" component={About1} />
    <Route path="/about2" component={About2} />
    <Route path="/about3" component={About3} />
    <Route path="/about4" component={About4} />
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
