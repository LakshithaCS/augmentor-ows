import Counter from "../counter/counter";
import "./about.css";

function About() {
    return (
        <section 
            id="about" 
            className="section" 
            style={{ textAlign: "center", minHeight: "100vh" }} // Removed !important
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto", color: "#fff" }}>

                <h2 style={{ fontSize: "2.8rem", marginBottom: "1.5rem", color: "#fff" }}>
                    About <span style={{ color: "#00bfff" }}>AugmentoR</span>
                </h2>

                <p style={{ fontSize: "1.25rem", lineHeight: "2", marginBottom: "3rem", opacity: 0.95 }}>
                    <strong>AugmentoR</strong> is an innovative augmented reality (AR) platform developed by RV Innovations, designed to bring the digital
                    world into your real-world experience like never before. Whether you’re exploring interactive books, visualizing
                    furniture in your own home, or engaging with creative AR content from around the globe, AugmentoR transforms the
                    way you interact with 3D objects and information.<br/>
                    We believe AR should be more than just technology—it should be an experience that inspires, educates, and connects.
                </p>

                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-number">
                            <Counter value={480}/>+
                        </span>
                        <div class="stat-label">AR Projects Completed</div>
                    </div>
            
                    <div class="stat-item">
                        <span class="stat-number">
                            <Counter value={40}/>+
                        </span>
                        <div class="stat-label">Enterprise Clients</div>
                    </div>
            
                    <div class="stat-item">
                        <span class="stat-number">
                            <Counter value={7500}/>+
                        </span>
                        <div class="stat-label">AR Experiences Delivered</div>
                    </div>
                
                    <div class="stat-item">
                        <span class="stat-number">
                            <Counter value={99}/>%
                        </span>
                        <div class="stat-label">Client Satisfaction</div>
                    </div>
                </div>

                <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>🌟 Our Vision</h3>
                <p style={{ fontSize: "1.15rem", lineHeight: "1.9", marginBottom: "2.5rem", opacity: 0.9 }}>
                    <em>To make augmented reality accessible, practical, and exciting for everyone—whether you’re a creator, a business, or
                    simply curious about what’s possible when the virtual meets the real.</em>
                </p>

                <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>🌍 Our Mission</h3>
                <p style={{ fontSize: "1.15rem", lineHeight: "1.9", marginBottom: "2.5rem", opacity: 0.9 }}>
                    <em>To democratize AR and make it accessible to everyone, everywhere.</em><br/><br/>
                    Whether you're an <strong>artist</strong> showcasing your imagination, a <strong>learner</strong>
                    discovering interactive content, or a <strong>brand</strong> looking to stand out — AugmentoR turns your
                    vision into immersive AR experiences.
                </p>

                <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#fff" }}>🚀 Join the AR Revolution</h3>
                <p style={{ fontSize: "1.15rem", lineHeight: "1.9", marginBottom: "2.5rem", opacity: 0.9 }}>
                    We’re building a world where AR becomes part of everyday life — seamlessly merging the digital and
                    physical. <br/>
                    <strong>Explore</strong>. <strong>Create</strong>. <strong>Connect</strong>. Bring your ideas to life in
                    stunning augmented reality.
                </p>

                <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                    💬 Want to learn more? Visit our <a href="#contact"
                        style={{ color: "#00bfff", textDecoration: "underline" }}>Contact Us</a> page — we’re here to help you
                    embrace the future of AR.
                </p>

            </div>
        </section>
    );
}


export default About;