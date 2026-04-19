# Project Memory - Portfolio Website

## Important Decisions & Context

### Project Goal
Create a dynamic, clean portfolio website for Abdullah Homsi to showcase game programming skills and find college/job opportunities as a gameplay programmer.

### User Profile
- **Name**: Abdullah Homsi
- **Age**: 23 years old
- **Experience**: Started making games at 15 (8 years experience)
- **Role**: Gameplay Programmer & Designer
- **Skills**: Nearly every game dev discipline, focusing on programming
- **Goal**: Showcase programming skills for college/job applications

### Design Philosophy
- Clean and simple aesthetic
- Dynamic structure for easy project additions
- Professional presentation
- Focus on programming work over other disciplines

### Color Palette Rationale
Based on provided image reference (Cyberpunk/Vibrant aesthetic):
- Dark theme for professional gaming industry look
- Vibrant blues, teals, and warm oranges/golds for cyberpunk feel
- High contrast for visual impact

**Updated Palette (2026-04-13 02:44 AM)**:
- `#0d0812` - Dark background (was #090a12)
- `#162c54` - Secondary dark blue (was #22203c)
- `#1c4c62` - Mid blue
- `#3b6166` - Teal
- `#46857b` - Sea green
- `#8f154f` - Crimson
- `#b82d46` - Coral
- `#df803e` - Orange
- `#e2a560` - Gold (primary accent)
- `#edce5e` - Yellow (text/light)

**Previous Palette**:
- `#090a12` - Dark background
- `#22203c` - Secondary dark
- `#87717d` - Muted purple
- `#f0bbc2` - Accent pink
- `#ffffff` - White

### Animation Philosophy
- Maximum 350ms duration (user requirement)
- Scroll-based visibility (0-1 opacity scale)
- Custom animations per section
- Smooth, professional feel
- Performance-conscious (using transform/opacity)

### Content Strategy
- Placeholder content initially
- Links point to google.com until real links provided
- Placeholder images/GIFs until real assets provided
- Resume placeholder until PDF provided
- User will provide specific content later

### Section-by-Section Implementation
**Approach**: Build one section at a time, wait for approval before proceeding
- ✅ Header + Intro section
- ✅ Work section (dynamic background bar and carousels)
- ✅ Career section (education/jobs timelines + skills bars)
- ✅ About section (profile, achievements, contacts, back-to-top)
- ⏳ Project detail pages (pending)

### Technical Choices

#### Why React + Vite?
- Modern, fast development experience
- Better performance than CRA
- User requested React

#### Why Framer Motion?
- Declarative animation syntax
- Excellent scroll-based animation support
- Performance optimized
- Easy to create complex animation sequences

#### Why TailwindCSS?
- Rapid development
- Consistent design system
- Easy to maintain
- Modern best practice

#### Project Data Structure
- JSON-based project data (planned)
- Separate data from presentation
- Easy to add new projects without code changes
- Template-based project detail pages

### Key Requirements Tracking

#### Header Requirements
- ✅ Sticky positioning (always visible)
- ✅ Main button larger than others
- ✅ Even spacing for navigation buttons
- ✅ Custom animation sequence
- ✅ Scroll to intro section on main button click
- ⏳ Scroll behaviors for other buttons (pending section implementation)

#### Intro Section Requirements
- ✅ Vertical background GIF with aspect ratio preservation
- ✅ Centered content layout
- ✅ Headline: "HI, I'M ABDULLAH HOMSI"
- ✅ Decorative line
- ✅ Title: "GAMEPLAY PROGRAMMER"
- ✅ Three buttons: Work, Career, About
- ✅ Complex animation sequence (forward and reverse)
- ⏳ Button click behaviors (pending section implementation)

### Placeholder Assets Needed
- Background GIF for intro section (currently using placeholder)
- Profile photo (for About section)
- Project screenshots/GIFs
- Resume PDF
- Social media icons

### Future Considerations
- SEO optimization
- Performance optimization for animations
- Mobile responsiveness testing
- Cross-browser compatibility
- Accessibility (ARIA labels, keyboard navigation)
- Analytics integration (optional)

## Notes for Future Development

### Work Section
- Subsections: HIGHLIGHTED, PERSONAL GAMES, GAMEJAM GAMES, PROFESSIONAL GAMES, TOOLS, PROJECTS
- `SUBSECTIONS` config includes a `visible` boolean per subsection so they can be turned on/off without changing JSX
- Card-based layout with glassmorphism styling
- Each card: title, summary, tags, categories, thumbnail, background GIF, project link, optional `timeframe`, `backgroundWeight`, and `locked` flag
- `projects.json` is the single source of truth for card data (including timeframe/date range and background behaviour)
- Dynamic background bar per subsection driven by the **active, unlocked** card:
  - `DynamicBackgroundBar` accepts `maxOpacity` and uses only a vertical fade + dark mask (no horizontal fade)
  - Opacity is controlled by each project's `backgroundWeight` (0–1)
  - When the active card is locked, the background bar clears (no GIF, zero opacity)
- Horizontal carousel per subsection with active card highlighting
- For odd numbers of cards, `useCarouselScroll` initializes the active index at the middle card so it starts centered
- Subsections stacked inside a single Work section with small vertical gaps
- Interaction:
  - Thumbnail click opens project link in a new tab when unlocked
  - Active card body click opens link; non-active body click just activates the card
  - Locked cards show a gray overlay + lock icon, can still be active in the carousel, but never open links or influence the background bar
- Visual depth: active card slightly larger and most lifted, neighbor cards close to normal size but raised, background cards smaller and more transparent
- Cards also react to scroll: each subsection's cards gently shrink and fade as the subsection scrolls away, using `useScrollProgress` passed into `ProjectCarousel`/`ProjectCard`
- Carousel spacing tuned (`CARD_OFFSET` around 320) so neighbor cards have comfortable distance from the active card even when fully grown
- Cards use mouse-position-based 3D tilt on hover (Framer Motion motion values)

### Career Section
- Top-level `CAREER` title with animated line matching other sections
- Uses a `subsections` array to define Education timeline, Jobs timeline, and Skills bars, each with a `visible` flag
- Grid columns (1/2/3) are computed from how many subsections are visible so layout stays balanced when subsections are toggled
- Section bottom padding reduced (`pb-10`) to remove extra whitespace under the grid
- Scroll-based animations using `useScrollProgress`:
  - Headers/lines fade and slide in like Intro/Work, with reduced sensitivity (later start, smaller motion)
  - Timelines animate from oldest (bottom) to newest (top) with growing lines and dotted arrows, sequenced more gently
  - Vertical spine, arrows, dates, and labels all share a single centered axis; columns are visually centered under their subsection titles
  - Skill bars grow from left to right based on percentage values, driven by scroll progress (bars + labels + background all fade/grow together)
  - Skills within each category are auto-sorted by percentage (highest first)
  - Education/job labels and skill values kept in `EDUCATION_ITEMS`, `JOB_ITEMS`, and `SKILL_CATEGORIES` inside `CareerSection.jsx` (e.g. UQU, updated job history, revised skill percentages)

### About Section
- Implemented as a glassmorphism panel rendered below the Career section in `App.jsx` (`id="about"`)
- Uses `useScrollProgress` to fade in and slightly lift the panel, headline, and underline
- Desktop layout: three columns
  - Left: circular profile photo (image served from the Vite `public/` folder, e.g. `public/about me/about me picture.jpg` referenced as `url('/about me/about me picture.jpg')`)
  - Center: summary headline + gradient underline + achievements list
  - Right: contact grid
- Mobile layout: columns stack vertically (photo → text/achievements → contacts)
- Achievements come from an `ACHIEVEMENTS` array in `AboutSection.jsx` (e.g. CS bachelor graduate, over 15k followers across social media platforms)
- Contact buttons come from a `CONTACTS` array with real profile links (LinkedIn, GitHub, Instagram, YouTube, itch.io) and `mailto:m.abdullahhomsi@gmail.com` for email
- Section includes a `BACK TO THE TOP` button that smooth-scrolls back to the Intro section
- Profile photo and contacts grid are vertically centered; vertical padding reduced so the section stays compact
- Header nav "Contacts" item scrolls directly to this About section

### Project Detail Pages (IK Animation Tool + Stylized Pipeline + Template)
- First project detail page implemented for **IK Animation Tool** at `/projects/ik-animation-tool`
- Second project detail page implemented for **Stylized Art Style Pipeline** at `/projects/stylized-art-style-pipeline`
- Uses dedicated page components `IKAnimationToolPage` and `StylizedArtStylePipelinePage` under `src/pages/`
- Shared layout pattern:
  - Hero background bar driven by `DynamicBackgroundBar` and `project.backgroundGif` from `projects.json`
  - Intro card with:
    - Project title and one-paragraph summary
    - Metadata row (Year, Dev time, Type)
    - Tag pills rendered from `project.tags` so tags stay consistent with the Work carousel
    - GitHub CTA button that opens `project.githubUrl` if present, otherwise falls back to the main GitHub profile
  - Body content composed of multiple `MediaBlock` sections:
    - 2-column grid: text + image with optional caption
    - Alternating alignment (left/right) down the page
    - Entrance animations via Framer Motion: text slides down + fades in; image fades in slightly after
    - `index` prop per block for subtle top-to-bottom stagger
- Stylized pipeline specifics:
  - Driven by `project-5` in `projects.json` (tags include `graphics programming`)
  - Copy explains the multi-layer Godot 4 post-processing pipeline (depth-correct layer compositing, per-layer palettes, dot matrix screen effect, bloom, lens flare, outline shader, exposed artist controls)
  - Text explicitly notes that while the demo uses three layers, the architecture supports any number of layers
  - All 5 `MediaBlock`s have wired `imageSrc`, `imageAlt`, and contextual captions using GIFs from `public/projects/Stylized Art Style Pipeline/`
- Navigation behavior:
  - Header buttons use `navigate('/', { state: { scrollTo: id } })` from any route
  - `HomePage` reads `location.state.scrollTo` and smooth-scrolls to Intro, Work, Career, or About
- Reuse strategy for future project pages:
  - Add a new entry in `projects.json` with id, title, summary, tags, categories, thumbnail, `backgroundGif`, `projectPage`, optional `githubUrl`, etc.
  - Create a new page component in `src/pages/` mirroring the existing pattern
  - Register a new React Router route in `App.jsx` and point the project card's `projectPage` to that path
  - Copy the hero/intro card + `MediaBlock` pattern, swap text and media assets only

### Recent Data & Content Tweaks
- Projects data (`src/data/projects.json`):
  - Renumbered/reordered IDs so `project-2` is Keep Tho Flow, `project-3` is Leafy Ascent, `project-4` is IK Animation Tool (internal page), and `project-5` is Stylized Art Style Pipeline (internal page)
  - Stylized pipeline project:
    - Thumbnail updated to `art style pipeline thumbnail compressed.gif`
    - Added tag `graphics programming` to highlight advanced rendering/shader work
  - Added `project-7` (Working Progress) as a locked gamejam-style project with timeframe formatted as `2025 - Present`
- Navigation & chrome:
  - Header Resume button now opens the real CV at `/about me/CV.pdf` (from `public/about me/CV.pdf`)
  - Favicon in `index.html` updated to `/about me/logo_profile.jpg` (uses the provided logo image as the browser tab icon)
- About & Career sections:
  - About profile photo now uses `/about me/profile pic 4.jpeg` instead of the older placeholder
  - About summary copy explicitly calls out advanced graphics programming along with game design, 3D modeling, and music composition
  - Achievements trimmed to key highlights (CS bachelor + 15k+ followers)
  - Career `subsections` now hide the Jobs column (`visible: false`) while keeping Education and Skills visible
  - Spoken languages list reduced to Arabic and English in `SKILL_CATEGORIES`

## Development Timeline

- **2026-04-15**: Added per-subsection visibility flags for Work and Career, per-card timeframe/backgroundWeight/locked behavior, locked-card background clearing, odd-count carousel centering, tightened Career padding, and updated About content/links/profile photo docs
- **2026-04-14**: Implemented About section (profile, achievements, contacts, back-to-top), tuned Career/Work scroll animations, and fixed ProjectCarousel/Header React warnings
- **2026-04-13 03:19 AM**: User updated background bar (800px height, 30%/70% gradient) + animation tuning for longer visibility
- **2026-04-13 02:58 AM**: Fixed background image sizing - added min-width constraint to prevent unwanted resizing
- **2026-04-13 02:44 AM**: Color palette updated to vibrant cyberpunk scheme (10 colors)
- **2026-04-13 02:19 AM**: Project started, header and intro section implemented
