/**
 * Zameen — Interactive Multimedia Tourism Website
 * Explore Page Search, Multi-Facet Filtering, Sorting & View Toggle
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("explore-results-grid")) return;
  ExplorePage.init();
});

const ExplorePage = {
  filters: {
    search: "",
    experience: "all",
    region: "all",
    season: "all",
    type: "all"
  },
  sortBy: "default",
  viewMode: "grid", // 'grid' or 'map'

  init() {
    this.readURLParams();
    this.bindEvents();
    this.applyFilters();
  },

  readURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("search")) this.filters.search = params.get("search");
    if (params.has("experience")) this.filters.experience = params.get("experience");
    if (params.has("region")) this.filters.region = params.get("region");
    if (params.has("season")) this.filters.season = params.get("season");
    if (params.has("type")) this.filters.type = params.get("type");

    // Sync input controls with URL params
    const searchInput = document.getElementById("filter-search");
    const expSelect = document.getElementById("filter-experience");
    const regSelect = document.getElementById("filter-region");
    const seasonSelect = document.getElementById("filter-season");
    const typeSelect = document.getElementById("filter-type");

    if (searchInput) searchInput.value = this.filters.search;
    if (expSelect) expSelect.value = this.filters.experience;
    if (regSelect) regSelect.value = this.filters.region;
    if (seasonSelect) seasonSelect.value = this.filters.season;
    if (typeSelect) typeSelect.value = this.filters.type;
  },

  bindEvents() {
    const searchInput = document.getElementById("filter-search");
    const expSelect = document.getElementById("filter-experience");
    const regSelect = document.getElementById("filter-region");
    const seasonSelect = document.getElementById("filter-season");
    const typeSelect = document.getElementById("filter-type");
    const sortSelect = document.getElementById("sort-by-select");
    const resetBtn = document.getElementById("btn-reset-filters");
    const viewGridBtn = document.getElementById("btn-view-grid");
    const viewMapBtn = document.getElementById("btn-view-map");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filters.search = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (expSelect) {
      expSelect.addEventListener("change", (e) => {
        this.filters.experience = e.target.value;
        this.applyFilters();
      });
    }

    if (regSelect) {
      regSelect.addEventListener("change", (e) => {
        this.filters.region = e.target.value;
        this.applyFilters();
      });
    }

    if (seasonSelect) {
      seasonSelect.addEventListener("change", (e) => {
        this.filters.season = e.target.value;
        this.applyFilters();
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener("change", (e) => {
        this.filters.type = e.target.value;
        this.applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetFilters();
      });
    }

    if (viewGridBtn && viewMapBtn) {
      viewGridBtn.addEventListener("click", () => this.switchView("grid"));
      viewMapBtn.addEventListener("click", () => this.switchView("map"));
    }
  },

  switchView(mode) {
    this.viewMode = mode;
    const gridView = document.getElementById("explore-results-grid");
    const mapView = document.getElementById("explore-map-view");
    const gridBtn = document.getElementById("btn-view-grid");
    const mapBtn = document.getElementById("btn-view-map");

    if (mode === "grid") {
      if (gridView) gridView.style.display = "grid";
      if (mapView) mapView.style.display = "none";
      if (gridBtn) gridBtn.classList.add("active");
      if (mapBtn) mapBtn.classList.remove("active");
    } else {
      if (gridView) gridView.style.display = "none";
      if (mapView) mapView.style.display = "block";
      if (gridBtn) gridBtn.classList.remove("active");
      if (mapBtn) mapBtn.classList.add("active");

      // Initialize or refresh map with current filtered items
      if (!PakistanMap.mapInstance) {
        PakistanMap.init("pakistan-map", { destinations: this.currentFilteredData });
      } else {
        PakistanMap.renderMarkers(this.currentFilteredData);
        setTimeout(() => PakistanMap.mapInstance.invalidateSize(), 150);
      }
    }
  },

  resetFilters() {
    this.filters = {
      search: "",
      experience: "all",
      region: "all",
      season: "all",
      type: "all"
    };

    const searchInput = document.getElementById("filter-search");
    const expSelect = document.getElementById("filter-experience");
    const regSelect = document.getElementById("filter-region");
    const seasonSelect = document.getElementById("filter-season");
    const typeSelect = document.getElementById("filter-type");

    if (searchInput) searchInput.value = "";
    if (expSelect) expSelect.value = "all";
    if (regSelect) regSelect.value = "all";
    if (seasonSelect) seasonSelect.value = "all";
    if (typeSelect) typeSelect.value = "all";

    Utils.updateURLParams({});
    this.applyFilters();
    Utils.showToast("Filters reset to default.");
  },

  applyFilters() {
    let results = DESTINATIONS_DATA.filter((dest) => {
      // 1. Keyword search match
      if (this.filters.search) {
        const q = this.filters.search.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesDesc = dest.description.toLowerCase().includes(q);
        const matchesProv = dest.province.toLowerCase().includes(q);
        const matchesTags = dest.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesProv && !matchesTags) return false;
      }

      // 2. Experience match
      if (this.filters.experience !== "all" && dest.category !== this.filters.experience) {
        return false;
      }

      // 3. Region match
      if (this.filters.region !== "all" && dest.region !== this.filters.region) {
        return false;
      }

      // 4. Season match
      if (this.filters.season !== "all" && !dest.seasons.includes(this.filters.season)) {
        return false;
      }

      // 5. Destination Type match
      if (this.filters.type !== "all") {
        if (!dest.subCategory.toLowerCase().includes(this.filters.type.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    // Apply Sorting
    if (this.sortBy === "name-asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === "name-desc") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortBy === "region") {
      results.sort((a, b) => a.province.localeCompare(b.province));
    }

    this.currentFilteredData = results;
    this.renderActiveFilterChips();
    this.renderResults(results);

    // Sync to URL
    Utils.updateURLParams(this.filters);

    // If map view is currently active, sync markers
    if (this.viewMode === "map" && PakistanMap.mapInstance) {
      PakistanMap.renderMarkers(results);
    }
  },

  renderActiveFilterChips() {
    const container = document.getElementById("active-filter-chips");
    if (!container) return;

    let chipsHtml = "";
    if (this.filters.search) {
      chipsHtml += `<span class="filter-chip">Search: "${Utils.escapeHTML(this.filters.search)}" <button data-remove-filter="search" aria-label="Remove search filter">&times;</button></span>`;
    }
    if (this.filters.experience !== "all") {
      chipsHtml += `<span class="filter-chip">${Utils.escapeHTML(Utils.getCategoryLabel(this.filters.experience))} <button data-remove-filter="experience" aria-label="Remove category filter">&times;</button></span>`;
    }
    if (this.filters.region !== "all") {
      chipsHtml += `<span class="filter-chip">${Utils.escapeHTML(Utils.getRegionLabel(this.filters.region))} <button data-remove-filter="region" aria-label="Remove region filter">&times;</button></span>`;
    }
    if (this.filters.season !== "all") {
      chipsHtml += `<span class="filter-chip">${Utils.escapeHTML(Utils.getSeasonLabel(this.filters.season).split(' ')[0])} <button data-remove-filter="season" aria-label="Remove season filter">&times;</button></span>`;
    }

    container.innerHTML = chipsHtml;

    // Bind chip remove buttons
    container.querySelectorAll("[data-remove-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filterKey = btn.dataset.removeFilter;
        if (filterKey === "search") {
          this.filters.search = "";
          const el = document.getElementById("filter-search");
          if (el) el.value = "";
        } else {
          this.filters[filterKey] = "all";
          const el = document.getElementById(`filter-${filterKey}`);
          if (el) el.value = "all";
        }
        this.applyFilters();
      });
    });
  },

  renderResults(destinations) {
    const grid = document.getElementById("explore-results-grid");
    const countEl = document.getElementById("results-count-text");
    if (!grid) return;

    if (countEl) {
      countEl.textContent = `${destinations.length} destination${destinations.length === 1 ? "" : "s"} matching your interests`;
    }

    if (destinations.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">&#128506;</div>
          <h3>No Destinations Found</h3>
          <p>No tourism destinations matched your combination of filters. Try broadening your criteria or resetting filters.</p>
          <button class="btn btn-primary" onclick="ExplorePage.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = destinations
      .map((dest, index) => {
        // Subtle alternation between terracotta and slate/white for visual richness matching mockup
        const isClay = index % 3 === 1 ? "card-theme-clay" : "";

        return `
        <article class="destination-card ${isClay}" aria-labelledby="card-title-${dest.id}">
          <div class="destination-card-media">
            <img src="${dest.image}" alt="${Utils.escapeHTML(dest.name)}" loading="lazy" onerror="Utils.handleImageError(this, '${dest.name}')" />
            <span class="destination-card-badge">${Utils.escapeHTML(dest.province)}</span>
            <span class="destination-card-category">${Utils.escapeHTML(dest.subCategory)}</span>
          </div>
          <div class="destination-card-body">
            <div class="destination-card-province">${Utils.escapeHTML(dest.province)}</div>
            <h3 class="destination-card-title" id="card-title-${dest.id}">
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
              <button type="button" data-destination-placeholder class="destination-card-link">View Destination &rarr;</button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");
  }
};
