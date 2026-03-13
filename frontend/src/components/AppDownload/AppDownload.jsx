import React from 'react';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <section className="app-download" id="mobile-app">
      <div className="app-container">
        <div className="app-content">
          <h2>For a Better Experience Download <br /> <span>FastBite App</span></h2>
          <p>
            Get your favorite meals delivered to your doorstep. Track orders in real-time, 
            get exclusive discounts, and enjoy a faster checkout experience.
          </p>
          
          <div className="download-platforms">
            <a className="store-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
            </a>
            <a className="store-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;