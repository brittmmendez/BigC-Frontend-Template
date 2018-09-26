// // MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types } from 'mobx-state-tree';

const OptionValues = types
  .model({
    value_id: types.number,
    value_name: types.optional(types.string, ''),
  });

export default OptionValues;
