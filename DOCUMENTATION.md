# Portfolio Website - Documentation

## Project Overview

Personal portfolio website for Abdullah Homsi, a technical artist and gameplay programmer with 8 years of experience.

## Features & Implementation Status

### ✅ Completed Features

#### Initial Setup (2026-04-13)
- React project initialized with Vite
- TailwindCSS configured with custom color palette
- Framer Motion installed for animations
- React Router set up for navigation
- Project structure created

#### Header Navigation Bar
- **Status**: ✅ Implemented
- **Location**: `src/components/Header.jsx`
- **Features**:
  - Sticky positioning (always visible)
  - Main button: "Abdullah Homsi" (larger, scrolls to intro)
  - Navigation buttons: About, Work, Career, Resume, Contacts
  - Resume button opens the CV PDF from the public folder at `/about me/CV.pdf` in a new tab
  - Custom animation: Bar fades in, then buttons slide from main button position
  - Animation duration: 350ms max
  - Scroll-based visibility control

#### Introduction Section
- **Status**: ✅ Implemented
- **Location**: `src/sections/IntroSection.jsx`
- **Features**:
  - Vertical background GIF/image with aspect ratio preservation
  - Centered content layout
  - Main headline: "HI, I'M ABDULLAH HOMSI"
  - Decorative line separator
  - Title: "TECHNICAL ARTIST"
  - Three CTA buttons: Work, Career, About
  - **Animation (0→1)**:
    - Line grows from center
    - Headline and title fade in from line position (simultaneous, after 50% of line animation)
    - Buttons drop from title position with fade, staggered left-to-right
  - **Animation (1→0)**:
    - Reverse sequence: buttons up, headline/title to line, line shrinks
    - Scroll-based animation triggers

#### Project Detail Pages (IK Animation Tool & Layout Template)
- **Status**: ✅ First page implemented (IK Animation Tool), template ready for reuse
- **Location**: `src/pages/IKAnimationToolPage.jsx`
- **Route**: `/projects/ik-animation-tool`
- **Hero / Intro Layout**:
  - Uses `DynamicBackgroundBar` with `project.backgroundGif` from `projects.json` for the top background bar
  - Intro card is a rounded panel with a project-specific GIF background and a dark overlay
  - Contains project title, short one-paragraph summary, **Year**, **Dev time**, **Type**, and tag pills from `project.tags`
  - Includes a primary "View on GitHub" button that uses `project.githubUrl` when available, otherwise falls back to the user GitHub profile
- **About-the-Project Layout**:
  - Uses a reusable `MediaBlock` component for each subsection of the writeup
  - Each `MediaBlock` is a 2-column grid (text + image) with optional caption; layout alternates left/right per block
  - IK page currently uses 5 blocks: overview, stepping logic, second order system, terrain adaptation & sound, editor workflow
  - Media assets are served from the Vite `public/` folder via root-relative URLs (e.g. `/projects/IK Animation Tool/showing the dog one.gif`)
- **Animations**:
  - `MediaBlock` uses Framer Motion with `whileInView` triggers
  - Text column: slides down (`y` from -16 to 0) while fading in
  - Image column: fades in slightly after the text
  - Each block receives an `index` prop so delays are staggered from first to last (small base delay per index)
- **Navigation Integration**:
  - Header uses React Router's `navigate('/', { state: { scrollTo: id } })` when clicked from a project page
  - `HomePage` reads `location.state.scrollTo` and scrolls smoothly to the requested section (`intro`, `work`, `career`, `about`)
- **Intended Reuse**:
  - Future project pages should clone this structure:
    - Add a new route and page component in `src/pages/`
    - Add/update a project entry in `projects.json` (tags, backgroundGif, optional githubUrl, etc.)
    - Reuse the hero + intro card + `MediaBlock` layout, adjusting text and images only
  - Second project page implemented using this template: **Stylized Art Style Pipeline** at `/projects/stylized-art-style-pipeline`, driven by the `StylizedArtStylePipelinePage` component and `project-5` in `projects.json`. It uses 5 `MediaBlock`s to explain the multi-layer architecture, depth compositing, per-layer palettes + dot matrix, bloom + lens flare, and outline shader + artist controls. Copy explicitly notes that while the demo uses three layers, the system supports any number of layers.

