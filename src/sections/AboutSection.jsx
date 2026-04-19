import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const ACHIEVEMENTS = [
  'CS bachelor graduate',
  'over 15k follower across social media platforms',
  
]

const CONTACTS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdullah-homsi-a7aba816b/', icon: 'in' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/VampireBoi', icon: '</>' },
  { id: 'email', label: 'Email', href: 'mailto:m.abdullahhomsi@gmail.com', icon: '@' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vampire__b0i/', icon: 'IG' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@The_vampire_b0i', icon: '▶' },
  { id: 'itchio', label: 'itch.io', href: 'https://vampire-boi.itch.io', icon: 'itch' },
]

const AboutSection = () => {
  const [ref, progress] = useScrollProgress()

  const containerOpacity = Math.min(1, Math.max(0, progress * 1.5))
  const containerY = 24 * (1 - containerOpacity)

  const lineProgress = Math.min(1, Math.max(0, (progress - 0.2) * 2))

  return (
    <section
      id="about"
      ref={ref}
      className="section-container relative flex flex-col items-center justify-center px-6 pt-10 pb-12"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-10 rounded-2xl bg-dark-secondary/40 backdrop-blur-md border border-teal/40 px-5 md:px-8 py-6 md:py-8"
          style={{
            opacity: containerOpacity,
            y: containerY,
          }}
        >
          {/* Left: Profile photo */}
          <div className="flex justify-center md:justify-start w-full md:w-auto md:self-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-dark-bg/80 border-2 border-gold/70 shadow-lg shadow-gold/20 overflow-hidden flex items-center justify-center">
              {/* Placeholder image */}
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/about me/profile pic 4.jpeg')" }} />
            </div>
          </div>

          {/* Center: Summary + line + achievements */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <motion.h2
              className="text-lg md:text-xl lg:text-2xl font-semibold text-gold mb-4"
              style={{
                opacity: containerOpacity,
                y: 12 * (1 - containerOpacity),
              }}
            >
              Hi, I&apos;m Abdullah, a game developer with over 8 years of programming experience creating 2D, 3D, and VR games. Skilled in advanced graphics programming, game design, 3D modeling, music composition.
            </motion.h2>
            <motion.div
              className="w-full h-[2px] origin-center mb-4"
              style={{
                scaleX: lineProgress,
                background:
                  'linear-gradient(to right, transparent 0%, #df803e 15%, #df803e 85%, transparent 100%)',
              }}
            />

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gold font-semibold mt-2">
              {ACHIEVEMENTS.map((achievement) => (
                <li key={achievement} className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact grid */}
          <div className="w-full md:w-52 flex flex-col items-center justify-center gap-4 md:self-center">
            <motion.h3
              className="text-sm md:text-base font-semibold tracking-[0.25em] text-gold text-center"
              style={{
                opacity: containerOpacity,
                y: 10 * (1 - containerOpacity),
              }}
            >
              CONTACTS
            </motion.h3>

            <div className="grid grid-cols-3 md:grid-cols-2 gap-3 w-full max-w-xs">
              {CONTACTS.map((contact) => (
                <motion.a
                  key={contact.id}
                  href={contact.href}
                  target={contact.id === 'email' ? undefined : '_blank'}
                  rel={contact.id === 'email' ? undefined : 'noreferrer'}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl bg-dark-secondary/60 border border-teal/40 text-yellow px-3 py-2 text-xs md:text-sm hover:bg-teal/20 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-lg md:text-xl font-semibold">{contact.icon}</span>
                  <span className="uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-yellow/80">
                    {contact.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Back to the top button */}
        <div className="w-full flex justify-center mt-8">
          <motion.button
            className="px-8 py-3 rounded-md bg-crimson text-yellow font-semibold tracking-[0.18em] text-xs md:text-sm uppercase hover:bg-crimson/80 transition-colors"
            onClick={() => {
              const intro = document.getElementById('intro')
              if (intro) {
                intro.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            style={{
              opacity: containerOpacity,
              y: 10 * (1 - containerOpacity),
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            BACK TO THE TOP
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
