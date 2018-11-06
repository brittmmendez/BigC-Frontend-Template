// MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types, flow } from 'mobx-state-tree';
import { createClient } from 'contentful';
import fuzzysearch from 'fuzzysearch';
import { Cookies } from 'react-cookie';
import User from './User';
import Checkout from './Checkout';
import Products from './Products';
import Cart from './Cart';

const cookies = new Cookies();

// Contentful Configuration
const client = createClient({
  space: '0ck90443p53t',
  environment: 'master', // defaults to 'master' if not set
  accessToken: '207ac9b7c042fce9f803dd28ae69537f9fc1de713248f646417017feaa7ad401',
});
console.log(client);

const Shop = types
  .model({
    user: types.optional(User, {}),
    checkout: types.optional(Checkout, {}),
    products: types.optional(Products, { data: [] }),
    searchProducts: types.optional(Products, { data: [] }),
    cart: types.optional(Cart, {}),
    apiUrl: 'https://my-mix-api.herokuapp.com/api',
  })
  .actions(self => ({
    // initial fetch from contentful
    getContent: flow(function* getContent() {
      const entries = yield client.getEntries();
      // will have to figure out best way to store in a model once we have our accurate content
      entries.items.map(a => console.log(a.fields));
    }),

    // initial fetch from BigC
    getProducts: flow(function* getProducts() {
      if (self.products.productCount === 0) {
        const response = yield fetch(`${self.apiUrl}/products`);
        const json = yield response.json();
        console.log(json);
        self.products.data = json;
      }
    }),

    // Check for cart cookie
    checkCookies() {
      const cartCookie = cookies.get('cart');
      const userCookie = cookies.get('user');
      // if there is a cart cookie
      if (cartCookie) {
        // get the cart from BigC and add items in cart back to line items
        self.cart.getBigCcart(cartCookie.id);
        // self.cart.getCart();
      }
      if (userCookie) {
        self.user.id = parseInt(userCookie.id, 10);
        self.user.token = userCookie.token;
        self.user.loggedIn = true;
      }
    },

    proccessOrder: flow(function* proccessOrder() {
      // sets billing/shipping info and products to correct request format
      const request = self.prepOrder();
      try {
        // (CORS) error run in terminal:
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
        // set orderConfirmation model for confirmation container
        self.createOrderConfirmation(json);
        // clears cart if request is successful
        self.cart.deleteBigCcart(self.cart.id);
      } catch (err) {
        console.log(err);
      }
    }),

    productSearch(searchTerm) {
      const productsFound = self.products.data.filter(
        p => fuzzysearch(searchTerm.toLowerCase(), p.name.toLowerCase()),
      );
      return productsFound;
    },

    prepOrder() {
      const request = {
        // setting user id billing/shipping info
        customer_id: self.user.id,
        order_total: {
          subtotal_ex_tax: parseFloat(self.cart.subtotal_ex_tax),
          subtotal_inc_tax: parseFloat(self.cart.subtotal_inc_tax),
          total_ex_tax: parseFloat(self.cart.total_ex_tax),
          total_inc_tax: parseFloat(self.cart.total_inc_tax),
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
        // put cart products in correct format for request to BigC API
        products: self.prepItems(),
      };
      console.log('Order Request Prepped');
      console.log(request);
      return request;
    },

    prepItems() {
      // add additional product info based on your products ex. product option id's and values
      const items = self.cart.items.map(item => (
        item.option_id === 0
          ? {
            product_id: item.item,
            quantity: item.quantity,
          }
          : {
            product_id: item.item,
            quantity: item.quantity,
            product_options: [
              {
                id: item.option_id,
                value: item.option_value,
              },
            ],
          }
      ));
      console.log('Prep Items');
      console.log([...items]);
      return items;
    },

    createOrderConfirmation(json) {
      // order confirmation info needed for container
      const confirmation = {
        order_id: json.id,
        customer_id: json.customer_id,
        status_id: json.status_id,
        status: json.status,
        total: json.total_inc_tax,
        first_name: json.billing_address.first_name,
        items_total: json.items_total,
      };
      self.checkout.orderConfirmation = confirmation;
    },

    // MobX State Tree Lifecycle methods
    afterCreate() {
      self.load();
    },

    load() {
      self.getProducts();
      self.getContent();
      self.checkCookies();
    },

    reload() {
      self.load();
    },
  }));
export default Shop;