#### Work Section
- **Status**: ✅ Implemented
- **Location**: `src/sections/WorkSection.jsx`
- **Components**:
  - `DynamicBackgroundBar` for GIF-backed bar with edge fading
  - `SubsectionHeader` for titles + animated line
  - `ProjectCarousel` for horizontal card layout
  - `ProjectCard` for individual project presentation
- **Data**:
  - `src/data/projects.json` holds all project metadata
  - Supports multiple categories per project (e.g., highlighted + personal-games)
- **Subsections Layout & Visibility**:
  - Base subsections: HIGHLIGHTED, PERSONAL GAMES, GAMEJAM GAMES, PROFESSIONAL GAMES, TOOLS, PROJECTS
  - `SUBSECTIONS` array in `WorkSection.jsx` includes a `visible` boolean for each subsection
  - Only subsections with `visible: true` are rendered; others are hidden without code changes
  - All rendered inside a single Work section as stacked subsections with small gaps
  - Each subsection has its own scroll-based animation using `useScrollProgress`
- **Visual Style**:
  - Glassmorphism cards (`bg-dark-secondary/40`, `backdrop-blur-md`)
  - Rounded corners (`rounded-2xl`)
  - Gradient overlays for readability
  - Active card glow (`shadow-lg shadow-gold/20`, `border-gold/60`)
  - Compact background bar (`h-[250px]`) anchored to the top of each subsection
- **Behavior**:
  - Horizontal carousel with previous/next controls
  - For an **odd** number of cards in a subsection, the initial active card is the **middle** card (via `useCarouselScroll`); for even counts it starts at index 0
  - Center card considered "active" and subtly scaled/lifted; neighbor cards are close to normal size but slightly raised; background cards are smaller and dimmer
  - Each project in `projects.json` can define:
    - `timeframe`: short date or date range string shown under the title (e.g. `Mar 03, 2024`)
    - `backgroundGif`: large backdrop image for the subsection
    - `backgroundWeight` (0–1): maximum opacity for the background when that card is active
    - `locked` (boolean, default `false`): if `true`, the card is visually locked and cannot navigate
  - `DynamicBackgroundBar`:
    - Accepts `maxOpacity` and clamps opacity using the active card's `backgroundWeight`
    - Uses a dark mask plus a vertical top/bottom gradient (horizontal fade removed)
    - Follows the **active card**; when the active card is locked, the background clears (no GIF and zero opacity)
  - Cards gently shrink and fade as their parent Work subsection scrolls away (driven by `useScrollProgress` passed into `ProjectCarousel`/`ProjectCard`)
  - **Card interactions**:
    - Thumbnail click opens `projectPage` in a new tab when unlocked
    - Clicking a non-active card body activates/centers it
    - Clicking the active card body opens its `projectPage` when unlocked
    - When `locked: true`, the card still participates in the carousel and can become active, but navigation is disabled
    - Locked cards show a gray overlay mask with a lock icon and never drive the subsection background bar

### 🚧 Pending Features

- Final production assets pass (polished images/GIFs)

## Technical Decisions

### Animation System
- Using Framer Motion for declarative animations
- Custom hook `useScrollProgress` tracks section visibility (0-1 scale)
- Animations respect 350ms max duration
- Smooth transitions using easing functions

### Scroll Behavior
- Intersection Observer API for section visibility
- Smooth scroll for navigation
- Progressive animation based on scroll position

### Styling Approach
- TailwindCSS for utility-first styling
- Custom color palette defined in `tailwind.config.js`
- Responsive design with mobile-first approach

## File Structure

