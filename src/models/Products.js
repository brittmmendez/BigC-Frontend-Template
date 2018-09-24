/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types } from 'mobx-state-tree';
import Product from './Product';

const Products = types
  .model({
    data: types.optional(types.array(Product), []),
  })
  .views(self => ({
    get productCount() {
      return self.data.length;
    },
  }));

export default Products;
