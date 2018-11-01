// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types } from 'mobx-state-tree';
import Product from './Product';

const Products = types
  .model({
    data: types.optional(types.array(Product), []),
    sort: types.optional(types.string, ''),
    filter: types.optional(types.string, ''),
    filterValue: types.optional(types.string, ''),
    searchTerm: types.optional(types.string, ''),
  })
  .actions(self => ({
    updateSort(sort) {
      self.sort = sort;
    },
    updateFilter(filter) {
      self.filter = filter;
    },
    updateSearch(search) {
      self.searchTerm = search;
    },
    updateFilterValue(value) {
      self.filterValue = value;
    },
    resetSort() {
      self.sort = ('');
    },
    resetFilter() {
      self.filter = ('');
    },
    resetSearch() {
      self.searchTerm = ('');
    },
    resetProductList() {
      self.resetSort();
      self.resetFilter();
      self.resetSearch();
    },
  }))
  .views(self => ({
    get productCount() {
      return self.data.length;
    },
  }));

export default Products;
