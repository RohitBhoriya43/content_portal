import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ComponentCSS/Navbar.css';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Content Portal</Link>
            </div>
            <div className={`navbar-links ${isMobile ? 'active' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/Content-Create">Content Create</Link>
            </div>
            <div className="navbar-toggle" onClick={handleToggle}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
