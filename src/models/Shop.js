/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types, flow } from 'mobx-state-tree';
// import User from './User';
import Products from './Products';
import Basket from './Basket';
import Checkout from './Checkout';
import User from './User';


const Shop = types
  .model({
    user: types.optional(User, {}),
    checkout: types.optional(Checkout, {}),
    products: types.optional(Products, { data: [] }),
    basket: types.optional(Basket, {}),
    apiUrl: 'https://my-mix-api.herokuapp.com/api',
  })
  .actions(self => ({
    getProducts: flow(function* getProducts() {
      if (self.products.productCount === 0) {
        const response = yield fetch(`${self.apiUrl}/products`);
        const json = yield response.json();
        console.log('Loaded Items');
        console.log(json);
        self.products.data = json;
      }
    }),

    proccessOrder: flow(function* proccessOrder() {
      console.log('Prepping Order!');
      const request = self.prepOrder();

      try {
        // if failed to fecth run in terminal:
        // open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir
        const response = yield fetch(`${self.apiUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${self.user.token}`,
          },
          body: JSON.stringify(request),
        });
        let json = response;
        json = yield json.json();
        console.log('Order Confirmed');
        console.log(json);
        self.createOrderConfirmation(json);
        self.basket.clearBasket();
      } catch (err) {
        console.log(`ERROR!!!!${err}`);
      }
    }),

    prepOrder() {
      const request = {
        customer_id: self.user.id,
        order_total: {
          subtotal_ex_tax: parseFloat(self.basket.subtotal_ex_tax),
          subtotal_inc_tax: parseFloat(self.basket.subtotal_inc_tax),
          total_ex_tax: parseFloat(self.basket.total_ex_tax),
          total_inc_tax: parseFloat(self.basket.total_inc_tax),
        },
        billing_address: {
          first_name: self.checkout.billingInfo.first_name,
          last_name: self.checkout.billingInfo.last_name,
          street_1: self.checkout.billingInfo.street_1,
          street_2: self.checkout.billingInfo.street_2,
          city: self.checkout.billingInfo.city,
          state: self.checkout.billingInfo.state,
          zip: self.checkout.billingInfo.zip,
          country: self.checkout.billingInfo.country,
          phone: self.checkout.billingInfo.phone,
          email: self.checkout.billingInfo.email,
        },
        shipping_addresses: [
          {
            first_name: self.checkout.shippingInfo.first_name,
            last_name: self.checkout.shippingInfo.last_name,
            street_1: self.checkout.shippingInfo.street_1,
            street_2: self.checkout.shippingInfo.street_2,
            city: self.checkout.shippingInfo.city,
            state: self.checkout.shippingInfo.state,
            zip: self.checkout.shippingInfo.zip,
            country: self.checkout.shippingInfo.country,
            phone: self.checkout.shippingInfo.phone,
            email: self.checkout.shippingInfo.email,
          },
        ],
        products: self.prepItems(),
      };
      console.log('Order Request Prepped');
      console.log(request);
      return request;
    },

    prepItems() {
      // add additional product info ex. product option id's and values
      const items = self.basket.items.map(item => (
        {
          product_id: item.item,
          quantity: item.quantity,
        }
      ));
      console.log('Prep Items');
      console.log([...items]);
      return items;
    },

    createOrderConfirmation(json) {
      const confirmation = {
        order_id: json.id,
        customer_id: json.customer_id,
        status_id: json.status_id,
        status: json.status,
        total: json.total_inc_tax,
        first_name: json.billing_address.first_name,
      };
      self.checkout.orderConfirmation = confirmation;
    },

    // MobX State Tree Lifecycle methods
    afterCreate() {
      self.load();
    },

    load() {
      self.getProducts();
    },

    reload() {
      self.load();
    },
  }));
export default Shop;
