// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Schedule from './components/Schedule'
import Gallery from './components/Gallery'
import Sponsors from './components/Sponsors'
import CampusAmbassador from './components/CampusAmbassador'
import Team from './components/Team'
import Footer from './components/Footer'
import EventDetail from './components/EventDetail'

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
      <Team />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App