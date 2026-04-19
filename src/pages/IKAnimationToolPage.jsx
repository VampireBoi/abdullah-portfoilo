import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import DynamicBackgroundBar from '../components/DynamicBackgroundBar'
import data from '../data/projects.json'

const withBase = (path) => `${import.meta.env.BASE_URL}${path}`

const MediaBlock = ({ title, align = 'left', children, imageSrc, imageAlt, caption, index = 0 }) => {
  const textFirst = align === 'left'
  const baseDelay = 0.03 + index * 0.07
  const isVideo = imageSrc && imageSrc.toLowerCase().endsWith('.webm')

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <motion.div
        className={textFirst ? '' : 'md:order-2'}
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.3, delay: baseDelay, ease: 'easeOut' }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gold mb-3">{title}</h2>
        <div className="space-y-3 text-sm md:text-base text-yellow/90 leading-relaxed">{children}</div>
      </motion.div>
      <motion.div
        className={textFirst ? '' : 'md:order-1'}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.3, delay: baseDelay + 0.08, ease: 'easeOut' }}
      >
        <div className="w-full rounded-2xl overflow-hidden bg-dark-secondary border border-teal/40 aspect-video flex items-center justify-center">
          {imageSrc ? (
            isVideo ? (
              <video
                src={imageSrc}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
            )
          ) : (
            <span className="text-yellow/60 text-sm">Media placeholder</span>
          )}
        </div>
        {caption && <p className="mt-2 text-xs md:text-sm text-yellow/70">{caption}</p>}
      </motion.div>
    </div>
  )
}

const IKAnimationToolPage = () => {
  const [ref, progress] = useScrollProgress()
  const project = (data.projects || []).find((p) => p.id === 'project-4') || {}

  const containerOpacity = 1
  const containerY = 0

  const tags = project.tags || []
  const heroMedia = withBase('projects/IK Animation Tool/showing the spider one.webm')

  return (
    <section
      id="ik-animation-tool"
      ref={ref}
      className="section-container relative flex flex-col items-center justify-start px-6 pt-24 pb-20"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative mb-14 rounded-2xl overflow-hidden border border-teal/40">
          <div className="absolute inset-0">
            <DynamicBackgroundBar activeGif={heroMedia} progress={1} maxOpacity={0.5} variant="hero" />
          </div>

          <motion.div
            className="relative w-full"
            style={{
              opacity: containerOpacity,
              y: containerY,
            }}
          >
            <div className="relative w-full h-full bg-dark-bg/40 px-6 md:px-10 py-8 md:py-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-4">
                {project.title || 'IK Animation Tool'}
              </h1>
              <p className="text-sm md:text-base text-yellow/90 max-w-3xl">
                A Unity editor tool for creating dynamic IK walk animations for a wide range of creatures, from spiders
                and insects to four legged animals and humanoids.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm md:text-base text-yellow/90">
                <div>
                  <span className="font-semibold text-gold">Year:</span> {project.timeframe || '2022'}
                </div>
                <div>
                  <span className="font-semibold text-gold">Dev time:</span> 4 days
                </div>
                <div>
                  <span className="font-semibold text-gold">Type:</span> Unity Editor Tool
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-dark-bg/70 border border-teal/40 text-xs md:text-sm text-yellow/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={project.githubUrl || 'https://github.com/VampireBoi'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-teal/70 hover:bg-teal/90 text-dark-bg font-semibold text-sm md:text-base transition-colors border border-teal/40"
                >
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-14">
          <MediaBlock
            title="What is the IK Animation Tool?"
            align="left"
            index={0}
            imageSrc={withBase('projects/IK Animation Tool/showing the dog one.webm')}
            imageAlt="Creature walking using the IK Animation Tool"
            caption="Procedural walk cycle generated entirely by the IK Animation Tool."
          >
            <p>
              The IK Animation Tool is a Unity editor utility for building procedural walk cycles for many different
              kinds of creatures. Instead of hand animating every step, you define a set of legs and parameters, and the
              tool generates dynamic real time IK motion.
            </p>
            <p>
              I built the tool in 4 days as an experiment in procedural animation, second order motion, and editor
              tooling in Unity.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Stepping logic driven by moving targets"
            align="right"
            index={1}
            imageSrc={withBase('projects/IK Animation Tool/closed shot of leg moving.webm')}
            imageAlt="Debug view of legs stepping using target points"
            caption="Each leg follows a moving target point and only steps when it drifts far enough away."
          >
            <p>
              Each leg in the system is driven by a target point that follows the creature&apos;s body. As the body moves,
              the target drifts away from the leg&apos;s last planted position. Once it crosses a distance threshold, the
              system triggers a new step for that specific leg.
            </p>
            <p>
              The tool computes a curved path for the step and fires a raycast towards the ground to find a valid
              contact point. The leg follows this path using a second order dynamics system, giving the motion a
              springy, natural feel with subtle overshoot.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Second order motion for organic movement"
            align="left"
            index={2}
            imageSrc={withBase('projects/IK Animation Tool/second order system.webm')}
            imageAlt="Visualization of second order motion used for the IK legs"
            caption="Second order dynamics add spring, overshoot, and smoothing to the raw IK movement."
          >
            <p>
              To avoid robotic motion, the tool wraps the leg movement in a second order system. Instead of snapping
              directly to the target, each leg accelerates and decelerates like a spring, which creates a more
              creature like feel.
            </p>
            <p>
              By tweaking the damping and frequency parameters, you can dial in behaviours that range from heavy,
              deliberate steps to light, elastic motion. This makes the same setup work for very different characters
              without changing any animation clips.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Automatic terrain adaptation and sound"
            align="right"
            index={3}
            imageSrc={withBase('projects/IK Animation Tool/walking on terrain.webm')}
            imageAlt="Creature walking on uneven terrain"
            caption="IK feet automatically conform to uneven terrain using layer-filtered raycasts."
          >
            <p>
              For each step, the system uses physics raycasts to find the correct ground position. A configurable list
              of physics layers lets the user choose exactly which surfaces the legs can stand on and which ones to
              ignore, so the same setup works across different levels and environments.
            </p>
            <p>
              The tool can also play random footstep sounds from a user provided list whenever a leg finishes a step,
              adding a reactive audio layer to the creature&apos;s movement.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Editor controls and workflow"
            align="left"
            index={4}
            imageSrc={withBase('projects/IK Animation Tool/showing the ui.webm')}
            imageAlt="Unity inspector for the IK Animation Tool"
            caption="Custom Unity inspector exposing leg lists, timing, curves, layers, and sound controls."
          >
            <p>
              All behaviour is exposed through a custom inspector so designers can tune motion without touching code.
              Parameters like leg travel speed, distance thresholds, body movement, and curve shape directly control how
              the walk cycle feels.
            </p>
            <p>
              Each leg has its own entry with an IK offset transform, and a periodic timer controls the global stepping
              rhythm. Optional second order settings let you push the motion towards snappy or bouncy, making it easy to
              create very different locomotion styles from the same underlying system.
            </p>
          </MediaBlock>
        </div>
      </div>
    </section>
  )
}

export default IKAnimationToolPage
