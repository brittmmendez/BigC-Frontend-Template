// MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types, flow, getParent } from 'mobx-state-tree';
import { Cookies } from 'react-cookie';
import OrderItem from './OrderItem';

const cookies = new Cookies();

const Cart = types
  .model({
    id: types.optional(types.string, ''),
    // cart contains unique orderItems based off of the value id and product id selected
    items: types.optional(types.array(OrderItem), []),
  })
  .views(self => ({
    get itemCount() {
      let totalQuantity = 0;
      self.items.map((i) => {
        totalQuantity += i.quantity;
        return totalQuantity;
      });
      return totalQuantity;
    },
    // following views needed for BigC processOrder POST request
    get subtotal_ex_tax() {
      let sub = 0.0;
      self.items.map((i) => {
        sub += i.price * i.quantity;
        return sub;
      });
      return sub.toFixed(2);
    },

    get subtotal_inc_tax() {
      const taxPercent = 0.07;
      const sub = parseInt(self.subtotal_ex_tax, 10);
      return ((sub * taxPercent) + sub).toFixed(2);
    },

    get total_ex_tax() {
      return self.subtotal_ex_tax;
    },

    get total_inc_tax() {
      return self.subtotal_inc_tax;
    },
  }))
  .actions(self => ({
    // createBigCcart: flow(function* createBigCcart(item, optionValue) {
    //   try {
    //     // (CORS) error run in terminal:
    //     // open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir
    //     const response = yield window.fetch(`${getParent(self, 1).apiUrl}/carts`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //       },
    //       body: JSON.stringify({
    //         line_items: [
    //           {
    //             quantity: 1,
    //             product_id: item.id,
    //             option_selections: item.options[0] ? [
    //               {
    //                 option_id: item.options[0] ? item.options[0].id : 0,
    //                 option_value: optionValue ? optionValue : 0,
    //               },
    //             ] : [],
    //           },
    //         ],
    //         customer_id: getParent(self, 1).user.id,
    //       }),
    //     });
    //     let json = response;
    //     json = yield json.json();
    //     console.log('Cart Created');
    //     self.id = json.id;
    //     cookies.set('cart', json.id, { path: '/' });
    //     console.log(cookies.get('cart'));
    //     console.log(cookies);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }),

    createCart() {
      cookies.set('cart', { id: 'hello', orderItems: self.items }, { path: '/' });
      self.id = cookies.get('cart').id;
      console.log(cookies);
    },

    updateCart() {
      cookies.set('cart', { id: self.id, orderItems: self.items }, { path: '/' });
      self.id = cookies.get('cart').id;
      console.log(cookies);
    },

    getCart() {
      const cookie = cookies.get('cart');
      console.log(cookie);
      self.id = cookie.id;
      self.items = cookie.orderItems;
    },

    removeCart() {
      self.id = '';
      cookies.remove('cart', { path: '/' });
      console.log(cookies);
    },

    deleteBigCcart: flow(function* deleteBigCcart(cookie) {
      try {
        // (CORS) error run in terminal:
        // open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir
        const response = yield window.fetch(`${getParent(self, 1).apiUrl}/carts/${cookie}`);
        debugger;
        let json = response;
        json = yield json.json();
        console.log(json);
        debugger;
        console.log('Cart Deleted');
        self.id = '';
        cookies.remove('cart', { path: '/' });
        console.log(cookies);
      } catch (err) {
        console.log(err);
      }
    }),

    getBigCcart: flow(function* getBigCcart(cookie) {
      try {
        const response = yield window.fetch(`${getParent(self, 1).apiUrl}/carts/${cookie}`);
        let json = response;
        json = yield json.json();
        self.id = json.id;
        debugger;
        // NEED TO FINISH
        json.line_items.physical_items.map(item => (
          console.log(item)
        ));
      } catch (err) {
        cookies.remove('cart', { path: '/' });
        console.log(err);
      }
    }),

    addToCart({ item, optionValue = 0, quantity }) {
      // Check cart for existing order item
      const prevId = item.item ? item.item : item.id;
      const id = parseInt(prevId + '' + optionValue, 10);
      const existingItem = self.items.find(i => i.id === id);

      // if present increment item count
      if (existingItem) {
        existingItem.addCartQuantity(quantity);
      } else {
        // if not create a new order item
        self.items.push({
          id,
          item: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: quantity ? quantity : 0,
          thumbnail: item.thumbnail_url,
          option_id: item.options[0] ? item.options[0].id : 0,
          option_value: optionValue ? optionValue : 0,
        });
      }

      // create initial cart
      if (!self.id) {
        // self.createBigCcart(item, optionValue);
        self.createCart();
      } else {
        self.updateCart();
      }
    },

    clearCart() {
      // remove all line items from cart
      self.items = [];
      // delete the cart from BigC
      // self.deleteBigCcart(self.id);
      self.removeCart();
    },

    removeFromCart(item) {
      item.removeFromCart();
      self.items = self.items.filter(i => i.id !== item.id);
    },
  }));

export default Cart;
