// import React, { Component } from "react";
// import { observer, inject} from 'mobx-react'
// import "../static/App.css";
// import { Link } from "react-router-dom";

// @inject("shop")
// @observer
// export default class Payment extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       cardnum: "",
//       expiry: "",
//       cvc: ""
//     };
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const { shop } = this.props;
//     shop.proccessOrder();
//     this.props.history.push('/order-confirmation')
//   }
//   render() {
//     if (this.props.shop.basket.items.length > 0) {
//     return (
//       <div className="form">
//         <form onSubmit={this.handleSubmit}>
//           <FormGroup controlId="cardnum" bsSize="large">
//             <ControlLabel>Card Number</ControlLabel>
//             <FormControl
//               autoFocus
//               type="cardnum"
//               value={this.state.cardnum}
//               onChange={this.handleChange}
//               placeholder="1234 1234 1234 1234"
//             />
//           </FormGroup>
//           <FormGroup controlId="expiry" bsSize="large">
//             <ControlLabel>Expiry Date</ControlLabel>
//             <FormControl
//               value={this.state.expiry}
//               onChange={this.handleChange}
//               type="expiry"
//               placeholder="MM / YY"
//             />
//           </FormGroup>
//           <FormGroup controlId="cvc" bsSize="large">
//             <ControlLabel>Card Code (CVC)</ControlLabel>
//             <FormControl
//               autoFocus
//               type="cvc"
//               value={this.state.cvc}
//               onChange={this.handleChange}
//               placeholder="CVC"
//             />
//           </FormGroup>
//           <Button
//           id="addToCart"
//             block
//             bsSize="large"
//             type="submit"
//           >
//             Submit Order
//           </Button>
//         </form>
//         <h5> <a href="/my-cart">Back to Cart</a> </h5>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <h1>Payment</h1>
//       <h3>Sorry, there are no items in your cart!</h3>
//       <Link to="/products-page"> 
//         <button className="button is-dark" block bsSize="large">
//           Shop Products
//         </button>
//       </Link>
      
//     </div>
//   );
// }
// };




// //   render() {
// //     if (this.props.shop.basket.items.length > 0) {
// //     return (
// //       <div className="form">
// //         <form onSubmit={this.handleSubmit}>
// //           <FormGroup controlId="cardnum" bsSize="large">
// //             <ControlLabel>Card Number</ControlLabel>
// //             <FormControl
// //               autoFocus
// //               type="cardnum"
// //               value={this.state.cardnum}
// //               onChange={this.handleChange}
// //               placeholder="1234 1234 1234 1234"
// //             />
// //           </FormGroup>
// //           <FormGroup controlId="expiry" bsSize="large">
// //             <ControlLabel>Expiry Date</ControlLabel>
// //             <FormControl
// //               value={this.state.expiry}
// //               onChange={this.handleChange}
// //               type="expiry"
// //               placeholder="MM / YY"
// //             />
// //           </FormGroup>
// //           <FormGroup controlId="cvc" bsSize="large">
// //             <ControlLabel>Card Code (CVC)</ControlLabel>
// //             <FormControl
// //               autoFocus
// //               type="cvc"
// //               value={this.state.cvc}
// //               onChange={this.handleChange}
// //               placeholder="CVC"
// //             />
// //           </FormGroup>
// //           <Button
// //           id="addToCart"
// //             block
// //             bsSize="large"
// //             type="submit"
// //           >
// //             Submit Order
// //           </Button>
// //         </form>
// //         <h5> <a href="/my-cart">Back to Cart</a> </h5>
// //       </div>
// //     );
// //   }
// //   return (
// //     <div>
// //       <h1>Payment</h1>
// //       <h3>Sorry, there are no items in your cart!</h3>
// //       <Link to="/products-page"> 
// //         <Button className="start-trail-button" block bsSize="large">
// //           Shop Products
// //         </Button>
// //       </Link>
// //     </div>
// //   );
// // }
// // };