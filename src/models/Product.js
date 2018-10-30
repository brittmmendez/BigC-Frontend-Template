// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types } from 'mobx-state-tree';
import ProductOptions from './ProductOptions';

const Product = types
  .model({
    id: types.number,
    name: types.string,
    price: types.optional(types.number, 0),
    description: types.optional(types.string, ''),
    // thumbnail_url: types.optional(types.string, ''),
    // if you have options, ex: sizes or colors
    options: types.optional(types.array(ProductOptions), []),
    // if you have categories that you'd like to filter by , ex jeans or shirts
    categories: types.optional(types.array(types.number), []),
    quantity_in_cart: types.optional(types.number, 0),
  })
  .views(self => ({
    get productTotal() {
      const productTotal = self.price * self.quantity_in_cart;
      return productTotal.toFixed(2);
    },
  }));

export default Product;
