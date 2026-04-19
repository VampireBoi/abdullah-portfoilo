import { useState } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import data from '../data/projects.json'
import DynamicBackgroundBar from '../components/DynamicBackgroundBar'
import SubsectionHeader from '../components/SubsectionHeader'
import ProjectCarousel from '../components/ProjectCarousel'

const SUBSECTIONS = [
  { id: 'highlighted', title: 'HIGHLIGHTED', key: 'highlighted', visible: true },
  { id: 'personal-games', title: 'PERSONAL GAMES', key: 'personal-games', visible: false },
  { id: 'gamejam-games', title: 'GAMES', key: 'gamejam-games', visible: true }, // TODO: rename to gamejam games
  { id: 'professional-games', title: 'PROFESSIONAL GAMES', key: 'professional-games', visible: false },
  { id: 'tools', title: 'TOOLS', key: 'tools', visible: true },
  { id: 'projects', title: 'PROJECTS', key: 'projects', visible: false },
]

const WorkSection = () => {
  const projects = data.projects || []

  return (
    <section id="work" className="section-container relative flex flex-col gap-6 pt-20 pb-20">
      {SUBSECTIONS.filter((section) => section.visible).map((section) => (
        <WorkSubsection
          key={section.id}
          title={section.title}
          filterKey={section.key}
          projects={projects}
        />
      ))}
    </section>
  )
}

const WorkSubsection = ({ title, filterKey, projects }) => {
  const [ref, progress] = useScrollProgress()
  const [activeGif, setActiveGif] = useState(null)
  const [activeBackgroundWeight, setActiveBackgroundWeight] = useState(0.5)

  const filteredProjects = projects.filter((p) => p.categories?.includes(filterKey))
  const effectiveGif = activeGif
  const effectiveWeight = activeBackgroundWeight

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-start overflow-hidden px-6 pt-12 pb-12"
    >
      <div className="absolute inset-0">
        <DynamicBackgroundBar activeGif={effectiveGif} progress={progress} maxOpacity={effectiveWeight} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <SubsectionHeader title={title} progress={progress} />
        <ProjectCarousel
          projects={filteredProjects}
          sectionProgress={progress}
          onActiveChange={(project) => {
            if (!project) return
            if (project.locked) {
              setActiveGif(null)
              setActiveBackgroundWeight(0)
              return
            }
            const gifPath = project.backgroundGif
              ? import.meta.env.BASE_URL + project.backgroundGif
              : null
            setActiveGif(gifPath)
            const weight =
              typeof project.backgroundWeight === 'number' ? project.backgroundWeight : 0.5
            setActiveBackgroundWeight(weight)
          }}
        />
      </div>
    </section>
  )
}

export default WorkSection
