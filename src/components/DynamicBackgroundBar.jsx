import { motion, AnimatePresence } from 'framer-motion'

const DynamicBackgroundBar = ({ activeGif, progress, maxOpacity = 0.5 }) => {
  const safeMax = Math.max(0, Math.min(1, maxOpacity ?? 0.5))
  const opacity = Math.min(safeMax, progress * safeMax)

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
        <div className="absolute inset-0 bg-dark-bg/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #0d0812 0%, transparent 30%, transparent 70%, #0d0812 100%)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default DynamicBackgroundBar
