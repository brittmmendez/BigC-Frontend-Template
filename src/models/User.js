// MobX-State-Tree uses reassignment to self. Disable that rule for model files
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { types, flow, getParent } from 'mobx-state-tree';
import { Cookies } from 'react-cookie';

const User = types
  .model({
    id: types.optional(types.number, 0),
    first_name: types.optional(types.string, ''),
    last_name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    registerError: types.optional(types.boolean, false),
    logInError: types.optional(types.boolean, false),
    loggedIn: types.optional(types.boolean, false),
    token: types.optional(types.string, ''),
  })
  .actions(self => ({
    logOut() {
      self.id = 0;
      self.first_name = '';
      self.last_name = '';
      self.email = '';
      self.loggedIn = false;
      self.token = '';
      const cookies = new Cookies();
      cookies.remove('token');
      console.log(cookies);
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
          self.logInError = true;
          console.log(result);
          return false;
        }

        if (response.status === 200) {
          let result = response;
          result = yield result.json();
          self.id = result.customer.id;
          self.first_name = result.customer.first_name;
          self.last_name = result.customer.last_name;
          self.email = userInfo.email;
          self.token = result.token;
          self.logInError = false;
          self.loggedIn = true;
          console.log('signed in');
          console.log(result);
          const cookies = new Cookies();
          cookies.set('token', result.token, { path: '/' });
          console.log(cookies.get('token'));
          return true;
        }
      } catch (err) {
        self.logInError = true;
        console.log(err);
        return false;
      }
      self.logInError = false;
      return true;
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
          self.registerError = true;
          console.log(result);
          return false;
        }

        if (response.status === 201) {
          let result = response;
          result = yield result.json();
          self.id = result.customer.id;
          self.first_name = result.customer.first_name;
          self.last_name = result.customer.last_name;
          self.email = userInfo.email;
          self.registerError = false;
          console.log('created');
          console.log(result);
          return true;
        }
      } catch (err) {
        self.registerError = true;
        console.log(err);
        return false;
      }
      self.registerError = false;
      return true;
    }),
  }));

export default User;
