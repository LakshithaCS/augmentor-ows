import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Layout from './componenets/layout/layout';
import Hero from './componenets/hero/hero';
import About from './componenets/about/about';
import Publish from './componenets/publish/publish';
import Services from "./componenets/services/services";
import Contact from "./componenets/contact/contact";
import IFrame from "./componenets/iframe/iframe";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
              <Services />
              <About />
              <Contact />
            </Layout>
          }
        />

        {/* Publish model route */}
        <Route
          path="/publish/model"
          element={
            <Layout>
              <Publish />
            </Layout>
          }
        />

        <Route 
          path="/webxr"
          element=<IFrame />
        />
      </Routes>
    </Router>
  );
}


export default App;
