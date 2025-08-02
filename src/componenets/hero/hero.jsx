import "./hero.css";

function Hero() {
    return <section id="home" className="hero">
        <div className="video-background">
            <video autoPlay muted loop playsInline>
                <source src="/videos/173129-848555607.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <div className="video-overlay"></div>

        <div className="ar-grid"></div>

        <div className="ar-particles"></div>

        <div className="ar-elements">
            <div className="ar-element" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div className="ar-element" style={{ top: '60%', right: '15%', animationDelay: '2s' }}></div>
            <div className="ar-element" style={{ top: '30%', right: '25%', animationDelay: '4s' }}></div>
            <div className="ar-element" style={{ bottom: '25%', left: '20%', animationDelay: '1s' }}></div>
        </div>


        <div className="hero-content">
            <div className="hero-text">
                <h1>Welcome to AugmentoR!</h1>
                <p>
                    <small> Join Us on This Augmented Journey! </small>
                </p>
                <div className="cta-buttons">
                    <a href="#about" className="cta-button">Explore AR Universe</a>
                    <a href="#contact" className="cta-button secondary">Get Started</a>
                </div>
            </div>
        </div>

        <div className="scroll-indicator">Scroll to explore</div>
    </section>
}

export default Hero;