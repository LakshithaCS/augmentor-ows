import "./services.css";

function Services() {
  return (
    <>
      <section
        id="services"
        className="section"
        style={{minHeight: "100vh !important", maxWidth: "90vw"}}
      >
        <h2>Our Services</h2>
        <div className="features">
          <div className="feature-card">
            <h3>3D Product Displays</h3>
            <div className="feature-gif">
              <img src="/images/services/3d product display/643973e71171c3baf35f2eef_DIOR-MEN.gif" alt="Feature animation" />
            </div>
            <p>
              Let customers ‘hold’ your products through their screens. Turn your online shoppers into confident buyers
              with interactive 3D previews, allowing them to Spin, zoom, and explore products from every angle in AR.
              Perfect for e-commerce businesses, product designers, and brands that want to showcase their offerings
              with unmatched clarity.
            </p>
          </div>
          <div className="feature-card">
            <h3>Augmented Books</h3>
            <div className="feature-gif">
              <img src="/images/services/Ar Books/ar_wild_&_Pets.gif" alt="Feature animation" />
            </div>
            <p>
              Turn every page into an adventure. AugmentoR transforms printed books into living, breathing worlds
              where characters step off the page and stories unfold before your eyes. Perfect for product handbooks,
              product manuals, product leaflet, authors, publishers, tutors, and content creators seeking to elevate
              storytelling and learning experiences.
            </p>
          </div>
          <div className="feature-card">
            <h3>Shared AR Experience</h3>
            <div className="feature-gif">
              <img src="/images/services/Shared Ar/ar_shared_cyber_truck.gif" alt="Feature animation" />
            </div>
            <p>
              Connect multiple users seamlessly to the same augmented reality scene, allowing them to share moments,
              explore, and interact together in real time. AugmentoR's shared AR experience will transform ordinary
              gatherings into unforgettable, immersive events that spark connection and engagement. Perfect for special
              events, national festivals, promotional location for interactive fun and event organizers seeking interactive
              group experiences.
            </p>
          </div>
          <div className="feature-card">
            <h3>Brand Promotions</h3>
            <div className="feature-gif">
              <img src="/images/services/Brand Promotions/bags display.gif" alt="Feature animation" />
            </div>
            <p>
              Elevate your brand with immersive AR campaigns, creating memorable and interactive marketing
              experiences that captivate your audience. Your brand deserves more than just attention — it deserves a
              lasting impression. AugmentoR turns marketing into an interactive experience, letting customers engage
              with your brand in ways they’ll remember, share, and talk about long after. Perfect for marketers,
              advertisers, and brands seeking to make a lasting impact.
            </p>
          </div>
          {/* <div className="feature-card">
            <h3>Product Launches</h3>
            <div className="feature-gif">
              <img src="/images/services/3d product display/643973e71171c3baf35f2eef_DIOR-MEN.gif" alt="Feature animation" />
            </div>
            <p>
              Make your next launch an event they’ll never forget. AugmentoR unveils products in stunning augmented
              reality, allowing audiences to see, explore, and interact with your latest innovation before it even hits the
              shelves, building anticipation and excitement. Perfect for product manufacturers, inventors, marketing
              teams, and innovators introducing new creations.
            </p>
          </div> */}
          <div className="feature-card">
            <h3>AR Furniture’s</h3>
            <div className="feature-gif">
              <img src="/images/services/Ar Furniture Shopping/ar_furniture.gif" alt="Feature animation" />
            </div>
            <p>
              Discover the future of shopping with AugmentoR’s AR Furniture. Allow your customers to place true-to-scale
              sofas, tables, and décor directly into their real-world space using augmented reality. They can rotate,
              rearrange, and explore each piece to see exactly how it complements their home’s style and fits their space
              — all before making a purchase. This immersive AR experience transforms browsing into confident,
              informed buying. Perfect for furniture retailers, interior designers, and manufacturers seeking to inspire and
              engage customers like never before.
            </p>
          </div>
          <div className="feature-card">
            <h3>Home AR</h3>
            <div className="feature-gif">
              <img src="/images/services/Home Ar/FAEKFv.gif" alt="Feature animation" />
            </div>
            <p>
              Why wait for your dream home to be built when you can see it now? With AugmentoR, you can view your
              3D house design right on your land! walk through each room and explore every corner before construction
              even begins. Perfect for homeowners, architects, and interior designers who want to bring visions to life —
              instantly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
