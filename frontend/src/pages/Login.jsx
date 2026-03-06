import React, { useState } from 'react';
import '../styles/auth.css'; // Ensure this path matches your folder structure

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        // Integrate with your FastAPI backend here [cite: 40, 46]
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>CYBER SENTINEL</h2>
                <p>Please enter your credentials to continue</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="auth-options">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <div className="auth-footer">
                    <span>Don't have an account? </span>
                    <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;