```
src/
├── components/
│   ├── Header.jsx              # Sticky navigation header
│   ├── ProjectCard.jsx         # Work section project cards
│   ├── ProjectCarousel.jsx     # Horizontal carousel for projects
│   ├── SubsectionHeader.jsx    # Reusable subsection headers
│   └── DynamicBackgroundBar.jsx # GIF background for sections
├── sections/
│   ├── IntroSection.jsx        # Hero/Introduction section
│   ├── WorkSection.jsx         # Work/projects section
│   ├── CareerSection.jsx       # Career timeline + skills
│   └── AboutSection.jsx        # About + contacts
├── hooks/
│   ├── useScrollProgress.js    # Custom scroll tracking hook
│   ├── useCarouselScroll.js    # Basic carousel index management
│   └── useActiveCard.js        # Active project tracking per carousel
├── data/
│   └── projects.json           # Project metadata and categories
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                  # Global styles + Tailwind
```

## Color Usage Guide

**New Vibrant Palette (2026-04-13):**
- `#0d0812` - Main background (dark-bg)
- `#162c54` - Secondary backgrounds, header (dark-secondary)
- `#1c4c62` - Mid-blue backgrounds (mid-blue)
- `#3b6166` - Borders, accents (teal)
- `#46857b` - Sea green accents
- `#8f154f` - Crimson (secondary accent)
- `#b82d46` - Coral (hover states)
- `#df803e` - Orange (lines, button borders)
- `#e2a560` - Gold (primary accent, headline)
- `#edce5e` - Yellow (text, light elements)

**Tailwind Classes:**
- `bg-dark-bg` / `text-dark-bg`
- `bg-dark-secondary` / `text-dark-secondary`
- `bg-mid-blue` / `text-mid-blue`
- `bg-teal` / `border-teal`
- `text-gold` / `hover:text-gold`
- `text-yellow` / `text-yellow/80`
- `border-orange` / `text-orange` / `hover:bg-orange`

## Animation Specifications

### Header Animation
- Total duration: 350ms
- Bar background: Fade in (0-150ms)
- Buttons: Slide from main button position + fade (150-350ms)
- Stagger delay: 40ms per button
### Work Section (Section 2)
- **Status**: ✅ Implemented
- **Location**: `src/sections/WorkSection.jsx`
- **Components**:
  - `DynamicBackgroundBar` for GIF-backed bar with edge fading
  - `SubsectionHeader` for titles + animated line
  - `ProjectCarousel` for horizontal card layout
  - `ProjectCard` for individual project presentation
- **Data**:
  - `src/data/projects.json` holds all project metadata
  - Supports multiple categories per project (e.g., highlighted + personal-games)
- **Subsections Layout & Visibility**:
  - Base subsections: HIGHLIGHTED, PERSONAL GAMES, GAMEJAM GAMES, PROFESSIONAL GAMES, TOOLS, PROJECTS
  - `SUBSECTIONS` array in `WorkSection.jsx` includes a `visible` boolean for each subsection
  - Only subsections with `visible: true` are rendered; others are hidden without code changes
  - All rendered inside a single Work section as stacked subsections with small gaps
  - Each subsection has its own scroll-based animation using `useScrollProgress`
- **Visual Style**:
  - Glassmorphism cards (`bg-dark-secondary/40`, `backdrop-blur-md`)
  - Rounded corners (`rounded-2xl`)
  - Gradient overlays for readability
  - Active card glow (`shadow-lg shadow-gold/20`, `border-gold/60`)
  - Compact background bar (`h-[250px]`) anchored to the top of each subsection
