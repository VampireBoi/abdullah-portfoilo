import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

const CareerSection = () => {
  const [ref, progress] = useScrollProgress()

  const subsections = [
    { id: 'education', type: 'timeline', title: 'EDUCATION', visible: true, items: EDUCATION_ITEMS },
    { id: 'jobs', type: 'timeline', title: 'JOBS', visible: false, items: JOB_ITEMS },
    { id: 'skills', type: 'skills', title: 'SKILLS', visible: true, categories: SKILL_CATEGORIES },
  ]

  const visibleSubsections = subsections.filter((section) => section.visible)
  const visibleCount = visibleSubsections.length || 1
  const columnsClass =
    visibleCount === 1 ? 'md:grid-cols-1' : visibleCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <section
      id="career"
      ref={ref}
      className="section-container relative flex flex-col items-center pt-20 pb-10 px-6"
    >
      <CareerHeader progress={progress} />

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 ${columnsClass} gap-12`}
      >
        {visibleSubsections.map((section) => {
          if (section.type === 'timeline') {
            return (
              <TimelineColumn
                key={section.id}
                title={section.title}
                items={section.items}
                progress={progress}
              />
            )
          }
          if (section.type === 'skills') {
            return (
              <SkillsColumn
                key={section.id}
                categories={section.categories}
                progress={progress}
              />
            )
          }
          return null
        })}
      </div>
    </section>
  )
}

const CareerHeader = ({ progress }) => {
  // Soften header animation: start a bit later and move less
  const lineProgress = Math.min(1, progress * 2)
  const textProgress = Math.max(0, (progress - 0.25) * 2)

  return (
    <div className="relative z-10 flex flex-col items-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gold tracking-[0.25em]"
        style={{
          opacity: textProgress,
          y: 16 * (1 - textProgress),
        }}
      >
        CAREER
      </motion.h2>
      <motion.div
        className="mt-4 w-[520px] h-[2px] origin-center"
        style={{
          scaleX: lineProgress,
          background:
            'linear-gradient(to right, transparent 0%, #df803e 15%, #df803e 85%, transparent 100%)',
        }}
      />
    </div>
  )
}

const TimelineColumn = ({ title, items, progress }) => {
  // Soften and delay subsection header + content animations
  const headerLineProgress = Math.min(1, progress * 2)
  const headerTextProgress = Math.max(0, (progress - 0.25) * 2)
  const contentBase = Math.max(0, (progress - 0.25) * 2)
  const sequenceProgress = contentBase * (items.length + 0.5)

  return (
    <div className="flex flex-col items-center">
      <motion.h3
        className="text-lg md:text-xl font-semibold uppercase tracking-[0.25em] text-gold mb-2 text-center"
        style={{
          opacity: headerTextProgress,
          y: 12 * (1 - headerTextProgress),
        }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="w-40 h-[2px] origin-center mb-6"
        style={{
          scaleX: headerLineProgress,
          background:
            'linear-gradient(to right, transparent 0%, #df803e 20%, #df803e 100%)',
        }}
      />

      <div className="flex flex-col-reverse items-center gap-10 mt-4">
        {items.map((item, index) => {
          const itemProgress = Math.min(1, Math.max(0, sequenceProgress - index))
          const arrowProgress = Math.min(
            1,
            Math.max(0, sequenceProgress - (index + 0.5))
          )
          const showArrow = index < items.length - 1

          return (
            <div
              key={item.label + item.period}
              className="flex flex-col items-center gap-2"
            >
              {showArrow && (
                <motion.div
                  className="flex items-center justify-center"
                  style={{
                    opacity: arrowProgress,
                    scaleY: arrowProgress,
                    originY: 1,
                  }}
                >
                  <div className="flex items-center justify-center gap-4">
                    {/* Empty spacers to match date/label widths so arrow aligns with item spine */}
                    <span className="w-40" />
                    <div className="flex flex-col items-center">
                      {/* Dotted connector with upward-pointing arrow leading to the next (higher) item */}
                      <div className="h-5 border-l-2 border-dashed border-yellow/70" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-yellow/80" />
                    </div>
                    <span className="w-40" />
                  </div>
                </motion.div>
              )}

              <div className="flex items-center justify-center gap-4">
                {/* Date slides out to the left from the central line */}
                <motion.span
                  className="text-sm md:text-base text-yellow whitespace-nowrap text-right w-40"
                  style={{
                    opacity: itemProgress,
                    x: -14 * (1 - itemProgress),
                  }}
                >
                  {item.period}
                </motion.span>
                {/* Central vertical line grows from bottom up (same style as arrow line) */}
                <motion.div
                  className="h-10 border-l-2 border-yellow/80"
                  style={{
                    scaleY: itemProgress,
                    originY: 1,
                  }}
                />
                {/* Label slides out to the right from the central line */}
                <motion.span
                  className="text-sm md:text-base text-yellow w-40"
                  style={{
                    opacity: itemProgress,
                    x: 14 * (1 - itemProgress),
                  }}
                >
                  {item.label}
                </motion.span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SkillsColumn = ({ categories, progress }) => {
  const headerLineProgress = Math.min(1, progress * 2)
  const headerTextProgress = Math.max(0, (progress - 0.25) * 2)

  return (
    <div className="flex flex-col items-center">
      <motion.h3
        className="text-lg md:text-xl font-semibold uppercase tracking-[0.25em] text-gold mb-2 text-center"
        style={{
          opacity: headerTextProgress,
          y: 18 * (1 - headerTextProgress),
        }}
      >
        SKILLS
      </motion.h3>
      <motion.div
        className="w-40 h-[2px] origin-center mb-6"
        style={{
          scaleX: headerLineProgress,
          background:
            'linear-gradient(to right, transparent 0%, #df803e 20%, #df803e 100%)',
        }}
      />

      <div className="w-full space-y-8 mt-2">
        {categories.map((category) => (
          <SkillCategory
            key={category.id}
            category={category}
            progress={progress}
          />
        ))}
      </div>
    </div>
  )
}

const SkillCategory = ({ category, progress }) => {
  // Start skills slightly later and animate more gently
  const titleProgress = Math.max(0, (progress - 0.3) * 2)
  const barsProgress = Math.max(0, (progress - 0.35) * 2)

  return (
    <div className="w-full">
      <motion.h4
        className="text-xs md:text-sm font-semibold text-yellow uppercase tracking-[0.18em] mb-3"
        style={{
          opacity: titleProgress,
          y: 10 * (1 - titleProgress),
        }}
      >
        {category.title}
      </motion.h4>
      <div className="space-y-2">
        {([...category.skills]
          .sort((a, b) => b.value - a.value)
        ).map((skill, index, sortedSkills) => {
          // Tie bar growth smoothly to scroll: each bar uses a staggered window of barsProgress (0-1)
          const step = 0.08
          const start = index * step
          const end = start + 0.4
          const normalized = (barsProgress - start) / (end - start)
          const barProgress = Math.min(1, Math.max(0, normalized))

          return (
            <div key={skill.name} className="w-full">
              <motion.div
                className="relative h-7 rounded-sm bg-dark-secondary/60 overflow-hidden"
                style={{
                  opacity: barProgress,
                }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-orange"
                  style={{
                    width: `${skill.value}%`,
                    scaleX: barProgress,
                    originX: 0,
                  }}
                />
                <motion.div
                  className="relative z-10 flex items-center justify-between px-3 text-xs md:text-sm text-yellow"
                  style={{
                    opacity: barProgress,
                    x: 6 * (1 - barProgress),
                  }}
                >
                  <span>{skill.name}</span>
                  <span>{skill.value}</span>
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EDUCATION_ITEMS = [
  {
    period: '2017 - 2020',
    label: 'High School',
  },
  {
    period: '2020 - 2024',
    label: 'UQU',
  },

]

const JOB_ITEMS = [
  {
    period: '2017 - 2020',
    label: 'WB',
  },
  {
    period: '2020 - 2024',
    label: 'EA',
  },
  {
    period: '2026 - Current',
    label: 'Self Employed',
  },
]

const SKILL_CATEGORIES = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    skills: [
      { name: 'C#', value: 85 },
      { name: 'GD script', value: 90 },
      { name: 'C++', value: 20 },
      { name: 'python', value: 70 },
      { name: 'javascript', value: 65 },
      { name: 'c', value: 50 },
      { name: 'html', value: 45 },
    ],
  },
  {
    id: 'frameworks-engines',
    title: 'Frameworks & Engines',
    skills: [
      { name: 'unity', value: 80 },
      { name: 'unreal engine', value: 50 },
      { name: 'godot', value: 85 },
      { name: 'pygame', value: 70 },
      { name: 'construct', value: 65 },
      { name: 'game maker', value: 25 },
    ],
  },
  {
    id: 'spoken-languages',
    title: 'Spoken Languages',
    skills: [
      { name: 'Arabic', value: 95 },
      { name: 'English', value: 80 },
   
    ],
  },
]

export default CareerSection
