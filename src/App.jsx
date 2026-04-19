import { useEffect, useLayoutEffect } from 'react'
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

  // Restore scroll position on full-page refresh or back navigation while on the home route.
  // Skip this when navigation explicitly requests a section (location.state.scrollTo).
  useLayoutEffect(() => {
    if (location.pathname !== '/') return

    const targetId = location.state && location.state.scrollTo
    if (targetId) return

    const saved = sessionStorage.getItem('homeScrollY')
    if (saved != null) {
      const y = parseInt(saved, 10)
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y)
      }
    }
  }, [location.pathname, location.state])

  // Save scroll position while on the home route so a manual refresh keeps you in the same section.
  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      sessionStorage.setItem('homeScrollY', String(window.scrollY || 0))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Handle header navigation that jumps to specific sections on the home page
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
