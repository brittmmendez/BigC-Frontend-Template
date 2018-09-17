import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";

@inject("shop")
@observer
class ProductItemView extends Component {
  render() {
    const { product } = this.props;
    return (
    <div>
        
            <Link key={product.id} to={`/products-page/${product.id}`}>
                <h4> {product.name} </h4>
                <img src={product.thumbnail_url} alt="img" width="150px" height="150px"/>
            </Link>
            <p>${product.price.toFixed(2)} </p>
        
    </div>
   ); 
  }
}

export default ProductItemView;
