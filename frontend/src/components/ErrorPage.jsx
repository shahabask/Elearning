import React from 'react';
import './ErrorPage.css';
import { Link, useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const tutor = location.pathname.startsWith("/tutor");
    const admin = location.pathname.startsWith("/admin");

    return (
        <div className="error-container error-page">
            <div className="error-content error-page">
                <h1>404</h1>
                <h2 style={{ fontSize: '30px', color: '#333' }}>Page Not Found</h2>
                <p>Oops! The page you are looking for does not exist.</p>
                {admin ? (
                    <Link to="/admin">Go back to Login</Link>
                ) : tutor ? (
                    <Link to="/tutor">Go back to Login</Link>
                ) : (
                    <Link to="/login">Go back to Home</Link>
                )}
            </div>
        </div>
    );
};

export default ErrorPage;
