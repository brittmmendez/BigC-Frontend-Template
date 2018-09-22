/* eslint-disable no-param-reassign */
// MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types, flow, getParent } from 'mobx-state-tree';

const User = types
  .model({
    id: types.optional(types.number, 0),
    first_name: types.optional(types.string, ''),
    last_name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    loggedIn: types.optional(types.boolean, false),
    token: types.optional(types.string, ''),
  })
  .views(self => ({
    get loggedInView() {
      return self.loggedIn;
    },
  }))
  .actions(self => ({
    logOut() {
      self.id = 0;
      self.first_name = '';
      self.last_name = '';
      self.email = '';
      self.loggedIn = false;
      self.token = '';
      console.log('logged Out');
    },

    logIn: flow(function* logIn(userInfo) {
      try {
        const response = yield window.fetch(`${getParent(self, 1).apiUrl}/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.status === 401) {
          const result = yield response.json();
          console.log(result);
        }

        if (response.status === 200) {
          let result = response;
          result = yield result.json();
          self.id = result.customer.id;
          self.first_name = result.customer.first_name;
          self.last_name = result.customer.last_name;
          self.email = userInfo.email;
          self.token = result.token;
          self.loggedIn = true;
          console.log('signed in');
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }),

    register: flow(function* register(userInfo) {
      try {
        const response = yield window.fetch(`${getParent(self, 1).apiUrl}/register`, {
          method: 'POST',
          body: JSON.stringify({
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.status === 400) {
          const result = yield response.json();
          console.log(result);
        }

        if (response.status === 201) {
          let result = response;
          result = yield result.json();
          console.log('created');
          self.id = result.customer.id;
          self.first_name = result.customer.first_name;
          self.last_name = result.customer.last_name;
          self.email = userInfo.email;
          self.loggedIn = true;
          self.token = result.token;
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }),
  }));

export default User;
