import React from 'react';
import './Navbar.css';

const Navbar = ({ 
  cartItems = [], 
  onCartClick, 
  onLoginClick, 
  currentUser, 
  logout,
  onMenuClick,
  onAppClick,
  onContactClick,
  onLogoClick,
  activeSection 
}) => {

  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo - now clickable to go to hero section */}
        <div className="logo" onClick={onLogoClick}>
          <span className="logo-icon">🍕</span>
          <span className="logo-text">FastBite</span>
        </div>

        {/* Center Links - Now with active state */}
        <div className="nav-links">
          <span 
            className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`} 
            onClick={onMenuClick}
          >
            Menu
          </span>
          <span 
            className={`nav-link ${activeSection === 'app' ? 'active' : ''}`} 
            onClick={onAppClick}
          >
            Mobile App
          </span>
          <span 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
            onClick={onContactClick}
          >
            Contact Us
          </span>
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {currentUser ? (
            <div className="user-nav-section">
              <div className="user-info">
                <span className="welcome-text">Welcome,</span>
                <span className="user-name">{currentUser.name}</span>
              </div>
              
              {/* Cart */}
              <div
                className="cart-icon-wrapper"
                onClick={onCartClick}
                title="View Cart"
              >
                <span className="cart-emoji">🛒</span>
                {totalCount > 0 && (
                  <span className="cart-count-badge">
                    {totalCount}
                  </span>
                )}
              </div>

              {/* Logout */}
              <button className="logout-btn" onClick={logout} title="Logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <span className="nav-link" onClick={() => onLoginClick("Login")}>
                Login
              </span>
              <button className="signup-btn" onClick={() => onLoginClick("Sign Up")}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;