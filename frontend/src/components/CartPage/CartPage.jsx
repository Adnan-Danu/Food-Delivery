import React from 'react';
import './CartPage.css';

const CartPage = ({ dishes, updateQuantity }) => {
  
  // Separate data based on category
  const foodItems = dishes.filter(item => item.category === "food");
  const drinkItems = dishes.filter(item => item.category === "drink");
  const dipItems = dishes.filter(item => item.category === "dip");

  // Reusable function to render each section
  const renderSection = (title, items) => (
    <>
      <h2 className="section-title">{title}</h2>
      <div className="menu-grid">
        {items.map((dish) => (
          <div key={dish.id} className="food-box">
            <div className="image-container">
              <img src={dish.image} alt={dish.name} />
            </div>
            <div className="food-info">
              <h3>{dish.name}</h3>
              <p className="food-price">${dish.price.toFixed(2)}</p>
              
              {dish.quantity === 0 ? (
                <button className="main-add-btn" onClick={() => updateQuantity(dish.id, 1)}>
                  Add to Cart
                </button>
              ) : (
                <div className="qty-controller">
                  <button onClick={() => updateQuantity(dish.id, dish.quantity - 1)}>-</button>
                  <span>{dish.quantity}</span>
                  <button onClick={() => updateQuantity(dish.id, dish.quantity + 1)}>+</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="cart-page" id="menu-section">
      {foodItems.length > 0 && renderSection("🍕 Signature Dishes", foodItems)}
      {drinkItems.length > 0 && renderSection("🥤 Cold Beverages", drinkItems)}
      {dipItems.length > 0 && renderSection("🍯 Extra Dips", dipItems)}
    </div>
  );
};

export default CartPage;