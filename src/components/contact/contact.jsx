import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SvgIcon from "@mui/material/SvgIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import "./contact.css";

function TikTokIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <path
        d="M412.19 109.65a109.49 109.49 0 01-63.26-20.28v178.79c0 79.93-64.73 144.66-144.66 144.66S59.61 348.09 59.61 268.16c0-73.55 54.36-134.49 125.19-143.6v74.63c-29.77 8.32-51.46 35.43-51.46 68.97 0 39.69 32.18 71.87 71.87 71.87s71.87-32.18 71.87-71.87V0h71.85c0 30.64 12.29 60.02 34.26 81.79 18.71 18.52 43.03 29.64 68.99 32.38v73.4c-13.41 0-26.8-1.57-39.9-4.67z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="section"
      style={{ textAlign: "center", minHeight: "100vh" }}
    >
      <h2>Contact Us</h2>

      <div style={{ maxWidth: "1200px", margin: "0 auto", color: "#fff" }}>
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: "2",
            marginBottom: "3rem",
            opacity: 0.95,
          }}
        >
          Ready to step into the future? Let's create something amazing
          together. We'd Love to Hear From You! At AugmentoR, we're always here
          to help you explore the world of augmented reality. Whether you have
          questions, need support, or want to collaborate, our team is ready to
          assist you. Here’s how you can get in touch with us:
        </p>

        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          General Inquiries
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          For any questions about AugmentoR, whether you're a user looking to
          enhance your AR experience using our app or services, enjoying AR
          content or sharing your thoughts, feel free to reach out, we're here
          to help you every step of the way.
        </p>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a
            href="mailto:info.augmentor@rvinnovations.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <EmailIcon style={{ marginRight: "8px" }} />{" "}
            info.augmentor@rvinnovations.net
          </a>
        </div>

        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          Support
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          Experiencing technical issues or need assistance with your account?
          Our support team is ready to provide the help you need. We're
          dedicated to ensuring your AugmentoR experience is seamless and
          enjoyable.
        </p>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a
            href="mailto:support.augmentor@rvinnovations.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <EmailIcon style={{ marginRight: "8px" }} />{" "}
            support.augmentor@rvinnovations.net
          </a>
        </div>

        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          Partner with Us
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          Interested in partnering with AugmentoR for events, brand promotions,
          or AR experiences? We’re excited to work with businesses and
          organizations to bring innovative AR solutions to life. Let's create
          something amazing together!
        </p>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a
            href="mailto:partners.augmentor@rvinnovations.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <EmailIcon style={{ marginRight: "8px" }} />{" "}
            partners.augmentor@rvinnovations.net
          </a>
        </div>

        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          Creators’ Corner
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          Are you a creator looking to submit your 3D models or have questions
          about the submission process? Get in touch with our dedicated team to
          learn more about how you can showcase your work on AugmentoR.
        </p>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a
            href="mailto:creators.augmentor@rvinnovations.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <EmailIcon style={{ marginRight: "8px" }} />{" "}
            creators.augmentor@rvinnovations.net
          </a>
        </div>

        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          Stay Connected
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          Follow us on social media to stay updated on the latest news, updates,
          and AR events. Join our community and be a part of the AR revolution!
        </p>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a
            href="https://wa.me/+94716010833?text=Hi!%20I%E2%80%99m%20interested%20in%20finding%20out%20more%20about%20what%20AugmentoR%20offers.%20Can%20you%20provide%20more%20details%3F"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <WhatsAppIcon style={{ marginRight: "8px" }} /> Chat with us on
            WhatsApp
          </a>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Ready to step into the future? Let's create something amazing
          together.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div className="feature-card" style={{ width: "200px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <WhatsAppIcon style={{ color: "#25D366" }} /> WhatsApp
            </h3>
            <p>
              <a
                href="https://whatsapp.com/channel/0029VafqJcZ1dAvy6s6uIM1i"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Join our Channel
              </a>
            </p>
          </div>

          <div className="feature-card" style={{ width: "200px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FacebookIcon style={{ color: "#1877F2" }} /> Facebook
            </h3>
            <p>
              <a
                href="https://www.facebook.com/profile.php?id=61559110691259&mibextid=JRoKGi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Visit Page
              </a>
            </p>
          </div>

          <div className="feature-card" style={{ width: "200px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <InstagramIcon style={{ color: "#E4405F" }} /> Instagram
            </h3>
            <p>
              <a
                href="https://www.instagram.com/augmentor_byrv?igsh=MTU3ZmlhcHc2aTE1aw=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Follow Us
              </a>
            </p>
          </div>

          <div className="feature-card" style={{ width: "200px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <TikTokIcon style={{ color: "#010101" }} /> TikTok
            </h3>
            <p>
              <a
                href="https://www.tiktok.com/@augmentor_byrv?_t=8mc0bZIfLCK&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Watch Videos
              </a>
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", marginTop: "80px", color: "#fff" }}>
        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>
          Visit Us
        </h3>
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.9",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          Want to meet us in person or attend one of our AR events? Here’s where
          you can find us:
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Address Card */}
          <div className="feature-card" style={{ width: "400px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <LocationOnIcon style={{ color: "#d32f2f" }} /> Address
            </h3>
            <p style={{ lineHeight: "1.6" }}>
              4/7A, Victor Fernando Road, <br />
              Kandawaththa, Maeliya, <br />
              Ja-Ela, Western Province, <br />
              Sri Lanka
            </p>
          </div>

          {/* Phone Card */}
          <div className="feature-card" style={{ width: "400px" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <PhoneIcon style={{ color: "#4CAF50" }} /> Phone
            </h3>
            <p>
              <a
                href="tel:+94716010833"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                +94 71 601 0833
              </a>
            </p>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "1.15rem",
          lineHeight: "1.9",
          marginBottom: "2.5rem",
          opacity: 0.9,
        }}
      >
        <em>
          <br />
          <br />
          We look forward to hearing from you and helping you make the most of
          your AugmentoR experience. Let’s create a new reality together! 🌍✨
        </em>
      </p>
    </section>
  );
}

export default Contact;
