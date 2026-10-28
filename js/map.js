/**
 * Zameen — Interactive Multimedia Tourism Website
 * Interactive Leaflet Map Module
 */

const PakistanMap = {
  mapInstance: null,
  markersLayer: null,
  activeFilter: null,

  /**
   * Initializes the main interactive Pakistan map
   * @param {string} containerId - DOM element ID for the map container
   * @param {object} options - Configuration overrides
   */
  init(containerId = "pakistan-map", options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if Leaflet library is available
    if (typeof L === "undefined") {
      this.renderFallback(container, "Map library unavailable. Displaying regional destination cards below.");
      return;
    }

    try {
      // Pakistan geographic center and default zoom
      const defaultCenter = [30.3753, 69.3451];
      const defaultZoom = options.zoom || 5;

      // Clean up previous instance if re-initializing
      if (this.mapInstance) {
        this.mapInstance.remove();
        this.mapInstance = null;
      }

      this.mapInstance = L.map(containerId, {
        center: options.center || defaultCenter,
        zoom: defaultZoom,
        minZoom: 4,
        maxZoom: 13,
        scrollWheelZoom: false // Prevent accidental scroll trapping on page
      });

      // Enable scroll wheel zoom on click/focus
      this.mapInstance.on("focus", () => {
        this.mapInstance.scrollWheelZoom.enable();
      });

      // Base OpenStreetMap Tile Layer
      const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors | Zameen',
        maxZoom: 18
      });

      tileLayer.on("tileerror", () => {
        console.warn("Tile loading error detected; fallback styling active.");
      });

      tileLayer.addTo(this.mapInstance);

      // Layer group for destination markers
      this.markersLayer = L.layerGroup().addTo(this.mapInstance);

      // Add markers from data
      const destinations = options.destinations || DESTINATIONS_DATA;
      this.renderMarkers(destinations);

      // Ensure proper rendering if map was hidden
      setTimeout(() => {
        if (this.mapInstance) {
          this.mapInstance.invalidateSize();
        }
      }, 300);

    } catch (err) {
      console.error("Map initialization failed:", err);
      this.renderFallback(container, "Interactive map could not load. Please explore destinations using the card grid.");
    }
  },

  /**
   * Renders destination markers onto the map
   */
  renderMarkers(destinations) {
    if (!this.markersLayer || !this.mapInstance) return;
    this.markersLayer.clearLayers();

    destinations.forEach((dest) => {
      if (!dest.coordinates || !dest.coordinates.lat || !dest.coordinates.lng) return;

      // Custom HTML Pin icon matching our palette
      const customPin = L.divIcon({
        className: "custom-map-marker-wrapper",
        html: `
          <div class="custom-map-pin" style="background-color: var(--color-primary); color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(47,62,74,0.35); border: 2px solid #FFFFFF;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customPin });

      // Rich popup content
      const popupHtml = `
        <div class="map-popup-card">
          <img src="${dest.image}" alt="${Utils.escapeHTML(dest.name)}" onerror="Utils.handleImageError(this, '${dest.name}')" />
          <div class="map-popup-province">${Utils.escapeHTML(dest.province)}</div>
          <h4 class="map-popup-title">${Utils.escapeHTML(dest.name)}</h4>
          <p style="font-size: 0.8rem; margin: 0.25rem 0 0.5rem; color: #555;">${Utils.escapeHTML(dest.description.substring(0, 85))}...</p>
          <div style="font-size: 0.75rem; color: var(--color-accent); font-weight: 700; margin-bottom: 0.5rem;">
            Best Season: ${Utils.escapeHTML(dest.bestTimeToVisit.split('(')[0])}
          </div>
          <button type="button" data-destination-placeholder class="btn btn-primary btn-sm btn-block" style="text-decoration:none; color:#fff !important; font-size:0.75rem; padding:0.35rem 0.5rem;">
            View Destination Details &rarr;
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260 });
      this.markersLayer.addLayer(marker);
    });
  },

  /**
   * Focuses and zooms the map to a specific geographic region
   */
  zoomToRegion(regionKey) {
    if (!this.mapInstance || !REGIONS_DATA[regionKey]) return;
    const reg = REGIONS_DATA[regionKey];
    this.mapInstance.flyTo([reg.center.lat, reg.center.lng], reg.zoom, {
      duration: 1.2
    });
  },

  /**
   * Accessible fallback if Leaflet cannot be initialized
   */
  renderFallback(container, message) {
    container.innerHTML = `
      <div style="padding: 2.5rem; text-align: center; background: var(--color-surface); border: 2px dashed var(--color-border); border-radius: 8px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#9D4F35" style="margin-bottom: 1rem;">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Interactive Map Overview</h4>
        <p style="color: var(--color-text-muted); max-width: 500px; margin: 0 auto 1.5rem;">${Utils.escapeHTML(message)}</p>
        <a href="explore.html" class="btn btn-primary btn-sm">Browse All Destinations</a>
      </div>
    `;
  }
};