- **Behavior**:
  - Horizontal carousel with previous/next controls
  - For an **odd** number of cards in a subsection, the initial active card is the **middle** card (via `useCarouselScroll`); for even counts it starts at index 0
  - Center card considered "active" and subtly scaled/lifted; neighbor cards are close to normal size but slightly raised; background cards are smaller and dimmer
  - Each project in `projects.json` can define:
    - `timeframe`: short date or date range string shown under the title (e.g. `Mar 03, 2024`)
    - `backgroundGif`: large backdrop image for the subsection
    - `backgroundWeight` (0–1): maximum opacity for the background when that card is active
    - `locked` (boolean, default `false`): if `true`, the card is visually locked and cannot navigate
  - `DynamicBackgroundBar`:
    - Accepts `maxOpacity` and clamps opacity using the active card's `backgroundWeight`
    - Uses a dark mask plus a vertical top/bottom gradient (horizontal fade removed)
    - Follows the **active card**; when the active card is locked, the background clears (no GIF and zero opacity)
  - Cards gently shrink and fade as their parent Work subsection scrolls away (driven by `useScrollProgress` passed into `ProjectCarousel`/`ProjectCard`)
  - **Card interactions**:
    - Thumbnail click opens `projectPage` in a new tab when unlocked
    - Clicking a non-active card body activates/centers it
    - Clicking the active card body opens its `projectPage` when unlocked
    - When `locked: true`, the card still participates in the carousel and can become active, but navigation is disabled
    - Locked cards show a gray overlay mask with a lock icon and never drive the subsection background bar

##
### Intro Section Animation
- Line expansion: 175ms (0-50% of total)
- Headline + Title: 175ms (starting at 50% mark)
- Buttons: 175ms (after headline/title complete)
- Button stagger: 60ms per button
- Reverse animation: Same timings in reverse order

### Career Section (Section 3)
- **Status**: ✅ Implemented
- **Location**: `src/sections/CareerSection.jsx`
- **Subsections/Layout**:
  - Top-level title `CAREER` with animated line (matches Intro/Work style)
  - `subsections` array inside `CareerSection.jsx` defines three logical subsections:
    - Education timeline (`type: 'timeline'`)
    - Jobs timeline (`type: 'timeline'`)
    - Skills bar charts (`type: 'skills'`)
  - Each subsection has a `visible` boolean; only visible subsections are rendered
  - Grid columns adapt on desktop based on visible count: 1, 2, or 3 columns
  - Overall bottom padding reduced (`pb-10`) to eliminate extra space under the grid
- **Education/Jobs Timelines**:
  - Vertical roadmap-style layout
  - Oldest entry at bottom, most recent at top
  - Each entry: period on one side of a small vertical line, label (school/company) on the other
  - Dotted arrow connecting entries upward
- **Skills Column**:
  - Groups: Programming Languages, Frameworks & Engines, Spoken Languages
  - Each group:
    - Category title with fade/slide and line animation
    - List of skills rendered as horizontal bar graphs
      - Left label: skill name
      - Right label: percentage value (0-100)
      - Background bar (`bg-dark-secondary/60`)
      - Foreground bar uses palette accent (`bg-orange`) with left-to-right grow
  - Scroll-based animation:
    - Category title fades/slides in first
    - Bars then animate from 0 width to their target width in sequence

### About Section
- **Status**: ✅ Implemented
- **Location**: `src/sections/AboutSection.jsx`
- **Layout**:
  - Glassmorphism panel rendered below Career in the main flow
  - Desktop layout: three columns
  - Left: circular profile photo (image served from the Vite `public/` folder, e.g. `public/about me/profile pic 4.jpeg` referenced as `url('/about me/profile pic 4.jpeg')`)
  - Center: summary headline + gradient underline + achievements list
  - Right: contact grid
- Mobile layout: columns stack vertically (photo → text/achievements → contacts)
- **Content & Data**:
  - Summary headline describing Abdullah as a game developer with **8+ years** of programming experience in 2D, 3D, and VR games, skilled in advanced graphics programming, game design, 3D modeling, and music composition
  - Achievements are data-driven via an `ACHIEVEMENTS` array (e.g. CS bachelor graduate, over 15k followers across social media platforms)
  - Contacts are data-driven via a `CONTACTS` array with real links for:
    - LinkedIn, GitHub, Instagram, YouTube, and itch.io
    - Email using `mailto:m.abdullahhomsi@gmail.com`
