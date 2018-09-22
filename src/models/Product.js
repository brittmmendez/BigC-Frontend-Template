// /* eslint-disable no-param-reassign */
// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types } from 'mobx-state-tree';
import ProductOptions from './ProductOptions';

const Product = types
  .model({
    id: types.number,
    name: types.string,
    price: types.optional(types.number, 0),
    description: types.optional(types.string, ''),
    thumbnail_url: types.optional(types.string, ''),
    options: types.optional(types.array(ProductOptions), []),
    categories: types.optional(types.array(types.number), []),
    quantity_in_basket: types.optional(types.number, 0),
  })
  .views(self => ({
    get productTotal() {
      const productTotal = self.price * self.quantity_in_basket;
      return productTotal.toFixed(2);
    },

    get uniqueIdentifier() {
      return parseInt(self.id + "" + self.absorbency + "" + self.wing, 10);
    },
  }));

export default Product;
