// MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types, flow, getParent } from 'mobx-state-tree';
import { Cookies } from 'react-cookie';
import OrderItem from './OrderItem';

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
    createCart: flow(function* createCart(item, optionValue) {
      try {
        // (CORS) error run in terminal:
        // open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir
        const response = yield window.fetch(`${getParent(self, 1).apiUrl}/carts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            line_items: [
              {
                quantity: 1,
                product_id: item.id,
                option_selections: item.options[0] ? [
                  {
                    option_id: item.options[0] ? item.options[0].id : 0,
                    option_value: optionValue ? optionValue : 0,
                  },
                ] : [],
              },
            ],
            customer_id: getParent(self, 1).user.id,
          }),
        });
        let json = response;
        json = yield json.json();
        console.log('Cart Created');
        self.id = json.id;
        const cookies = new Cookies();
        cookies.set('cart', json.id, { path: '/' });
        console.log(cookies.get('cart'));
        console.log(json);
        console.log(cookies);
      } catch (err) {
        console.log(err);
      }
    }),

    addToCart({ item, optionValue = 0 }) {
      // create initial cart
      if (self.items.length === 0) {
        self.createCart(item, optionValue);
      }

      // Check cart for existing order item
      const prevId = item.item ? item.item : item.id;
      const id = parseInt(prevId + '' + optionValue, 10);
      const existingItem = self.items.find(i => i.id === id);

      // if present increment item count
      if (existingItem) {
        existingItem.addCartQuantity(1);
      } else {
        // if not create a new order item
        self.items.push({
          id,
          item: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail_url,
          option_id: item.options[0] ? item.options[0].id : 0,
          option_value: optionValue ? optionValue : 0,
        });
      }
    },

    clearCart() {
      self.items = [];
      self.id = '';
      // const cookies = new Cookies();
      // cookies.remove('cart');
      // console.log(cookies);
    },

    removeFromCart(item) {
      item.removeFromCart();
      self.items = self.items.filter(i => i.id !== item.id);
    },
  }));

export default Cart;
