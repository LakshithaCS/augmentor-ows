import "./navbar.css";

function Navbar() {
    return <nav className="navbar">
        <div className="nav-container">
            <div className="brand">
                <img src="/images/logo.png" alt="Logo" className="logo-img" />
                <div className="logo-text">AugmentoR</div>
            </div>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>;

}

export default Navbar;