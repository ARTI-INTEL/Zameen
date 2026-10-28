/**
 * Zameen — Interactive Multimedia Tourism Website
 * Global Application Interactions & Navigation Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHeaderSearch();
  initActiveNavLink();
  initDestinationPlaceholderLinks();
  initHeroAudio();
  initNewsletterForm();
  initHomepageDiscovery();
  initSeasonalShowcase();
  initTravelGuideLocation();
});

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains("is-open")) {
      drawer.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Header Quick Search
 */
function initHeaderSearch() {
  const form = document.querySelector(".header-search-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".header-search-input");
    const query = input ? input.value.trim() : "";
    if (query) {
      window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `explore.html`;
    }
  });
}

/**
 * Highlights current active link in navigation
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".site-nav-links a, .mobile-nav-drawer a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")?.split("?")[0];
    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Detects whether the visitor is in Pakistan and tailors travel-guide content.
 * If location cannot be confirmed, international visa and flight information stays visible.
 */
function initTravelGuideLocation() {
  const guide = document.getElementById("guide-topics-container");
  if (!guide || typeof Utils === "undefined") return;

  const status = document.getElementById("travel-guide-location-status");
  if (status) status.textContent = "Checking your location to tailor visa and flight information…";

  Utils.detectUserLocation((result) => {
    const isInPakistan = result.supported && result.granted && result.inPakistan;

    document.querySelectorAll('[data-location-content="international"]').forEach((element) => {
      element.classList.toggle("location-restricted", isInPakistan);
    });

    if (status) {
      status.textContent = isInPakistan
        ? "Pakistan detected. Visa and international flight information is hidden."
        : result.granted
          ? "Outside Pakistan. Visa and flight information is available below."
          : "Location could not be confirmed. Visa and flight information remains available.";
    }
  });
}

/**
 * Shows the requested placeholder message for destination actions.
 */
function initDestinationPlaceholderLinks() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-destination-placeholder]");
    if (!button) return;

    event.preventDefault();
    window.alert("dummy button for destinations page");
  });
}

/**
 * Lets visitors enable sound on the autoplaying, initially-muted homepage video.
 */
function initHeroAudio() {
  const video = document.querySelector(".hero-video");
  const button = document.querySelector(".hero-audio-toggle");
  if (!video || !button) return;

  button.addEventListener("click", () => {
    video.muted = !video.muted;
    button.setAttribute("aria-pressed", String(!video.muted));
    button.setAttribute("aria-label", video.muted ? "Turn video sound on" : "Mute video sound");
    button.querySelector("span").textContent = video.muted ? "Enable sound" : "Mute sound";

    if (!video.muted) {
      video.play().catch(() => {
        video.muted = true;
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", "Turn video sound on");
        button.querySelector("span").textContent = "Enable sound";
      });
    }
  });
}

/**
 * Prototype Newsletter Form with Client-Side Validation
 */
function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email || !email.includes("@")) {
      Utils.showToast("Please enter a valid email address.", 3000);
      return;
    }

    Utils.showToast("Thank you for your interest! (Notice: Demonstration prototype — no email stored)", 4500);
    form.reset();
  });
}

/**
 * Homepage Discovery Form:
 * When submitted on index.html, redirects to explore.html with chosen criteria
 */
function initHomepageDiscovery() {
  const discoveryForm = document.getElementById("homepage-discovery-form");
  if (!discoveryForm) return;

  discoveryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const region = document.getElementById("home-region-select")?.value || "all";
    const experience = document.getElementById("home-experience-select")?.value || "all";
    const season = document.getElementById("home-season-select")?.value || "all";
    const search = document.getElementById("home-search-input")?.value.trim() || "";

    const params = new URLSearchParams();
    if (region && region !== "all") params.set("region", region);
    if (experience && experience !== "all") params.set("experience", experience);
    if (season && season !== "all") params.set("season", season);
    if (search) params.set("search", search);

    window.location.href = `explore.html?${params.toString()}`;
  });
}

/**
 * Homepage Seasonal Showcase Tabs
 */
function initSeasonalShowcase() {
  const container = document.getElementById("seasonal-cards-container");
  const tabButtons = document.querySelectorAll("[data-season-tab]");
  if (!container || tabButtons.length === 0) return;

  const currentSeason = Utils.getCurrentSeason();

  function renderSeason(seasonKey) {
    const matching = DESTINATIONS_DATA.filter((d) => d.seasons.includes(seasonKey)).slice(0, 3);

    container.innerHTML = matching
      .map(
        (dest) => `
        <article class="destination-card">
          <div class="destination-card-media">
            <img src="${dest.image}" alt="${Utils.escapeHTML(dest.name)}" loading="lazy" onerror="Utils.handleImageError(this, '${dest.name}')" />
            <span class="destination-card-badge">${Utils.escapeHTML(dest.province)}</span>
            <span class="destination-card-category">${Utils.escapeHTML(dest.subCategory)}</span>
          </div>
          <div class="destination-card-body">
            <h3 class="destination-card-title">
              <button type="button" data-destination-placeholder class="destination-card-title-button">
                ${Utils.escapeHTML(dest.name)}
              </button>
            </h3>
            <p class="destination-card-desc">${Utils.escapeHTML(dest.description)}</p>
            <div class="destination-card-meta">
              <span class="destination-card-season">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                ${Utils.escapeHTML(dest.bestTimeToVisit.split('(')[0])}
              </span>
              <button type="button" data-destination-placeholder class="destination-card-link">Explore &rarr;</button>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderSeason(btn.dataset.seasonTab);
    });

    if (btn.dataset.seasonTab === currentSeason) {
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    }
  });

  renderSeason(currentSeason);
}
