import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetRequest = (e) => {
        e.preventDefault();
        // This is where you connect to the Backend Person's API
        console.log("Requesting reset for:", email);
        setMessage("If this email exists in our system, you will receive a reset link shortly.");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                <p>Enter your recovery email address below</p>
                
                {!message ? (
                    <form onSubmit={handleResetRequest}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@company.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="login-btn">Send Reset Link</button>
                    </form>
                ) : (
                    <div className="success-message">
                        <p>{message}</p>
                    </div>
                )}

                <div className="auth-footer">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;