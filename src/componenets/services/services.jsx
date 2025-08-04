import "./services.css";

function Services() {
  return (
    <>
      <section
        id="services"
        className="section"
        style={{minHeight: "100vh !important"}}
      >
        <h2>Our Services</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Explore 3D Creations</h3>
            <p>
              Discover a diverse marketplace filled with 3D models, ranging from
              educational tools to creative sculptures. Some are free, while
              others are available for purchase after a thorough review process
              to ensure quality.
            </p>
          </div>
          <div className="feature-card">
            <h3>Empower Creators</h3>
            <p>
              We provide artists with a platform to showcase their work,
              enabling them to reach a global audience and monetize their
              creations.
            </p>
          </div>
          <div className="feature-card">
            <h3>Augmented Books</h3>
            <p>
              Experience books like never before by scanning QR codes that bring
              images to life, or create your own custom augmented books for a
              unique storytelling experience.
            </p>
          </div>
          <div className="feature-card">
            <h3>Cloud Anchors for Shared AR</h3>
            <p>
              Engage with shared augmented reality experiences at various
              locations. Perfect for events, festivals, and brand promotions,
              our Cloud Anchors offer collective AR interactions that can be
              accessed by multiple users simultaneously.
            </p>
          </div>
          <div className="feature-card">
            <h3>Brand Engagement</h3>
            <p>
              Utilize AugmentoR’s AR capabilities to create immersive brand
              experiences that captivate audiences in new and innovative ways.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
