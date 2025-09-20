import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import "./layout.css"

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="section-container" style={{paddingBottom: "50px"}}>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default Layout;
