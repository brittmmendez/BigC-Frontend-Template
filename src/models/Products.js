// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
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
