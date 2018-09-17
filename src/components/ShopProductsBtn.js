import React from "react";
import { Link } from "react-router-dom";

const ShopProductsBtn = () => {
    return (
        <Link className="button is-dark" to="/products-page">
            Shop Products
        </Link>           
    );
}

export default ShopProductsBtn;
