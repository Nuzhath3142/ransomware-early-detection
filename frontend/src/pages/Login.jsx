import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Add useNavigate here

function Login() {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
    // In the future, this is where you verify credentials with FastAPI
    console.log("Logging in...");
    
    // 3. This line sends the user to the dashboard
    navigate('/dashboard'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>CyberSentinel</h2>
        <form onSubmit={handleLogin}> {/* 4. Ensure the form uses handleLogin */}
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="username" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="auth-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;