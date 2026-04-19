import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import DynamicBackgroundBar from '../components/DynamicBackgroundBar'
import data from '../data/projects.json'

const withBase = (path) => `${import.meta.env.BASE_URL}${path}`

const MediaBlock = ({ title, align = 'left', children, imageSrc, imageAlt, caption, index = 0 }) => {
  const textFirst = align === 'left'
  const baseDelay = 0.03 + index * 0.07

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
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <span className="text-yellow/60 text-sm">Media placeholder</span>
          )}
        </div>
        {caption && <p className="mt-2 text-xs md:text-sm text-yellow/70">{caption}</p>}
      </motion.div>
    </div>
  )
}

const StylizedArtStylePipelinePage = () => {
  const [ref, progress] = useScrollProgress()
  const project = (data.projects || []).find((p) => p.id === 'project-5') || {}

  const containerOpacity = 1
  const containerY = 0

  const tags = project.tags || []
  const heroGif = project.backgroundGif ? withBase(project.backgroundGif) : null

  return (
    <section
      id="stylized-art-style-pipeline"
      ref={ref}
      className="section-container relative flex flex-col items-center justify-start px-6 pt-24 pb-20"
    >
      <div className="absolute inset-0">
        <DynamicBackgroundBar activeGif={heroGif} progress={progress} maxOpacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          className="w-full rounded-2xl overflow-hidden backdrop-blur-md border border-teal/40 mb-14"
          style={{
            opacity: containerOpacity,
            y: containerY,
            backgroundImage: `url(${withBase('projects/Stylized Art Style Pipeline/art style showcase v1 compressed.gif')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full h-full bg-dark-bg/75 px-6 md:px-10 py-8 md:py-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-4">
              {project.title || 'Stylized Art Style Pipeline'}
            </h1>
            <p className="text-sm md:text-base text-yellow/90 max-w-3xl">
              A custom real time multi layer post processing pipeline built in Godot 4 using GLSL shaders. It composites
              multiple scene layers with depth aware sorting, per layer color palettes, dot matrix screen effects, bloom,
              and lens flare to create a stylized retro inspired 3D look. The reference setup uses three layers, but the
              system itself is built to handle any number of layers.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm md:text-base text-yellow/90">
              <div>
                <span className="font-semibold text-gold">Year:</span> {project.timeframe || '2026'}
              </div>
              <div>
                <span className="font-semibold text-gold">Dev time:</span> Ongoing
              </div>
              <div>
                <span className="font-semibold text-gold">Type:</span> Real Time Rendering Pipeline
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

        <div className="space-y-14">
          <MediaBlock
            title="What is the stylized art style pipeline?"
            align="left"
            index={0}
            imageSrc={withBase('projects/Stylized Art Style Pipeline/art style showcase v7.gif')}
            imageAlt="Stylized art style pipeline overview"
            caption="Overview of the stylized multi layer post processing pipeline in action."
          >
            <p>
              The stylized art style pipeline is a real time post processing system built entirely in Godot 4. It is
              designed to give 3D scenes a cohesive retro inspired look by combining multiple independently rendered
              layers, depth based compositing, and a stack of screen space effects.
            </p>
            <p>
              Instead of relying on a single full screen effect, the pipeline treats the scene as multiple separate
              layers with their own cameras, color palettes, and optional screen effects. In practice the demo uses
              three layers, but the architecture is generic and can be extended to more. All active layers are composed
              together in one shader pass, which keeps the look consistent while staying efficient enough for real time
              use.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Multi layer architecture and depth compositing"
            align="right"
            index={1}
            imageSrc={withBase('projects/Stylized Art Style Pipeline/artstyle pipeline diagram.gif')}
            imageAlt="Stylized scene showing layered depth compositing"
            caption="Diagram of the layered viewport setup and depth based compositing across the scene."
          >
            <p>
              The pipeline is typically set up with three viewport layers, each rendered from its own camera and paired
              with a depth viewport. Under the hood the system simply loops over however many layers you configure, so it
              can scale beyond three when needed. A custom depth detect shader linearizes the raw hardware depth values
              into grayscale textures, so the main post process shader can reason about actual scene depth per pixel.
            </p>
            <p>
              In the main multi layer post process shader, the depth masks from each layer are compared per pixel to
              decide which layer is closest to the camera. This allows geometry from different layers to interleave
              correctly in screen space, so foreground, midground, and background elements can sit on different layers
              without breaking occlusion.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Per layer palettes and dot matrix screen effect"
            align="left"
            index={2}
            imageSrc={withBase('projects/Stylized Art Style Pipeline/art style showcase v3 compressed.gif')}
            imageAlt="Stylized color grading and dot matrix effect"
            caption="Example of per layer color palettes combined with an optional dot matrix screen effect."
          >
            <p>
              Every layer can be graded through its own one dimensional color palette texture. The shader measures the
              brightness of each pixel, uses that value as a coordinate into the palette, and replaces the original
              color with the palette color. This lets the foreground, midground, and background each carry their own
              stylized color ramp while still coming from the same underlying scene.
            </p>
            <p>
              On top of that, each layer can enable a dot matrix screen effect. The shader computes luminance using a
              configurable vector, pushes it through a contrast curve, and modulates it with a sine based dot grid. Dot
              brightness, contrast, scale, and matrix strength are all exposed as uniforms, so you can dial the effect
              anywhere from subtle retro noise to a very bold screen door pattern.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Bloom and lens flare for stylized highlights"
            align="right"
            index={3}
            imageSrc={withBase('projects/Stylized Art Style Pipeline/froggy.gif')}
            imageAlt="Stylized highlights with bloom and lens flare"
            caption="Bright highlights enhanced with thresholded bloom and a screen space lens flare mask."
          >
            <p>
              Bloom is implemented as a custom three by three blur kernel that runs per layer using bilinear sampling.
              Only pixels above a configurable threshold contribute to the bloom buffer, which keeps dark areas crisp
              while letting bright hotspots glow. The blurred result is then added back onto the base color, scaled by a
              bloom intensity control.
            </p>
            <p>
              A separate flare mask texture is used to push the bloom in screen space. The shader samples the mask and
              uses its red channel to offset the bloom UV lookup, effectively smearing bright pixels along the flare
              pattern. The strength and tiling of this effect are driven by uniforms, so you can go from subtle chromatic
              streaks to very pronounced lens artifacts.
            </p>
          </MediaBlock>

          <MediaBlock
            title="Outline shader and artist facing controls"
            align="left"
            index={4}
            imageSrc={withBase('projects/Stylized Art Style Pipeline/art style showcase v10.gif')}
            imageAlt="Stylized outline shader and control panel"
            caption="Stylized outlines and artist facing controls used to tune the final look inside Godot."
          >
            <p>
              A dedicated outline shader adds toon friendly edges around objects. It samples neighboring pixels in a
              configurable radius and looks for transparent to opaque transitions, painting an outline color wherever it
              finds an edge. The same shader also implements a simple toon lighting model that blends between ambient and
              lit colors using a smooth threshold, giving the scene a clean two tone shading style.
            </p>
            <p>
              All of the core parameters are exposed in the Godot material inspector. Artists can tweak bloom radius,
              threshold, and intensity, flare mask power and scale, per layer color palettes and dot toggles, luminance
              weights, dot brightness, contrast, and matrix strength without touching shader code. That makes the
              pipeline practical for production, where the look needs to be iterated on quickly.
            </p>
          </MediaBlock>
        </div>
      </div>
    </section>
  )
}

export default StylizedArtStylePipelinePage
