import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// Declare google as a global variable for ESLint
/* global google */

const BACKEND_URL = 'http://localhost:5000';
const GOOGLE_CLIENT_ID = "596079188368-2hh5360q26vpb2c4dv9tm3vv3v4jsiso.apps.googleusercontent.com";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, error, loginWithGoogle } = useAuth();
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
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setGoogleError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await register(
      formData.username,
      formData.email,
      formData.password
    );
    if (success) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        console.log("Initializing Google Sign-In...");
        console.log("Using Client ID:", GOOGLE_CLIENT_ID);
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { 
            theme: "outline", 
            size: "large", 
            width: "100%",
            text: "signup_with",
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
    <RegisterStyled>
      <div className="register-container">
        <div className="register-content">
          <h2>Create your account</h2>
          {error && <div className="error-message">{error}</div>}
          {googleError && <div className="error-message">{googleError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
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
              <div className="password-requirements">
                <p>Password must:</p>
                <ul>
                  <li>Be at least 6 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one number</li>
                  <li>Contain at least one special character</li>
                </ul>
              </div>
            </div>
            <div className="input-control">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <div className="submit-btn">
              <button type="submit">Register</button>
            </div>
          </form>
          <div className="divider">
            <span>OR</span>
          </div>
          <div className="google-btn">
            <div id="google-signin-button"></div>
          </div>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </RegisterStyled>
  );
};

const RegisterStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(252, 246, 249, 0.78);

  .register-container {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .register-content {
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

  .login-link {
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

  .password-requirements {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    font-size: 0.85rem;
    color: #666;

    p {
      margin-bottom: 0.3rem;
      color: #222260;
      font-weight: 500;
    }

    ul {
      list-style: none;
      padding-left: 0.5rem;
      
      li {
        margin: 0.2rem 0;
        &:before {
          content: "•";
          color: #222260;
          margin-right: 0.5rem;
        }
      }
    }
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
`;

export default Register;