- **Contacts Behaviour**:
  - Social buttons open external profiles in new tabs; email opens the default mail client via `mailto:`
  - Header nav "Contacts" item scrolls smoothly to this section (`id="about"`)
- **Animations**:
  - Uses `useScrollProgress` to fade in and slightly lift the panel, headline, and contacts title
  - Underline uses the same gradient + `scaleX` animation pattern as other section headers
  - Profile photo uses a background image loaded from the Vite `public/` folder (e.g. `public/about me/about me picture.jpg` referenced as `url('/about me/about me picture.jpg')`)
- **Back to Top**:
  - Button labeled `BACK TO THE TOP` at the bottom of the section
  - Smooth-scrolls back to the Intro section (`id="intro"`, or top of page fallback)

## Change Log

### 2026-04-19 - GitHub Pages Deployment, Routing, Scroll & Hero Refinements
- **GitHub Pages & Routing:**
  - Confirmed deployment under the base path `/abdullah-portfoilo/` with Vite configured as `base: mode === 'production' ? '/abdullah-portfoilo/' : '/'`.
  - Switched `App.jsx` to use `HashRouter` so all internal routes are hash-based and safe on GitHub Pages (e.g. `#/projects/ik-animation-tool`).
  - Ensured all project image/GIF paths are base-aware by removing `public/` prefixes from `projects.json` and concatenating with `import.meta.env.BASE_URL` at usage sites.
- **Asset Loading & Profile Image:**
  - Normalized asset paths across `Header`, `IntroSection`, `WorkSection`, `ProjectCard`, and project pages to use `import.meta.env.BASE_URL` so images and PDFs load correctly both locally and on GitHub Pages.
  - Updated the About section profile image to use an encoded, base-aware URL so spaces and special characters in the path are handled safely:
    - `backgroundImage: url("${encodeURI(`${import.meta.env.BASE_URL}about me/profile pic 4.jpeg`)}")`.
- **Project Detail Pages (IK Animation Tool & Stylized Art Style Pipeline):**
  - Unified hero layouts for both project pages so they share the same structure and behavior:
    - A single rounded container (`rounded-2xl overflow-hidden border border-teal/40`) wraps the `DynamicBackgroundBar` and the hero card, ensuring the animated background is clipped cleanly by the card corners.
    - `DynamicBackgroundBar` is called with `progress={1}`, `maxOpacity={0.5}`, and `variant="hero"` to provide a dedicated, softer vignette and overlay style for project heroes.
    - The hero card `motion.div` uses a project-specific GIF as its CSS `backgroundImage` with `backgroundSize: 'cover'` and `backgroundPosition: 'center'`, and a semi-transparent overlay (`bg-dark-bg/40`) for readability without heavy blur.
  - **IK Animation Tool:** both the hero background bar and the intro card now use `showing the spider one.gif` as the source so the hero visual matches the intended asset.
  - **Stylized Art Style Pipeline:** hero uses `art style showcase v1 compressed.gif` for the intro card background, with the same gradient and clipping behavior as the IK page.
  - Tweaked the `hero` variant gradient in `DynamicBackgroundBar.jsx` (overlay class and RGBA stops) to make the vignette ~5% stronger while keeping the center of the image clear.
