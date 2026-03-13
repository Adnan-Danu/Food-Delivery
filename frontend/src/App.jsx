import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import CartPage from './components/CartPage/CartPage';
import dummyData from './dishes.json';
import './App.css';
import AppDownload from './components/AppDownload/AppDownload';
import Footer from './components/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';

function App() {
  const [dishes, setDishes] = useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("Sign Up");
  
  // Start with null - NO AUTO LOGIN
  const [currentUser, setCurrentUser] = useState(null);

  // Create refs for different sections
  const menuRef = useRef(null);
  const appDownloadRef = useRef(null);
  const footerRef = useRef(null);

  // Scroll functions
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAppDownload = () => {
    appDownloadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Load user's cart ONLY when they manually log in
  useEffect(() => {
    if (currentUser) {
      const userCartKey = `cart_${currentUser.email}`;
      const savedCart = localStorage.getItem(userCartKey);
      
      if (savedCart) {
        const savedQuantities = JSON.parse(savedCart);
        const updatedDishes = dishes.map(dish => ({
          ...dish,
          quantity: savedQuantities[dish.id] || 0
        }));
        setDishes(updatedDishes);
      } else {
        const resetDishes = dishes.map(dish => ({ ...dish, quantity: 0 }));
        setDishes(resetDishes);
      }
    }
  }, [currentUser]);

  // Save cart whenever dishes change
  useEffect(() => {
    if (currentUser) {
      const cartQuantities = {};
      dishes.forEach(dish => {
        if (dish.quantity > 0) {
          cartQuantities[dish.id] = dish.quantity;
        }
      });
      
      const userCartKey = `cart_${currentUser.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartQuantities));
    }
  }, [dishes, currentUser]);

  const updateQuantity = (id, qty) => {
    const updatedDishes = dishes.map(d =>
      d.id === id ? { ...d, quantity: Math.max(0, qty) } : d
    );
    setDishes(updatedDishes);
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowLogin(true);
  };

  const handleAuthSuccess = (userData) => {
    const user = {
      name: userData.name || userData.user?.name || userData.email?.split('@')[0] || "User",
      email: userData.email || userData.user?.email || "",
      id: userData.id || userData.user?.id || Date.now()
    };
    
    setCurrentUser(user);
    setShowLogin(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setIsModalOpen(false);
    
    const resetDishes = dishes.map(dish => ({ ...dish, quantity: 0 }));
    setDishes(resetDishes);
  };

  const handleCartClick = () => {
    if (!currentUser) {
      openAuth("Login");
    } else {
      setIsModalOpen(true);
    }
  };

  const cartItems = dishes.filter(d => d.quantity > 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  return (
    <div className="App">

      {/* Authentication Modal */}
      {showLogin && (
        <AuthModal
          setShowLogin={setShowLogin}
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Navbar with scroll functions */}
      <Navbar
        cartItems={cartItems}
        onCartClick={handleCartClick}
        onLoginClick={openAuth}
        currentUser={currentUser}
        logout={logout}
        onMenuClick={scrollToMenu}
        onAppClick={scrollToAppDownload}
        onContactClick={scrollToFooter}
      />

      <Hero onOrderNow={scrollToMenu} />

      {/* Menu / Cart Page */}
      <div ref={menuRef}>
        <CartPage dishes={dishes} updateQuantity={updateQuantity} />
      </div>

      {/* Cart Modal */}
      {isModalOpen && currentUser && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <div className="modal-body">
              <div className="modal-items-section">
                <h2>{currentUser.name}'s Basket 🧺</h2>
                <div className="items-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="modal-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-meta">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-summary-section">
                <h3>Order Summary</h3>
                <div className="summary-details">
                  <div className="detail-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Tax</span>
                    <span>$2.50</span>
                  </div>
                  <hr />
                  <div className="detail-row total">
                    <span>Total</span>
                    <span>${(subtotal + 2.5).toFixed(2)}</span>
                  </div>
                </div>
                <button className="confirm-btn">Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Download Section */}
      <div ref={appDownloadRef}>
        <AppDownload />
      </div>

      {/* Footer Section */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default App;