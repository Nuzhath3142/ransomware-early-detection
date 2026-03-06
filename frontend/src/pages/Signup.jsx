import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering User:", formData);
        // This will eventually connect to your FastAPI backend [cite: 46]
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>CyberSentinel</h2>
                <p>Create an account to start monitoring</p>
                
                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Choose a username" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="name@company.com" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create a password" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Repeat password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="login-btn">Create Account</button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;