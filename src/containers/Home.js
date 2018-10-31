import React from 'react';
import ShopProductsBtn from '../components/ShopProductsBtn';

const Home = () => (
  <section className="section">
    <div className="container has-text-centered">
      <ShopProductsBtn />
      <h1>
        Welcome, for more information on using this template, please visit
        {' '}
        <a href="https://github.com/brittmmendez/BigC-Frontend-Template" target="_blank" rel="noopener noreferrer">
          README.md
        </a>
      </h1>
    </div>
  </section>
);

export default Home;
