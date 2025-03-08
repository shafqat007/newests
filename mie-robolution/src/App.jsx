// src/App.jsx
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

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Schedule />
      <Gallery />
      <Sponsors />
      <CampusAmbassador />
      <Team />
      <Footer />
    </>
  )
}

export default App