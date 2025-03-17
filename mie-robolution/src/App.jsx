// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom'; // Change to HashRouter
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import CampusAmbassador from './components/CampusAmbassador';
import Team from './components/Team';
import Footer from './components/Footer';
import EventDetail from './components/EventDetail';
import Faculty from './components/Faculty';

// Create a HomePage component that contains all your current home sections
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Schedule />
      <Gallery />
      <Sponsors />
      <CampusAmbassador />
      <Faculty />
      <Team />
      
    </>
  );
};

function App() {
  return (
    <HashRouter> {/* Changed from BrowserRouter */}
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;