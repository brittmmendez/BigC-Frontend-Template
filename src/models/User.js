/* eslint-disable no-param-reassign */
// MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types, flow, getParent} from 'mobx-state-tree';

const User = types
  .model({
    id: types.optional(types.number, 0),
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    loggedIn: types.optional(types.boolean, false),
  })
  .views(self => ({
    get loggedInView() {
      return self.loggedIn
    }
  }))
  .actions(self => ({
    logOut() {
      self.id = 0;
      self.firstName = '';
      self.lastName = '';
      self.email = '';
      self.loggedIn = false;
      console.log("logged Out")
    },

    logIn: flow(function* logIn(userInfo) {
      try {
        const response = yield window.fetch(`${getParent(self,1).apiUrl}/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });

        if (response.status === 401) {
          const result = yield response.json();
          console.log(result)
        }

        if (response.status === 200) {
          let result = response;
          result = yield result.json();
          self.id = result.id;
          self.firstName = result.first_name
          self.lastName = result.last_name
          self.email = userInfo.email
          self.loggedIn = true
          console.log("signed in")          
          console.log(result)
        }
      } catch (err) {
        console.log(err)
      }
    }),

    register: flow(function* register(userInfo) {
      try {
        const response = yield window.fetch(`${getParent(self,1).apiUrl}/register`, {
          method: 'POST',
          body: JSON.stringify({
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });

        if (response.status === 400) {
          const result = yield response.json();
          console.log(result)
        }

        if (response.status === 201) {
          let result = response;
          result = yield result.json();
          console.log("created")
          self.id = result.id;
          self.firstName = result.first_name
          self.lastName = result.last_name
          self.email = userInfo.email
          self.loggedIn = true
          console.log(result)
        }
      } catch (err) {
        console.log(err)
      }
    })
  }));

export default User;
