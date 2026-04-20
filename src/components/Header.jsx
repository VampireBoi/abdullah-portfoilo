import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Career', id: 'career' },
    { label: 'Resume', id: 'resume', isExternal: true },
    // Contacts currently points to the About section so users can reach the contact grid there
    { label: 'Contacts', id: 'about' },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="bg-dark-secondary/80 backdrop-blur-sm border-b border-teal/30 rounded-lg px-6 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.button
            onClick={() => {
              if (location.pathname === '/') {
                scrollToSection('intro')
              } else {
                navigate('/', { state: { scrollTo: 'intro' } })
              }
            }}
            className="text-gold text-xl font-bold hover:text-yellow transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.15 }}
          >
            Abdullah Homsi
          </motion.button>

          <div className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={`${item.id}-${item.label}`}
                onClick={() => {
                  if (item.isExternal) {
                    window.open(import.meta.env.BASE_URL + 'about me/CV (1).pdf', '_blank')
                  } else if (location.pathname === '/') {
                    scrollToSection(item.id)
                  } else {
                    navigate('/', { state: { scrollTo: item.id } })
                  }
                }}
                className="text-yellow/80 hover:text-orange transition-colors text-sm font-medium"
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.2,
                  delay: 0.15 + (index * 0.04),
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.div>
    </motion.header>
  )
}

export default Header
