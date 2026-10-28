# Zameen — Interactive Multimedia Tourism Website

> **CSCU9X5 User Experience Design — Assignment 1 Prototype**  
> Built using **HTML5**, **CSS3**, the bundled **W3.CSS** stylesheet, and **Vanilla JavaScript**.  
> The visual palette follows the site's design mockup and is documented below.

---

## 1. Project Overview & Concept Justification

**Zameen** is an interactive multimedia tourism web application designed to introduce global, domestic, and overseas audiences to Pakistan's diverse cultural, historical, environmental, and recreational heritage. 

Rather than focusing solely on northern mountain tourism or acting as a static landing page, the platform organizes destinations across all seven geographic territories of Pakistan: **Gilgit-Baltistan**, **Khyber Pakhtunkhwa**, **Punjab**, **Sindh**, **Balochistan**, **Islamabad Capital Territory**, and **Azad Jammu & Kashmir**.

### Target Personas Addressed

1. **Persona 1: Local Pakistani Resident — Ahmed Khan (26, Lahore, Software Engineer)**
   - *Needs:* Affordable domestic destinations, weekend itineraries, motorway road routes, and seasonal mountain pass conditions.
   - *Implementation:* Domestic location awareness context, accessible motorway travel notes (M-2, M-5), and seasonal advisories regarding pass closures.
2. **Persona 2: Overseas Pakistani Citizen — Sara Ahmed (31, Dubai, Marketing Manager)**
   - *Needs:* Multi-day family holiday planning, cultural reconnect journeys, flight logistics, and authentic heritage exploration.
   - *Implementation:* Direct flight details to northern airfields (Skardu/Gilgit), heritage fort retreats, and qualified cultural festival dates.
3. **Persona 3: International Tourist — Daniel Weber (35, Berlin, Photographer)**
   - *Needs:* English guides, high-resolution photography, cultural etiquette guidance, high-altitude health advice, and official e-Visa links.
   - *Implementation:* A link to the official NADRA e-visa portal, acute mountain sickness (AMS) advisories, and local etiquette notes.

---

## 2. Site Color Palette

The current site palette is defined by the CSS custom properties in `css/styles.css` and reflects the Zameen design. These are the colors used throughout the interface:

### Core Palette

| Color | Hex Code | RGB Values | Primary Use |
|---|---|---|---|
| **Terracotta** | `#9D4F35` | `rgb(157, 79, 53)` | Primary buttons, badges, links, and accents |
| **Deep Navy** | `#2F3E4A` | `rgb(47, 62, 74)` | Header, footer, headings, borders, and dark panels |
| **Slate Blue** | `#8FA7B8` | `rgb(143, 167, 184)` | Image placeholders, tags, and map accents |
| **Warm Sand** | `#EFE1CA` | `rgb(239, 225, 202)` | Page and hero backgrounds |
| **Cream Surface** | `#F7F3EC` | `rgb(247, 243, 236)` | Cards and widget surfaces |

### Supporting & Semantic Colors

| Color | Hex Code | RGB Values | Primary Use |
|---|---|---|---|
| **Deep Maroon** | `#7B3A26` | `rgb(123, 58, 38)` | Hover states and darker accents |
| **Warm Sand Tint** | `#E7D3B7` | `rgb(231, 211, 183)` | Alternating section backgrounds |
| **Deep Text Navy** | `#22303A` | `rgb(34, 48, 58)` | Primary body text on light surfaces |
| **Muted Slate Text** | `#55656F` | `rgb(85, 101, 111)` | Secondary body text and captions |
| **Warm Border** | `#CDB697` | `rgb(205, 182, 151)` | Dividers and subtle outlines |

---

## 3. Project Structure & File Directory

The table below lists the main pages, scripts, stylesheets, and assets that make up the site:

