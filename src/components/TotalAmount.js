import React, { Component } from "react";
import { observer, inject} from 'mobx-react'

@inject("shop")
@observer
class TotalAmount extends Component {
  render() {
    const { basket } = this.props.shop
    return (
      <div className="section has-text-centered is-paddingless">
        <h3> Subtotal: <strong> ${basket.subtotal_ex_tax} </strong></h3>
        <h2> Total: <strong> ${basket.total_inc_tax} </strong></h2>
      </div>
    )
  }
}

export default TotalAmount;
