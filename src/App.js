import './App.css';
import Layout from './componenets/layout/layout';
import Hero from './componenets/hero/hero';
import About from './componenets/about/about';
import Publish from './componenets/publish/publish';

function App() {
  return <>
      <Layout>
            <Hero />
            <About />
            <Publish />
      </Layout>
  </>;
}

export default App;
