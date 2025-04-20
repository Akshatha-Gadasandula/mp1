import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// Declare google as a global variable for ESLint
/* global google */

const BACKEND_URL = 'http://localhost:5000';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [googleError, setGoogleError] = useState(null);

  const handleGoogleResponse = async (response) => {
    try {
      console.log("Google response received:", response);
      
      if (!response.credential) {
        console.error("No credential received from Google");
        setGoogleError("No credential received from Google");
        return;
      }

      const success = await loginWithGoogle(response.credential);
      if (success) {
        console.log("Google login successful, navigating to dashboard...");
        navigate('/dashboard');
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setGoogleError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        console.log("Initializing Google Sign-In...");
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { 
            theme: "outline", 
            size: "large", 
            width: "100%",
            text: "continue_with",
            shape: "rectangular",
          }
        );
      } else {
        console.error("Google Sign-In SDK not loaded");
        setGoogleError("Google Sign-In is not available");
      }
    };

    // Check if Google Identity Services script is already loaded
    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      // If not loaded, wait for it to load
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.onload = initializeGoogleSignIn;
      } else {
        console.error("Google Sign-In script not found");
        setGoogleError("Google Sign-In is not available");
      }
    }

    // Cleanup function
    return () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  return (
    <LoginStyled>
      <div className="login-container">
        <div className="login-content">
          <h2>Sign in to your account</h2>
          {error && <div className="error-message">{error}</div>}
          {googleError && <div className="error-message">{googleError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="submit-btn">
              <button type="submit">Sign in</button>
            </div>
          </form>
          <div className="divider">
            <span>OR</span>
          </div>
          <div className="google-btn">
            <div id="google-signin-button"></div>
          </div>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 246, 249, 0.78);

  .login-container {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .login-content {
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #222260;
    }
  }

  .input-control {
    margin-bottom: 1rem;

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #222260;
      }
    }
  }

  .submit-btn {
    button {
      width: 100%;
      padding: 0.8rem;
      background: #222260;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #2a2a7c;
      }
    }
  }

  .error-message {
    background: #ff6b6b;
    color: white;
    padding: 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background: #ddd;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    span {
      background: white;
      padding: 0 10px;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .google-btn {
    margin-bottom: 1rem;

    .google-signin {
      width: 100%;
      padding: 0.8rem;
      background: white;
      color: #444;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      img {
        width: 24px;
        height: 24px;
      }

      &:hover {
        background: #f8f8f8;
        border-color: #aaa;
      }
    }
  }

  .register-link {
    text-align: center;
    margin-top: 1rem;

    a {
      color: #222260;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
