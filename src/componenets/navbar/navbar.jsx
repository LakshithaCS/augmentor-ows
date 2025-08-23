import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { googleLogout } from "@react-oauth/google";

import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userProfile, setUserProfile] = useState({
    sub: "",
    name: "",
    given_name: "",
    family_name: "",
    picture: "",
    email: "",
    email_verified: false,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Close menu when a link is clicked (optional)
  };

  const logOut = () => {
    handleClose();
    googleLogout();
    localStorage.removeItem("GOOGLE_USER_INFO");
    window.location.reload();
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const userinfo = localStorage.getItem("GOOGLE_USER_INFO");

    if (userinfo && userinfo !== undefined) {
      let user = JSON.parse(userinfo);
      setUserProfile(user);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">
          <img src="/images/logo.png" alt="Logo" className="logo-img" />
          <div className="logo-text">AugmentoR</div>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          {userProfile.name.length !== 0 ? (
            <li
              style={{
                margin: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingLeft: "0px",
              }}
              className="d-flex d-lg-none"
            >
              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4CAF50",
                  }}
                >
                  Hi, {userProfile.name}
                </span>
              </div>
            </li>
          ) : (
            <li style={{ marginTop: "30px" }}></li>
          )}
          <li>
            <a href="/#home" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/#services" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="/publish/model" onClick={closeMenu}>
              Models
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>

          {userProfile.name.length !== 0 && <li className="logout-item">
            <a onClick={logOut}>
              Logout
            </a>
          </li>}
        </ul>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="profile d-none d-lg-block">
        {!userProfile.photo == "" && (
          <>
            <div className="row">
              <div className="col-3">
                <Avatar alt={userProfile.name} src={userProfile.photo} />
              </div>
              <div className="col-2">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <ArrowDropDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    <h5>{userProfile.name}</h5>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </div>
                </Menu>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