| File Name | File Path | Concise & Clear Purpose |
|---|---|---|
| **Homepage** | `index.html` | The primary entry point. Opens with a full-screen local video intro, followed by destination search, featured destinations, tourism experiences, personalised recommendations, a regional map, seasonal highlights, and a prototype newsletter. |
| **Explore Destinations** | `explore.html` | Destination directory with simultaneous keyword, experience, region, season, and landscape filters; sorting, active filter tags, and card-grid/map view switching. Destination buttons show the placeholder alert. |
| **Experiences** | `experiences.html` | Category browsing showcase presenting 6 core Pakistani tourism pillars: Cultural Heritage, Nature & Wildlife, Mountains & Adventure, Sports & Festivals, Valleys & Countryside, and Coastal Tourism. Includes direct links to filtered discovery and an interactive on-page preview. |
| **Festivals** | `festivals.html` | Cultural celebration directory covering Shandur Polo, Kalash Chilam Joshi, Lok Mela, Cholistan Desert Rally, Sibi Mela, and Mela Chiraghan. Accurately distinguishes recurring seasonal dates from confirmed events and links to associated destinations using placeholder alerts. |
| **Travel Guide** | `travel-guide.html` | Practical traveler advice covering official visa requirements (with links to NADRA e-visa portal), transportation networks, lodging types, cultural customs, altitude health, an interactive "Build a Starting Point" wizard, and accessible FAQ accordions. |
| **Design System CSS** | `css/styles.css` | Central stylesheet defining the site's palette tokens, typography, responsive layouts, focus styles, buttons, video hero, and cards. |
| **W3.CSS Stylesheet** | `css/w3.css` | Bundled W3.CSS stylesheet, included in page headers. |
| **Leaflet Map CSS** | `css/leaflet.css` | Stylesheet for the Leaflet interactive map, custom markers, popups, and zoom controls. |
| **Central Dataset** | `js/data.js` | JavaScript data repository containing 15 destination summaries, 6 festival records, 6 experience categories, and regional map bounds. |
| **Shared Utilities** | `js/utils.js` | Reusable helper library providing safe HTML escaping, URL query parameter parsing, destination lookup for related content, notification toasts, image error fallbacks, and safe geolocation detection. |
| **Interactive Map Script** | `js/map.js` | Handles Leaflet map initialization, custom colored SVG map pins matching the palette, destination popups with placeholder buttons, regional zooming, and graceful offline fallbacks. |
| **Recommendation Engine** | `js/recommendations.js` | Deterministic recommendation algorithm evaluating user interests, region preferences, travel seasons, and domestic vs international location context, generating transparent reasoning for each match. |
| **Global UI & Navigation** | `js/main.js` | Global script handling responsive mobile navigation drawer toggles, header search redirection, active page link indicators, destination placeholder alerts, homepage video sound control, newsletter form validation, and homepage seasonal tab switching. |
| **Explore Controller** | `js/explore.js` | Manages live multi-facet filtering, search keyword debouncing, sorting, URL state synchronization, filter tag removal, and grid/map view switching on the Explore page. |
| **Leaflet Engine** | `js/leaflet.js` | Local production copy of the Leaflet mapping engine. |
| **Color Swatch File** | `palette.ase` | Adobe Swatch Exchange project resource; current CSS palette values are documented above and defined in `css/styles.css`. |
| **Project Documentation** | `readme.md` | Project overview, architecture notes, setup guide, and feature checklist. |
| **Brand Logo** | `assets/images/zameen-logo.png` | Zameen logo used in the site header. |
| **Favicon** | `assets/images/zameen-favicon.svg` | Palette-matched Z favicon used by all site pages. |
| **Intro Video** | `assets/videos/intro-vid-new.mp4` | Local video used as the homepage intro background. |

---

## 4. Working Interactive Features

1. **Multi-Facet Live Filtering (`explore.html`):**
   - Filters simultaneously across Keywords, Experience Category, Region, Season, and Landscape type.
   - Dynamic results count indicator.
   - Removable active filter tags / chips.
   - Reset All Filters button restoring default state.
2. **Synchronized URL Query Parameters:**
   - Filters on `explore.html` synchronize to the browser URL (e.g. `explore.html?region=gilgit-baltistan&season=summer`).
   - Allows users to bookmark or share exact filtered views.
3. **Card Grid vs. Interactive Map View Toggle:**
   - Visitors can toggle between the responsive card grid and the Leaflet interactive map on `explore.html`.
   - The map markers update dynamically to match whatever filters are currently active.
   - Destination action buttons display the placeholder alert: `dummy button for destinations page`.
4. **Smart Personalised Recommendations Engine (`index.html` & `travel-guide.html`):**
   - Matches visitor interests, region choice, travel season, and location context.
   - Outputs transparent explanations (e.g. *"Directly matches your interest in Cultural & Historical Heritage"*, *"Ideal for Autumn travel"*).
   - "Detect My Location Context" button checks browser geolocation with permission to adapt between domestic and international itineraries.
5. **Seasonal Showcase Selector (`index.html`):**
   - Interactive tabs for Spring, Summer, Autumn, and Winter switch destination cards and seasonal advice dynamically.
