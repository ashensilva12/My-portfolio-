# My Portfolio — Project Guide

A modern, responsive portfolio built with vanilla HTML, CSS, and JavaScript. It includes a polished hero, About, Skills, Projects (with filtering), Contact (social links), dark mode, a loader, scroll indicators, lazy‑loaded images, and a mobile right‑side drawer menu.

## Quick start

- Open the project folder and launch the site:
	- Windows (PowerShell): `start index.html`
	- Or just double‑click `index.html`

## Project structure

```
My-portfolio-
├── index.html        # Page markup and sections
├── style.css         # Styles, layout, theming, responsive rules
├── script.js         # Interactivity: menu, scroll, dark mode, projects
├── assets/           # fonts/icons/images (if used)
└── images/           # your local images (profile, projects)
```

## What each file does (line by line, summarized)

### index.html

- `<!DOCTYPE html>` through `<head> ... </head>`
	- Sets HTML5 doctype, language, meta viewport for mobile.
	- SEO tags: description, keywords, OpenGraph info, theme color.
	- Loads Google Font (Poppins) and Font Awesome icons.
	- Links `style.css`.

- `<body>`
	- `<div id="loader" class="loader"></div>`: full‑page loader shown briefly on start.
	- `<header>`: sticky header with navbar.
		- `<nav class="navbar">`: brand + nav list + hamburger icon (mobile).
		- `<ul id="navLinks">`: links to Home, About, Skills, Projects, Contact and a dark mode button.
		- `<div id="hamburger">`: the mobile menu trigger.
		- `<div id="scrollIndicator">`: thin progress bar indicating page scroll.
	- `<div id="navOverlay" class="nav-overlay">`: backdrop for the right‑side drawer on mobile.

- `<main>`
	- `#home` (Hero section):
		- Left: Headline, short subtitles, and call‑to‑action buttons.
		- Right: Profile image in a circular frame with gradient halo and floating accents.
	- `#about` (About section):
		- Left: About profile image.
		- Right: Two paragraphs about you, animated counters (Years/Projects), and highlight chips.
	- `#skills` (Skills section):
		- Icon‑labeled skills with subtle hover animations.
	- `#projects` (Projects section):
		- Filter buttons (built by JS) and a grid of project cards.
	- `#contact` (Contact section):
		- Social links (Facebook, Instagram, LinkedIn, GitHub) and an email link.

- `<footer>`
	- Copyright with the current year set by JS.

- `<script src="script.js"></script>` loads interactivity.

### style.css

- Base / Reset
	- Normalizes box‑sizing; sets fonts; applies a light gradient background and smooth transitions.

- Header / Navbar
	- Sticky header with a colorful gradient.
	- Desktop: inline nav links with hover/focus styles (distinct for light/dark mode).
	- Mobile: under 900px, the nav transforms into a right‑side drawer with a translucent overlay.
		- Drawer: rounded inside corners, gradient accent bar, scrollable panel, elevated shadow.
		- Overlay: no blur; fades in and intercepts clicks when the drawer is open.

- Hero
	- Two‑column layout (wraps on small screens).
	- Name styling with gradient text and an underline accent.
	- Circular profile image with a thin gradient ring and floating decorative dots.
	- CTA buttons with gradient/hover effects.

- About
	- Larger, centered image with border/shadow.
	- Paragraph spacing for readability.
	- Gradient counters and highlight chips.

- Skills
	- Icons scale and recolor on hover/focus.

- Projects
	- Cards with a gradient accent bar and hover lift.
	- Lazy images display without blur once loaded.

- Contact
	- Social buttons in a responsive grid with hover elevation.

- Back to top
	- Floating circular button appears after scrolling down.

- Responsive rules
	- Tweak paddings, font sizes, and image sizes below 900px/600px.

### script.js

- Loader
	- Fades out the loader after the DOM loads.

- Mobile menu / Drawer
	- Toggles a right‑side drawer (`#navLinks`) and overlay (`#navOverlay`).
	- Locks body/html scroll while open; unlocks on close.
	- Closes on overlay click or Esc key.
	- Auto‑closes when the window is resized to desktop width.

- Smooth scrolling
	- `smoothScrollTo()` scrolls to any section with an offset for the sticky header.
	- Global handler for all in‑page anchors: closes the drawer, then smooth‑scrolls.
	- On page load with a hash (e.g., `#projects`), scrolls to the section after a short delay.

- Dark mode
	- Detects system preference; saves your choice in `localStorage`.
	- Updates the toggle button to show ☀️/🌙.

- Scroll indicator
	- Sets the width of the top progress bar based on how far down the page you are.

- Back to top
	- Shows a floating button after 300px; smooth‑scrolls to the top on click.

- Projects & filtering
	- `projects` array holds project metadata (title, category, description, image, links).
	- Builds category filter buttons and re‑renders the project grid on filter change.
	- Lazy‑loads project images by assigning `src` from `data-src`.

- About counters
	- `yearsExp`: calculated from the `data-start-year` attribute.
	- `projectsDone`: from the length of the `projects` array.
	- Numbers animate from 0 to target.

- Footer year
	- Inserts the current year into the footer.

## Customize

- Change your name, subtitles, and hero text in `index.html` under the Hero section.
- Replace profile images in `images/` and update the `<img src>` paths.
- Add or edit projects in `script.js` (the `projects` array).
- Tweak colors/gradients in `style.css` (look for linear‑gradient values and color hex codes).
- Start year for experience: change `data-start-year` in the About counters.

## Troubleshooting

- Mobile menu doesn’t scroll: ensure `.nav-links` has `overflow-y: auto;` and that the drawer is closed to restore page scroll.
- Links don’t navigate on mobile: anchor `href` must match section `id` (e.g., `href="#skills"` ↔ `id="skills"`). The global smooth‑scroll handler should handle it.
- Images large or blurry: compress images and ensure correct paths under `images/`.

## License

This project is provided as-is for personal portfolio use. You may modify and deploy it for your own site.
