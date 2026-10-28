/**
 * Zameen — Interactive Multimedia Tourism Website
 * Utility Functions & Shared Helpers
 */

const Utils = {
  /**
   * Safe HTML escaping to prevent XSS injection
   */
  escapeHTML(str) {
    if (!str && str !== 0) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Retrieves a URL query parameter by name
   */
  getURLParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  /**
   * Updates URL query parameters cleanly without page reload
   */
  updateURLParams(paramsObj) {
    const url = new URL(window.location);
    Object.keys(paramsObj).forEach(key => {
      const val = paramsObj[key];
      if (val === null || val === undefined || val === "" || val === "all") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, val);
      }
    });
    window.history.replaceState({}, "", url);
  },

  /**
   * Finds a destination by ID or slug in the central dataset for related features.
   */
  getDestination(idOrSlug) {
    if (!idOrSlug || typeof DESTINATIONS_DATA === "undefined") return null;
    const clean = idOrSlug.trim().toLowerCase();
    return (
      DESTINATIONS_DATA.find(d => d.id.toLowerCase() === clean || d.slug.toLowerCase() === clean) ||
      null
    );
  },

  /**
   * Determines the current seasonal context in Pakistan based on date
   */
  getCurrentSeason() {
    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    if (month >= 2 && month <= 4) return "spring";   // Mar - May
    if (month >= 5 && month <= 7) return "summer";   // Jun - Aug
    if (month >= 8 && month <= 10) return "autumn";  // Sep - Nov
    return "winter";                                 // Dec - Feb
  },

  /**
   * Human-readable label for a season
   */
  getSeasonLabel(seasonKey) {
    const map = {
      spring: "Spring (Mar–May)",
      summer: "Summer (Jun–Aug)",
      autumn: "Autumn (Sep–Nov)",
      winter: "Winter (Dec–Feb)"
    };
    return map[seasonKey] || "All Year";
  },

  /**
   * Human-readable label for a region
   */
  getRegionLabel(regionKey) {
    if (typeof REGIONS_DATA !== "undefined" && REGIONS_DATA[regionKey]) {
      return REGIONS_DATA[regionKey].name;
    }
    return regionKey;
  },

  /**
   * Human-readable label for an experience category
   */
  getCategoryLabel(categoryKey) {
    if (typeof EXPERIENCE_CATEGORIES !== "undefined") {
      const match = EXPERIENCE_CATEGORIES.find(c => c.id === categoryKey);
      if (match) return match.title;
    }
    return categoryKey;
  },

  /**
   * Floating notification toast
   */
  showToast(message, duration = 3500) {
    let container = document.getElementById("site-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "site-toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Generates a tasteful SVG placeholder if an external image fails to load
   */
  handleImageError(imgEl, title = "Zameen") {
    if (!imgEl || imgEl.dataset.hasFailed) return;
    imgEl.dataset.hasFailed = "true";
    const encodedTitle = encodeURIComponent(title);
    imgEl.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%235C739E"/><path d="M0,320 L180,180 L320,300 L440,200 L600,320 L600,400 L0,400 Z" fill="%23323657"/><circle cx="480" cy="110" r="40" fill="%23E0BC88"/><text x="50%" y="85%" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">${encodedTitle}</text></svg>`;
  },

  /**
   * Checks whether the visitor's current device location is inside Pakistan.
   * Requires browser location permission; errors are reported without blocking the page.
   */
  detectUserLocation(callback) {
    if (!navigator.geolocation) {
      callback({
        supported: false,
        inPakistan: false,
        message: "Geolocation is not supported by your browser."
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Approximate Pakistan bounding box: Lat 23.5° to 37.1° N, Lng 60.8° to 77.8° E
        const inPakistan = lat >= 23.5 && lat <= 37.1 && lng >= 60.8 && lng <= 77.8;
        callback({
          supported: true,
          granted: true,
          inPakistan: inPakistan,
          coordinates: { lat, lng },
          message: inPakistan
            ? "Welcome! You appear to be in Pakistan. Domestic travel recommendations are prioritised."
            : "Welcome international traveller! Country-wide itineraries and arrival guides are prioritised."
        });
      },
      (error) => {
        let msg = "Location access was not granted. Using standard recommendations.";
        if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Using standard recommendations.";
        }
        callback({
          supported: true,
          granted: false,
          inPakistan: null,
          message: msg
        });
      },
      { timeout: 7000, maximumAge: 300000 }
    );
  }
};
