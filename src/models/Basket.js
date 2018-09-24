/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
// MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types } from 'mobx-state-tree';
import OrderItem from './OrderItem';


const Basket = types
  .model({
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
    addToBasket({ item }) {
      // Check basket for existing order item
      const prevId = item.item ? item.item : item.id;
      const id = parseInt(prevId, 10);
      const existingItem = self.items.find(i => i.id === id);

      // if present increment
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
        });
      }
    },

    clearBasket() {
      self.items = [];
    },

    removeFromBasket(item) {
      item.removeFromCart();
      self.items = self.items.filter(i => i.id !== item.id);
    },
  }));

export default Basket;
