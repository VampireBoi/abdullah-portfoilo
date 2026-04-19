import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const IntroSection = () => {
  const [ref, progress] = useScrollProgress()

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  }

  const reverseProgress = 1 - progress
  const lineProgress = Math.min(1, progress * 3)
  const textProgress = Math.max(0, (progress - 0.15) * 2.5)
  const buttonProgress = Math.max(0, (progress - 0.25) * 2)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const buttons = [
    { label: 'Work', id: 'work' },
    { label: 'Career', id: 'career' },
    { label: 'About', id: 'about' },
  ]

  return (
    <section
      id="intro"
      ref={ref}
      className="section-container relative flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: progress * 0.6 }}
      >
        <div className="relative w-full h-[800px] overflow-hidden">
          <img
            src="/about me/complex animation from vr project v3 l.gif"
            alt="Background animation"
            className="absolute inset-0 min-w-[1200px] w-full h-full object-cover max-w-none"
            style={{
              objectPosition: 'center center',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <div className="absolute inset-0 bg-dark-bg/60" />
          {/* Soft edge fading - vertical (top/bottom) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #0d0812 0%, transparent 30%, transparent 20%, #0d0812 100%)',
            }}
          />
          {/* Soft edge fading - horizontal (left/right) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #0d0812 0%, transparent 5%, transparent 95%, #0d0812 100%)',
            }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gold mb-6"
          style={{
            opacity: textProgress,
            y: 20 * (1 - textProgress),
          }}
        >
          HI, I&apos;M ABDULLAH HOMSI
        </motion.h1>

        <motion.div
          className="w-[500px] h-[2px] mb-6 origin-center"
          style={{
            scaleX: lineProgress,
            background: 'linear-gradient(to right, transparent 0%, #df803e 15%, #df803e 85%, transparent 100%)',
          }}
        />

        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-yellow/90 mb-12"
          style={{
            opacity: textProgress,
            y: 20 * (1 - textProgress),
          }}
        >
          GAMEPLAY PROGRAMMER
        </motion.h2>

        <div className="flex gap-6">
          {buttons.map((button, index) => (
            <motion.button
              key={button.id}
              onClick={() => scrollToSection(button.id)}
              className="px-8 py-3 border-2 border-orange text-orange hover:bg-orange hover:text-dark-bg transition-all duration-300 font-medium rounded"
              style={{
                opacity: Math.max(0, Math.min(1, buttonProgress - index * 0.2)),
                y: -30 * (1 - Math.max(0, Math.min(1, buttonProgress - index * 0.2))),
              }}
            >
              {button.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
