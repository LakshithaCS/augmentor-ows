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
                    <strong>At AugmentoR</strong>, we're reshaping how people experience the world — through the power of
                    <span style={{ color: "#00bfff", fontWeight: "bold" }}> Augmented Reality (AR)</span>. Our platform enables
                    users to explore 3D digital creations in real-world spaces, brought to life by a global community of
                    artists.
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