import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Layout from './componenets/layout/layout';
import Hero from './componenets/hero/hero';
import About from './componenets/about/about';
import Publish from './componenets/publish/publish';
import Services from "./componenets/services/services";

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
              <About />
              <Services />
            </Layout>
          }
        />

        {/* Publish model route */}
        <Route
          path="/publish/model"
          element={<Publish />}
        />
      </Routes>
    </Router>
  );
}


export default App;
