import { motion, AnimatePresence } from 'framer-motion'

const DynamicBackgroundBar = ({
  activeGif,
  progress,
  maxOpacity = 0.5,
  disableVignette = false,
  variant = 'default',
}) => {
  const safeMax = Math.max(0, Math.min(1, maxOpacity ?? 0.5))
  const opacity = Math.min(safeMax, progress * safeMax)

  const overlayClass = variant === 'hero' ? 'bg-dark-bg/25' : 'bg-dark-bg/60'
  const defaultGradient =
    'linear-gradient(to bottom, #0d0812 0%, transparent 30%, transparent 70%, #0d0812 100%)'
  const heroGradient =
    'linear-gradient(to bottom, rgba(13, 8, 18, 0.45) 0%, rgba(13, 8, 18, 0.30) 8%, rgba(13, 8, 18, 0.13) 18%, rgba(13, 8, 18, 0.0) 32%, rgba(13, 8, 18, 0.0) 68%, rgba(13, 8, 18, 0.13) 82%, rgba(13, 8, 18, 0.30) 92%, rgba(13, 8, 18, 0.45) 100%)'
  const gradientBackground = variant === 'hero' ? heroGradient : defaultGradient

  return (
    <motion.div
      className="absolute inset-0 flex justify-center"
      style={{ opacity }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {activeGif && (
            <motion.img
              key={activeGif}
              src={activeGif}
              alt="Section background"
              className="absolute inset-0 min-w-[1200px] w-full h-full object-cover max-w-none"
              style={{
                objectPosition: 'center center',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <div className={`absolute inset-0 ${overlayClass}`} />
        {!disableVignette && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: gradientBackground,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default DynamicBackgroundBar
