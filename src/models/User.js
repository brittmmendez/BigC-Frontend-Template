/* eslint-disable no-param-reassign */
// MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types, flow} from 'mobx-state-tree';

const User = types
  .model({
    id: types.optional(types.number, 0),
    firstName: types.optional(types.string, 'Dear'),
    lastName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    loggedIn: false
  })
  .views(self => ({
    get loggedIn() {
      return self.email !== '';
    }
  }))
  .actions(self => ({

    
    setUser(result) {
      self.firstName = result.id;
      self.firstName = result.first_name;
      self.lastName = result.last_name;
      // self.email = result.user.email;
      self.loggedIn = true;
    },
    logOut() {
      self.firstName = 'Deary';
      self.lastName = '';
    },
  
      register: flow(function* register(userInfo) {
         
             try {
                const response = yield window.fetch('https://my-mix-api.herokuapp.com/api/register', {
                  method: 'POST',
                  body: JSON.stringify({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
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
                  console.log("created")
                  const result = yield response.json();
                  this.setUser(result);
                }
              } catch (err) {
                console.log(err)
              }
              console.log("created")
            })
    
  }));

export default User;
