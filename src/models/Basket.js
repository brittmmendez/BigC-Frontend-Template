/* eslint-disable no-param-reassign */
// MobX-State-Tree uses reassignment to self. Disable that rule for model files
import { types } from 'mobx-state-tree';
import OrderItem from './OrderItem'


const Basket = types
  .model({
    items: types.optional(types.array(OrderItem), []),
  })
  .views(self => ({
    get itemCount() {
      let totalQuantity = 0;
      self.items.map(i => totalQuantity += i.quantity);
      return totalQuantity;
    },
    
    get subTotal() {
      let sub = 0.0;
      self.items.map(i => {
        sub += i.price * i.quantity;
        return sub;
      });
      return sub.toFixed(2);
    }
  }))
  .actions(self => {
    function addToBasket({item}) {
      // Check basket for existing order item
      const prevId = item.item ? item.item : item.id;
      const id = parseInt(prevId, 10);
      const existingItem = self.items.find(i => i.id === id);

      // if present increment
      if (existingItem){
        existingItem.addCartQuantity(1);
      } else {
        // if not create a new order item      
        self.items.push({
          id: id,
          item: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail_url,
        })
        console.log("Added Item to Cart:")
        console.log({
          id: id,
          item: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail_url,
        })
      }  
    }

      function clearBasket(){
      self.items= []
    }

    function removeFromBasket(item) {
        item.removeFromCart();
        self.items = self.items.filter(i => i.id !== item.id)
      }
      return { addToBasket, clearBasket, removeFromBasket };
    });
  
  export default Basket;
