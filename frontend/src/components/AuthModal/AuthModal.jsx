import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ setShowLogin, initialMode, onAuthSuccess }) => {

  const [currState, setCurrState] = useState(initialMode || "Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const endpoint = currState === "Login" 
      ? "/api/user/login" 
      : "/api/user/register";
    
    const url = `http://localhost:5000${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert(responseData.message || "Authentication Successful");
        
        // Prepare user data to send back to App
        const userData = {
          name: responseData.user?.name || data.name || data.email.split('@')[0],
          email: responseData.user?.email || data.email,
          id: responseData.user?.id || responseData.userId || Date.now() // fallback ID
        };
        
        console.log("Sending user data to App:", userData); // Debug log
        
        // Clear form
        setData({
          name: "",
          email: "",
          password: ""
        });
        
        // Pass user data back to App
        onAuthSuccess(userData);
        
      } else {
        alert(responseData.message || "Authentication failed");
      }

    } catch (error) {
      console.error("Connection Error:", error);
      alert("Server is not responding!");
    }
  };

  return (
    <div className='auth-overlay'>
      <form onSubmit={onLogin} className="auth-container">
        <div className="auth-title">
          <h2>{currState}</h2>
          <span className="close-icon" onClick={() => setShowLogin(false)}>
            &times;
          </span>
        </div>

        <div className="auth-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="auth-footer">
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrState("Sign Up")}>
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthModal;