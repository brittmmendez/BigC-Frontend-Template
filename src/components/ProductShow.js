import React, { Component } from 'react';
import { observer, inject} from 'mobx-react'
import PurchaseForm from '../containers/PurchaseForm'

@inject("shop")
@observer
class ProductShow extends Component {
    onProductButtonClick(product) {
        const { shop } = this.props;
        shop.basket.addToBasket(product);
      }
    
    render(){
        const { shop, match} = this.props;
        let params= parseInt(match.params.productId, 10);
        let product = shop.products.data.filter(product => product.id === params)[0]
        let description = product.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
        return (
            <div>
                <h2>{product.name}</h2>    
                <img src={product.thumbnail_url} alt="img" width="150px" height="150px"/>
                <h3>{description}</h3>
                <h4>${product.price.toFixed(2)} </h4>
                <PurchaseForm product={product} />
            </div>
        )
    }
}

export default ProductShow;
