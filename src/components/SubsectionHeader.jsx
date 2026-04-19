import { motion } from 'framer-motion'

const SubsectionHeader = ({ title, progress }) => {
  const lineProgress = Math.min(1, progress * 3)
  const textProgress = Math.max(0, (progress - 0.15) * 2.5)

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <motion.h3
        className="text-3xl md:text-4xl font-bold text-gold tracking-[0.2em] mb-4"
        style={{
          opacity: textProgress,
          y: 20 * (1 - textProgress),
        }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="w-[420px] h-[2px] mb-2 origin-center"
        style={{
          scaleX: lineProgress,
          background:
            'linear-gradient(to right, transparent 0%, #df803e 15%, #df803e 85%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default SubsectionHeader
