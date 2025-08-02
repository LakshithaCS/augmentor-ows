import Navbar from "../navbar/navbar";
import "./layout.css"

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="section-container">
                {children}
            </div>
        </>
    );
}

export default Layout;
