import React, { Component } from "react";
import { observer, inject} from 'mobx-react'

@inject("shop")
@observer
class TotalAmount extends Component {
    render() {
        const { basket } = this.props.shop
        return (
            <div>
                <h3> Subtotal: <strong> ${basket.subtotal_ex_tax} </strong></h3>
                <h2> Total: <strong> ${basket.total_inc_tax} </strong></h2>
                <p>(Shipping included)</p>
            </div>
        )
    }
}

export default TotalAmount;
