import { motion, useMotionValue, useTransform } from 'framer-motion'

const ProjectCard = ({ project, isActive, isNeighbor, sectionProgress = 1, onActivate, onOpenProject }) => {
  // Base scaling per active/neighbor state (softened so neighbors don't get too large)
  const baseScale = isActive ? 1.08 : isNeighbor ? 1.0 : 0.9
  const baseOpacity = isActive ? 1 : isNeighbor ? 0.8 : 0.5
  // Section-level scroll factor: 1 when centered, gently falls off as the subsection leaves view
  const visibility = Math.max(0, Math.min(1, sectionProgress * 1.1))
  const scrollScale = 0.95 + visibility * 0.1 // 0.95 → 1.05
  const scrollOpacity = 0.3 + visibility * 0.7 // 0.3 → 1.0

  const scale = baseScale * scrollScale
  const opacity = baseOpacity * scrollOpacity
  const borderClass = isActive ? 'border-gold/60 shadow-lg shadow-gold/30' : 'border-teal/30'
  const lift = isActive ? -20 : isNeighbor ? -10 : 0

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-80, 80], [8, -8])
  const rotateY = useTransform(x, [-80, 80], [-8, 8])

  const isLocked = project?.locked === true
  const thumbnailSrc = project?.thumbnail ? import.meta.env.BASE_URL + project.thumbnail : ''
  const isThumbnailVideo = project?.thumbnail && project.thumbnail.toLowerCase().endsWith('.webm')

  const handleClick = () => {
    // When locked, card can still become active but must not navigate to project page
    if (isLocked) {
      if (!isActive && onActivate) {
        onActivate()
      }
      return
    }

    if (isActive && onOpenProject) {
      onOpenProject()
    } else if (onActivate) {
      onActivate()
    }
  }

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={`relative w-[260px] h-[380px] rounded-2xl bg-dark-secondary/40 backdrop-blur-md border ${borderClass} overflow-hidden flex flex-col group`}
      style={{ opacity, rotateX, rotateY, zIndex: isActive ? 30 : isNeighbor ? 20 : 10 }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.25 }}
      animate={{ scale, y: lift }}
    >
      <div className="relative h-[60%] overflow-hidden">
        {isThumbnailVideo ? (
          <video
            src={thumbnailSrc}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            muted
            loop
            playsInline
            onClick={(e) => {
              e.stopPropagation()
              if (!isLocked && onOpenProject) {
                onOpenProject()
              }
            }}
          />
        ) : (
          <img
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              if (!isLocked && onOpenProject) {
                onOpenProject()
              }
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-dark-bg/20 to-dark-bg/80" />
      </div>

      <div className="relative flex-1 px-5 py-4 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gold mb-1">{project.title}</h4>
          {project.timeframe && (
            <p className="text-xs text-yellow/70 mb-1">{project.timeframe}</p>
          )}
          <p className="text-sm text-yellow/80 line-clamp-3 mb-3">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full border border-orange text-orange text-[11px] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-dark-bg/70 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <span className="text-3xl text-yellow/90">
            🔒
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default ProjectCard
