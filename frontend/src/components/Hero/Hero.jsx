
import React from 'react'
import './Hero.css';

const Hero = ({onOrderNow}) => {
 
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Delicious Food, Delivered Fast 🍔</h1>
        <p>Order your favorite meals from the best restaurants in town.</p>
        <button className="hero-btn" onClick={onOrderNow}>
          Order Now
        </button>
      </div>
    </section>
  );
}
 
export default Hero;

