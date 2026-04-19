import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import IntroSection from './sections/IntroSection'
import CareerSection from './sections/CareerSection'
import WorkSection from './sections/WorkSection'
import AboutSection from './sections/AboutSection'
import IKAnimationToolPage from './pages/IKAnimationToolPage'
import StylizedArtStylePipelinePage from './pages/StylizedArtStylePipelinePage'

const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.state && location.state.scrollTo
    if (!targetId) return

    const timeout = setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)

    return () => clearTimeout(timeout)
  }, [location])

  return (
    <main>
      <IntroSection />
      <WorkSection />
      <CareerSection />
      <AboutSection />
    </main>
  )
}

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/ik-animation-tool" element={<IKAnimationToolPage />} />
          <Route path="/projects/stylized-art-style-pipeline" element={<StylizedArtStylePipelinePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
