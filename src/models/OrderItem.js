// /* eslint-disable no-param-reassign */
// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types } from 'mobx-state-tree';

const OrderItem = types
  .model({
      id: types.maybe(types.number),
      item: types.number, 
      absorbency:  types.maybe(types.number),
      wing: types.maybe(types.number),
      name: types.maybe(types.string,""),
      description: types.maybe(types.string,""),
      thumbnail: types.maybe(types.string, ""),
      quantity: types.optional(types.number, 1),
      price: types.optional(types.number, 0),
      partOfKit: false
  })
  .views(self => ({
    get productTotal() {
      const productTotal = self.price * self.quantity;
      return productTotal.toFixed(2);
    },
  }))
  .actions(self => {
    return {
      addCartQuantity(quantity = 1) {
        self.quantity += quantity;
      },

      lowerCartQuantity() {
        self.quantity -= 1;
      },
      
      removeFromCart() {
        self.quantity_in_basket = 0;
      }
    }
  })

export default OrderItem;
