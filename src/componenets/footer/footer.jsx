// Footer.js
import React from "react";
import "./footer.css";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Left: Social Icons */}
      <div className="footer-left">
        <a href="https://www.facebook.com/profile.php?id=61559110691259&mibextid=JRoKGi" target="_blank"><FaFacebookF /></a>
        <a href="https://wa.me/+94716010833?text=Hi!%20I%E2%80%99m%20interested%20in%20finding%20out%20more%20about%20what%20AugmentoR%20offers.%20Can%20you%20provide%20more%20details%3F" target="_blank"><FaWhatsapp /></a>
        <a href="mailto:info.augmentor@rvinnovations.net" target="_blank"><MdEmail /></a>
        <a href="https://www.instagram.com/augmentor_byrv?igsh=MTU3ZmlhcHc2aTE1aw==" target="_blank"><FaInstagram /></a>
        <a href="https://www.tiktok.com/@augmentor_byrv?_t=8mc0bZIfLCK&_r=1 " target="_blank"><FaTiktok /></a>
      </div>

      {/* Middle: Text */}
      <div className="footer-middle">
        <p> © 2025 RV Innovations · All rights reserved · A flagship product of RV Innovations </p>
      </div>

      {/* Right: Links */}
      <div className="footer-right">
        <a href="https://sites.google.com/view/augmentor-by-rv-innovations/home" target="_blank">Terms</a> |
        <a href="https://sites.google.com/view/augmentor-by-rv-innovations/home" target="_blank">Privacy</a> |
        <a href="https://www.freeprivacypolicy.com/live/26373996-deee-475b-86ca-fb58dad44725" target="_blank">Cookies</a>
      </div>
    </footer>
  );
}