6. **Accessible FAQ Accordions (`travel-guide.html`):**
   - Keyboard accessible accordions (`aria-expanded`, `aria-controls`) for visa, travel, and currency questions.
7. **Instant Category Filter Showcase (`experiences.html`):**
   - On-page filter buttons allow immediate preview of destinations matching any tourism category without reloading.
8. **Newsletter Form Validation & Toast Feedback:**
   - The newsletter form validates inputs and provides immediate visual toast alerts with clear prototype notices.
9. **Graceful Multimedia Fallbacks:**
   - If external image CDNs are blocked or unavailable offline, an SVG placeholder styled with the site's palette renders automatically, preventing broken image icons.

---

## 5. How to Run the Website Locally

The website requires no build step, no Node.js compilation, and no database.

### Method 1: Using VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"** (or click "Go Live" in the bottom status bar).
4. The site will open in your default browser at `http://127.0.0.1:5500/index.html`.

### Method 2: Using Python Simple HTTP Server
Open a terminal in the project directory and execute:
```bash
python -m http.server 8000
```
Open your browser and navigate to:
```
http://localhost:8000/
```

---

## 6. Usability & Accessibility Compliance

### Selected Nielsen Usability Heuristics
- **Visibility of System Status:** Live result count indicators, active filter tags, loading placeholders, and toast feedback.
- **Match Between System and Real World:** Destination regions, travel seasons, and practical travel topics are presented using familiar terminology.
- **User Control and Freedom:** One-click "Reset All Filters" button, working navigation links, and browser back/forward support.
- **Consistency and Standards:** Unified header, navigation bar, color roles, card styles, and footer across all pages.
- **Recognition Rather Than Recall:** Visual category cards with descriptive badges reduce cognitive burden for international visitors unfamiliar with Pakistan's geography.

### WCAG 2.2 Accessibility Guidelines
- **Contrast:** Main text uses near-black navy (`#22303A`) on warm sand (`#EFE1CA`) and cream surfaces (`#F7F3EC`); headings use deep navy (`#2F3E4A`).
- **Keyboard Operability:** Skip to main content link (`.skip-link`), visible focus rings (`:focus-visible`), and keyboard-operable controls.
- **Screen Reader Support:** Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`).
- **Reduced Motion:** Fully supports `@media (prefers-reduced-motion: reduce)` to disable transitions and smooth scrolling for users with vestibular sensitivities.

---

## 7. External Libraries & Media Sources

| Library / Resource | Version | Source / URL | Purpose |
|---|---|---|---|
| **W3.CSS** | Bundled | `css/w3.css` | Stylesheet included by the HTML pages. |
| **Leaflet** | 1.9.4 | `js/leaflet.js`, `css/leaflet.css` | Bundled interactive mapping library. |
| **OpenStreetMap** | Standard Tiles | `https://www.openstreetmap.org/copyright` | External map tiles and geographical base layers. |
| **Unsplash Photography** | Remote images | `https://images.unsplash.com/` | Destination and landscape imagery referenced by the pages and dataset. |
| **Homepage Intro Video** | Local MP4 | `assets/videos/intro-vid-new.mp4` | Homepage video background. |
| **Official Visa Portal** | Government Link | `https://visa.nadra.gov.pk` | Referenced for official Pakistani electronic visa resources. |
| **PTDC** | Tourism Link | `https://tourism.gov.pk` | Referenced for official national tourism development resources. |

---

## 8. Acceptance Criteria Checklist

- [x] **HTML5** used for semantic structure across all pages.
- [x] **CSS3** used for custom styling, layouts, and responsive design.
- [x] **W3.CSS stylesheet** included in the HTML pages.
- [x] **Vanilla JavaScript** implements all interactive features with zero forbidden frameworks.
- [x] **All 5 website pages implemented**: `index.html`, `explore.html`, `experiences.html`, `festivals.html`, and `travel-guide.html`.
- [x] **Shared navigation and footer** work seamlessly across all pages.
- [x] **Interactive Map** with custom markers, popups, and zoom controls.
- [x] **Multi-facet filters and search** genuinely update results in real time.
- [x] **Destination action buttons** display the requested placeholder alert.
- [x] **Personalised recommendations** respond to user selections with transparent reasoning.
- [x] **Browser geolocation** handles permissions gracefully and adapts context without hard dependencies.
- [x] **Festival dates** clearly qualify seasonal recurring estimates vs confirmed schedules.
- [x] **Forms validate client-side** with honest prototype notifications.
- [x] **Accessibility features** include skip navigation, visible focus states, ARIA attributes, and reduced-motion handling.
