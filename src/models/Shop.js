import { types, flow } from 'mobx-state-tree';
// import User from './User';
import Products from './Products';
import Basket from './Basket';
import Checkout from './Checkout';
import User from './User';


const Shop = types
  .model({
    user: types.optional(User, {}),
    checkout: types.optional(Checkout, {}),
    products: types.optional(Products, { data: [] }),
    basket: types.optional(Basket, {}),
    apiUrl: 'https://my-mix-api.herokuapp.com/api'
  }).actions(self => {
      return {
        getProducts: flow(function* getProducts() {
          if (self.products.productCount === 0) {
            const response = yield fetch('https://my-mix-api.herokuapp.com/api/products')
            const json = yield response.json();
            console.log("Loaded Items")
            console.log(json)
            self.products.data = json;
          }
        }),

        prepItems () {
          let items = self.basket.items.map(item => (
            {"product_id" : item.item,
              "quantity": item.quantity
            }
          ))
          console.log("All Items")
          console.log([...items])
          return items
        },

        prepOrder() {
          let request = {
            "customer_id": 0,
            "order_total": {
                "subtotal_ex_tax": parseFloat(self.basket.subTotal),
                "subtotal_inc_tax": parseFloat(self.basket.subTotal),
                "total_ex_tax": parseFloat(self.basket.subTotal),
                "total_inc_tax": parseFloat(self.basket.subTotal),
            },
            "billing_address": {
                "first_name": self.checkout.shippingInfo.first_name,
                "last_name": self.checkout.shippingInfo.last_name,
                "street_1": self.checkout.shippingInfo.street_1,
                "street_2": self.checkout.shippingInfo.street_2,
                "city": self.checkout.shippingInfo.city,
                "state": self.checkout.shippingInfo.state,
                "zip": self.checkout.shippingInfo.zip,
                "country": self.checkout.shippingInfo.country,
                "phone": self.checkout.shippingInfo.phone,
                "email": self.checkout.shippingInfo.email,
            },
            "shipping_addresses": [
                {
                  "first_name": self.checkout.billingInfo.first_name,
                  "last_name": self.checkout.billingInfo.last_name,
                  "street_1": self.checkout.billingInfo.street_1,
                  "street_2": self.checkout.billingInfo.street_2,
                  "city": self.checkout.billingInfo.city,
                  "state": self.checkout.billingInfo.state,
                  "zip": self.checkout.billingInfo.zip,
                  "country": self.checkout.billingInfo.country,
                  "phone": self.checkout.billingInfo.phone,
                  "email": self.checkout.billingInfo.email,
            }
            ],
            "products": self.prepItems()
        };
        console.log("Order Request Prepped");
        console.log(request);
        return request;
        },
        

        proccessOrder: flow(function* proccessOrder() {
          console.log("Prepping Order!")
          let request = self.prepOrder()

          try{
            const response = yield fetch('https://my-mix-api.herokuapp.com/api/orders',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(request)
            })
            let json = response;
            json = yield json.json();
            console.log("Order Confirmed");
            console.log(json);
  
            self.createOrderConfirmation(json);
            self.basket.clearBasket();
          }catch (err) {
            console.log("ERROR!!!!" + err)
          }
        }),

          createOrderConfirmation(json){
            
              let confirmation = {
                order_id: json.id,
                customer_id: json.customer_id,
                status_id: json.status_id,
                status: json.status,
                total: json.total_inc_tax,
                first_name: json.billing_address.first_name,
              }
              
              self.checkout.orderConfirmation = confirmation
          },

      // MobX State Tree Lifecycle methods
      afterCreate() {
        self.load();
      },
      load() {
        self.getProducts()
      },
      reload() {
        self.load();
      },
    }});
export default Shop;