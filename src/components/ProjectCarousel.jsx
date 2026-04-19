import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { useActiveCard } from '../hooks/useActiveCard'

const CARD_OFFSET = 320

const ProjectCarousel = ({ projects, onActiveChange, sectionProgress = 1 }) => {
  const { items, activeIndex, activeProject, setActiveIndex, next, prev } = useActiveCard(projects)

  useEffect(() => {
    if (activeProject && onActiveChange) {
      onActiveChange(activeProject)
    }
  }, [activeProject, onActiveChange])

  if (!items.length) return null

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-5xl mb-6 px-2">
        <button
          className="px-3 py-2 rounded-full bg-dark-secondary/80 border border-teal/40 text-yellow/80 text-sm hover:bg-teal/20 transition-colors"
          onClick={prev}
        >
          ◀
        </button>
        <button
          className="px-3 py-2 rounded-full bg-dark-secondary/80 border border-teal/40 text-yellow/80 text-sm hover:bg-teal/20 transition-colors"
          onClick={next}
        >
          ▶
        </button>
      </div>

      <div className="relative w-full max-w-6xl h-[420px] overflow-visible flex items-center justify-center px-2">
        {items.map((project, index) => {
          const offset = index - activeIndex
          const isActive = offset === 0
          const isNeighbor = Math.abs(offset) === 1
          const x = offset * CARD_OFFSET

          return (
            <motion.div
              key={project.id + '-' + index}
              className="absolute"
              animate={{ x }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            >
              <ProjectCard
                project={project}
                isActive={isActive}
                isNeighbor={isNeighbor}
                sectionProgress={sectionProgress}
                onActivate={() => setActiveIndex(index)}
                onOpenProject={() => {
                  if (project.projectPage) {
                    window.open(project.projectPage, '_blank')
                  }
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectCarousel
