// /* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
// // MobX-State-Tree uses reassignment to self. Disable that rule for model files

const Product = types
  .model({
    id: types.number,
    name: types.string,
    price: types.optional(types.number, 0),
    description: types.optional(types.string, ''),
    thumbnail_url: types.optional(types.string, ""),
    quantity_in_basket: types.optional(types.number, 0),
  })
  .views(self => ({
    get productTotal() {
      const productTotal = self.price * self.quantity_in_basket;
      return productTotal.toFixed(2);
    },

    get uniqueIdentifier() {
      return parseInt(self.id + "" + self.absorbency + "" + self.wing, 10);
    }
  }));

export default Product;
