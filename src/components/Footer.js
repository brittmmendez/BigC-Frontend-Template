import React from 'react';
// import Newsletter from '../containers/Newsletter'
import { Link } from "react-router-dom";

const Footer = () => {
        return(
            <footer class="footer is-light">
              <div class="columns has-text-centered">
                <div class="column is-4">
                    <p class="title is-5 is-marginless" >Products </p>
                    <p> <Link  to="/product1"> Product 1 </Link> </p>
                    <p> <Link  to="/product2"> Product 2</Link> </p>
                    <p> <Link  to="/product3"> Product 3</Link> </p>
                    <p> <Link  to="/product4"> Product 4</Link> </p>
                </div>
                <div class="column is-4">
                    <p class="title is-5 is-marginless" >About </p>
                    <p> <Link  to="/about1"> About 1 </Link> </p>
                    <p> <Link  to="/about2"> About 2</Link> </p>
                    <p> <Link  to="/about3"> About 3</Link> </p>
                    <p> <Link  to="/about4"> About 4</Link> </p>
                </div>
                <div class="column is-4">
                    <p class="title is-5 is-marginless" >Support </p>
                    <p> <Link  to="/help"> Help </Link> </p>
                    <p> <Link  to="/product2"> Contact Us</Link> </p>
                </div>
                
            </div>

</footer>

        );
    }
 
export default Footer