- **Project Card Navigation Behavior:**
  - Updated `ProjectCarousel` so **internal** project detail pages open in a **new tab** instead of navigating within the same tab:
    - For `project.projectPage` values starting with `/projects/`, a full hash URL is built using the Vite base (e.g. ``${import.meta.env.BASE_URL}#/projects/ik-animation-tool``) and opened via `window.open(url, '_blank')`.
    - External projects continue to use `window.open(project.projectPage, '_blank')` unchanged.
  - This preserves the main page scroll position in the original tab while allowing deep dives into project pages.
- **Scroll Behavior & Refresh Experience:**
  - Removed global `html { scroll-behavior: smooth; }` from `index.css` so only intentional JS-driven smooth scroll remains (via `element.scrollIntoView({ behavior: 'smooth' })`).
  - Implemented home-page scroll persistence in `HomePage` (inside `App.jsx`):
    - On `/`, a `useLayoutEffect` restores the previous `window.scrollY` from `sessionStorage.homeScrollY` on initial load, **unless** navigation explicitly requested a section (via `location.state.scrollTo`).
    - A `useEffect` attaches a `scroll` listener while on `/` that continuously updates `sessionStorage.homeScrollY` with the current scroll position.
    - A separate effect continues to handle header-driven section jumps by reading `location.state.scrollTo` and calling `scrollIntoView({ behavior: 'smooth', block: 'start' })` for the target element.
  - Net result:
    - Manual refreshes on the main page generally return the user to the same section (including the Career section) without the long smooth animation previously caused by global CSS smooth scrolling.
    - Header navigation and intro buttons still provide smooth scroll to their target sections.
- **Career Section Stability:**
  - Verified that `CareerSection` itself never calls `scrollTo`/`scrollIntoView`; its behavior is purely driven by `useScrollProgress` and Framer Motion.
  - The earlier visible top-then-jump effect when refreshing at the Career section was traced to browser scroll restoration combined with global smooth scroll CSS; with CSS smooth scroll removed and explicit JS restoration in place, the Career section now behaves consistently with other sections.

### 2026-04-18 - Stylized Pipeline Page, Data Tweaks, and Resume/Favicon
- Implemented the **Stylized Art Style Pipeline** project detail page at `/projects/stylized-art-style-pipeline` using the existing `MediaBlock`-based template:
  - New `StylizedArtStylePipelinePage` reads `project-5` from `projects.json` and mirrors the IK layout (hero bar, intro card, tags, GitHub button, 5 media blocks)
  - Intro and body copy describe the multi-layer Godot 4 post-processing pipeline (depth-correct compositing, per-layer palettes, dot matrix effect, bloom, lens flare, outline shader, and artist-facing controls)
  - Text now clearly states that the system can handle any number of layers, while the demo uses three
  - Each `MediaBlock` has wired `imageSrc`, `imageAlt`, and context-appropriate `caption` values pointing at stylized GIFs under `public/projects/Stylized Art Style Pipeline/`
- Updated `projects.json`:
  - Reordered/renumbered projects so:
    - `project-2` → Keep Tho Flow
    - `project-3` → Leafy Ascent
    - `project-4` → IK Animation Tool (internal page `/projects/ik-animation-tool`)
    - `project-5` → Stylized Art Style Pipeline (internal page `/projects/stylized-art-style-pipeline`)
  - Stylized pipeline project now has a compressed thumbnail (`art style pipeline thumbnail compressed.gif`) and a new `graphics programming` tag
  - Added `project-7` (**Working Progress**) as a locked gamejam project with timeframe `2025 - Present`
- Navigation and chrome tweaks:
  - Header "Resume" button now opens the real CV PDF at `/about me/CV.pdf` in a new tab
  - Favicon updated in `index.html` to use `/about me/logo_profile.jpg` instead of the default Vite icon
- About/Career content adjustments:
  - About profile image now uses `/about me/profile pic 4.jpeg`
  - About summary explicitly mentions advanced graphics programming alongside game design, 3D modeling, and music composition
  - Achievements list simplified to core highlights (CS bachelor + 15k followers across platforms)
  - Career section hides the Jobs timeline subsection for now (`visible: false`) while keeping Education and Skills visible
  - Spoken languages trimmed to Arabic and English; other entries removed from `SKILL_CATEGORIES`

### 2026-04-16 - IK Animation Tool Project Page & Layout Template
- Implemented the first project detail page for the IK Animation Tool at `/projects/ik-animation-tool`
- Added `IKAnimationToolPage` with:
  - Hero background bar driven by `DynamicBackgroundBar` and `project.backgroundGif`
  - Intro card using a project-specific GIF background, dark overlay, and metadata row (Year, Dev time, Type)
  - Tag pills sourced from `projects.json` so tags stay in sync across the carousel and detail page
  - GitHub CTA button that reads `project.githubUrl` when present, falling back to the main GitHub profile
- Created a reusable `MediaBlock` component with alternating left/right layout and scroll-triggered animations:
  - Text slides down and fades in first, image fades in slightly after
  - Staggered animation using an `index` prop for a top-to-bottom reveal
- Wired header navigation to work from any route by using React Router state (`scrollTo`) and handling scroll on the home page
- Normalized descriptive copy for the IK page (e.g., "4 days" dev time, spelling/spacing tweaks, no hyphenated phrases in user-facing text)

### 2026-04-15 - Work/Career/About Enhancements
- Work section:
  - Added per-subsection `visible` flags in `SUBSECTIONS` to easily hide/show HIGHLIGHTED, PERSONAL GAMES, GAMEJAM GAMES, PROFESSIONAL GAMES, TOOLS, and PROJECTS
  - Extended `projects.json` with `timeframe` (date/range), `backgroundWeight` (0–1), and `locked` booleans for each project
  - Updated `ProjectCard` to display `timeframe` under the title and support a `locked` state with a gray overlay + lock icon; locked cards cannot open `projectPage`
  - Updated `DynamicBackgroundBar` to accept `maxOpacity`, use a vertical-only gradient, and follow the active card's `backgroundGif` and `backgroundWeight`
  - Ensured locked cards never drive the subsection background: when a locked card is active the GIF/opacity clear, leaving a blank background
  - Adjusted `useCarouselScroll` so odd-length carousels start with the middle card as active
- Career section:
  - Introduced a `subsections` config with `visible` flags and dynamic grid columns (1/2/3) based on which of Education, Jobs, and Skills are shown
  - Reduced bottom padding of the section (`pb-10`) to remove excess whitespace below the grid
- About section:
  - Updated copy to 8+ years of programming experience and refreshed achievements (e.g. over 15k followers)
  - Replaced placeholder contact URLs with real LinkedIn, GitHub, Instagram, YouTube, and itch.io links; email kept as `mailto:`
  - Documented profile photo referencing via the Vite `public/` folder and use of the updated biography text
  - Line: `progress * 3` (was 2)
  - Text: starts 15%, multiplier 2.5
  - Buttons: starts 25%, multiplier 2
- Content stays visible much longer during scroll

### 2026-04-14 - Career Section Implementation & Tuning
- Implemented `CareerSection` as Section 3 with three columns: Education timeline, Jobs timeline, and Skills bar charts
- Added data-driven structures for education (`EDUCATION_ITEMS`), jobs (`JOB_ITEMS`), and skills (`SKILL_CATEGORIES`) inside `src/sections/CareerSection.jsx`
- Tuned scroll-based animations to be less sensitive:
  - Reduced header line/text multipliers so titles move less and start later
  - Delayed and softened timeline item animations (smaller X/Y offsets, slower sequencing)
  - Adjusted skills category/title and bar animations to start later with gentler motion
- Refined timeline layout/alignment:
  - Dates on the left, labels on the right, with a single centered vertical spine
  - Dotted arrows placed between items, aligned exactly on the same vertical axis as the spine and pointing upward
  - Even vertical spacing between each item and its connecting arrow, with the whole column centered under its subsection title
- Updated skills column behaviour:
  - Bars now grow smoothly with scroll (width + `scaleX`) instead of just fading
  - Deep blue bar backgrounds fade in/out together with the foreground bar and labels
  - Skill lists within each category are automatically sorted by percentage value (highest first)
- Updated initial data values/labels to match current CV:
  - Education labels shortened (e.g. `Umm Al-Qura University` → `UQU`, `Vancouver Film School` → `VFS`)
  - Skill percentages adjusted (e.g. `C#` now 95, Arabic/English/French updated)

### 2026-04-14 - Work Section Carousel Scroll Behaviour
- Passed Work subsection `useScrollProgress` value into `ProjectCarousel` and `ProjectCard`
- Cards now gently shrink and fade out as their parent Work subsection scrolls away from the viewport
- Tuned card scaling so the active card is highlighted without overwhelming neighbors:
  - Active/neighbor base scale reduced (active ~1.08, neighbors ~1.0)
  - Section-level scroll scale narrowed (approx. 0.95–1.05)
- Increased horizontal card offset (`CARD_OFFSET` from 300 → 320) so neighbor cards sit further from the active card when fully grown

### 2026-04-14 - About Section Implementation
- Implemented `AboutSection` with three-column glassmorphism layout (profile photo, summary + achievements, contacts grid)
- Wired `AboutSection` into `App.jsx` after the Career section and assigned it the anchor `id="about"`
- Added data-driven `ACHIEVEMENTS` and `CONTACTS` arrays inside `AboutSection.jsx` (achievements include CS/VFS degrees and 20k+ followers; contacts include LinkedIn, GitHub, Email, Instagram, YouTube, itch.io)
- Implemented scroll-based animations using `useScrollProgress` for the panel, headline, and underline, matching the existing line animation style
- Added a `BACK TO THE TOP` button that smooth-scrolls to the Intro section
- Tuned layout and spacing: vertically centered profile photo and contact grid, reduced vertical padding so the section is more compact, and slightly reduced headline font size

### 2026-04-15 - Work/Career/About Enhancements
- Work section:
  - Added per-subsection `visible` flags in `SUBSECTIONS` to easily hide/show HIGHLIGHTED, PERSONAL GAMES, GAMEJAM GAMES, PROFESSIONAL GAMES, TOOLS, and PROJECTS
  - Extended `projects.json` with `timeframe` (date/range), `backgroundWeight` (0–1), and `locked` booleans for each project
  - Updated `ProjectCard` to display `timeframe` under the title and support a `locked` state with a gray overlay + lock icon; locked cards cannot open `projectPage`
  - Updated `DynamicBackgroundBar` to accept `maxOpacity`, use a vertical-only gradient, and follow the active card's `backgroundGif` and `backgroundWeight`
  - Ensured locked cards never drive the subsection background: when a locked card is active the GIF/opacity clear, leaving a blank background
  - Adjusted `useCarouselScroll` so odd-length carousels start with the middle card as active
- Career section:
  - Introduced a `subsections` config with `visible` flags and dynamic grid columns (1/2/3) based on which of Education, Jobs, and Skills are shown
  - Reduced bottom padding of the section (`pb-10`) to remove excess whitespace below the grid
- About section:
  - Updated copy to 8+ years of programming experience and refreshed achievements (e.g. over 15k followers)
  - Replaced placeholder contact URLs with real LinkedIn, GitHub, Instagram, YouTube, and itch.io links; email kept as `mailto:`
  - Documented profile photo referencing via the Vite `public/` folder and use of the updated biography text

### 2026-04-13 - Background Image Sizing Fix
- **Time**: 02:58 AM
- Fixed background GIF resizing issue with browser window
- Added `min-w-[1200px]`, `max-w-none`, and centering transform
- Image now maintains minimum width while filling the bar
- Prevents unwanted shrinking/growing with viewport changes

### 2026-04-13 - Color Palette Update
- **Time**: 02:44 AM
- Switched to vibrant cyberpunk color palette (10 colors)
- New scheme: dark blues + teals + warm oranges/golds
- Updated all components (Header, IntroSection, App)
- Updated documentation with new Tailwind classes

### 2026-04-13 - Initial Implementation
- Created project structure
- Implemented Header component with scroll-based animation
- Implemented Introduction section with complex animation sequence
- Set up custom scroll progress tracking
- Configured color palette and styling system
- Implemented Introduction section with complex animation sequence
- Set up custom scroll progress tracking
- Configured color palette and styling system
