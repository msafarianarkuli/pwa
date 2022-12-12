import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Albums from './components/Albums';
import NotFound from './components/NotFound';
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about-me" element={<About />} />
            <Route path="contact-me" element={<Contact />} />
            <Route path="albums" element={<Albums />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
