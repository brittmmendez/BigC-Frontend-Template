// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types } from 'mobx-state-tree';

const OrderConfirmation = types
  .model({
    order_id: types.optional(types.number, 0),
    customer_id: types.optional(types.number, 0),
    status_id: types.optional(types.number, 0),
    status: types.optional(types.string, ''),
    total: types.optional(types.string, ''),
    first_name: types.optional(types.string, ''),
    // street_1: types.optional(types.string,''),
    // street_2: types.optional(types.string,''),
    // city: types.optional(types.string,''),
    // state: types.optional(types.string,''),
    // zip: types.optional(types.string,''),
  });

export default OrderConfirmation;
