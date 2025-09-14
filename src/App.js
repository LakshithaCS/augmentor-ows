import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Layout from './components/layout/layout';
import Hero from './components/hero/hero';
import About from './components/about/about';
import Publish from './components/publish/publish';
import Services from "./components/services/services";
import Contact from "./components/contact/contact";
import IFrame from "./components/iframe/iframe";

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
          path="/webar"
          element=<IFrame />
        />
      </Routes>
    </Router>
  );
}


export default App;
