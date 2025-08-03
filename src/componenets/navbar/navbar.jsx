import { useState } from "react";
import "./navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false); // Close menu when a link is clicked (optional)
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="brand">
                    <img src="/images/logo.png" alt="Logo" className="logo-img" />
                    <div className="logo-text">AugmentoR</div>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                    <li><a href="#home" onClick={closeMenu}>Home</a></li>
                    <li><a href="#about" onClick={closeMenu}>About</a></li>
                    <li><a href="#services" onClick={closeMenu}>Services</a></li>
                    <li><a href="/publish/model" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Models</a></li>
                    <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                </ul>

                {/* Hamburger Icon */}
                <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
