/**
 * Zameen — Interactive Multimedia Tourism Website
 * Deterministic Personalised Recommendation Engine
 */

const Recommendations = {
  /**
   * Generates tailored recommendations based on user selections and context.
   * 
   * @param {object} criteria
   * @param {string} criteria.experience - Selected experience category ('all', 'cultural', 'nature', 'adventure', etc.)
   * @param {string} criteria.region - Selected geographic region ('all', 'gilgit-baltistan', 'punjab', etc.)
   * @param {string} criteria.season - Selected season ('all', 'spring', 'summer', 'autumn', 'winter')
   * @param {boolean} criteria.isDomestic - Whether the visitor is in Pakistan / prioritising domestic weekend/short trips
   * @param {number} criteria.limit - Max number of recommendations to return (default 4)
   * @returns {object} - { results: Array, matchType: 'exact'|'relaxed'|'curated', explanation: string }
   */
  getRecommendations(criteria = {}) {
    const {
      experience = "all",
      region = "all",
      season = "all",
      isDomestic = false,
      limit = 4
    } = criteria;

    let scoredDestinations = DESTINATIONS_DATA.map((dest) => {
      let score = 0;
      let reasons = [];

      // 1. Experience Match
      if (experience !== "all") {
        if (dest.category === experience) {
          score += 40;
          reasons.push(`Directly matches your interest in ${Utils.getCategoryLabel(experience)}`);
        } else if (dest.subCategory.toLowerCase().includes(experience)) {
          score += 20;
          reasons.push(`Offers activities relevant to your interests`);
        }
      }

      // 2. Region Match
      if (region !== "all") {
        if (dest.region === region) {
          score += 35;
          reasons.push(`Located in your preferred region of ${Utils.getRegionLabel(region)}`);
        }
      }

      // 3. Season Match
      if (season !== "all") {
        if (dest.seasons.includes(season)) {
          score += 25;
          reasons.push(`Highly recommended for travel in ${Utils.getSeasonLabel(season).split(' ')[0]}`);
        } else {
          score -= 10; // Out of prime season penalty
        }
      } else {
        // Match with current calendar season
        const currentSeason = Utils.getCurrentSeason();
        if (dest.seasons.includes(currentSeason)) {
          score += 15;
          reasons.push(`Currently in prime season (${Utils.getSeasonLabel(currentSeason).split(' ')[0]})`);
        }
      }

      // 4. Location Context (Domestic vs Overseas/International)
      if (isDomestic) {
        // Domestic travelers often value accessible weekend escapes & cultural hubs
        if (dest.region === "punjab" || dest.region === "islamabad" || dest.region === "khyber-pakhtunkhwa") {
          score += 10;
          reasons.push(`Easily accessible for domestic breaks and holidays`);
        }
      } else {
        // International & Overseas visitors prioritize iconic world-heritage and bucket-list mountains
        if (dest.tags.includes("unesco") || dest.tags.includes("karakoram") || dest.featured) {
          score += 10;
          reasons.push(`Unmissable premier landmark for first-time or overseas travellers`);
        }
      }

      // Default featured bonus to break ties gracefully
      if (dest.featured) score += 5;

      return {
        destination: dest,
        score: score,
        reasons: reasons.length > 0 ? reasons : ["Celebrated Pakistani destination suited to diverse itineraries"]
      };
    });

    // Sort descending by score
    scoredDestinations.sort((a, b) => b.score - a.score);

    // Check if we have high-confidence exact matches
    const topScore = scoredDestinations[0] ? scoredDestinations[0].score : 0;
    let matchType = "exact";
    let explanation = "Found direct matches tailored to your chosen preferences.";

    if (topScore < 30) {
      matchType = "relaxed";
      explanation = "No exact match satisfied every single criterion, so we relaxed constraints to show Pakistan's finest destinations matching your primary interest.";
    }

    const results = scoredDestinations.slice(0, limit);

    return {
      results,
      matchType,
      explanation
    };
  },

  /**
   * Renders recommendations into a container element
   */
  renderRecommendationCards(containerId, recommendationsData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!recommendationsData || !recommendationsData.results || recommendationsData.results.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <p>No destinations match your exact criteria. Try resetting filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = recommendationsData.results
      .map(({ destination: dest, reasons }, index) => {
        const themeClass = index % 2 === 0 ? "card-theme-clay" : "card-theme-navy";
        const primaryReason = reasons[0] || "Tailored recommendation";

        return `
          <article class="destination-card ${themeClass}" aria-labelledby="rec-title-${dest.id}">
            <div class="destination-card-media">
              <img src="${dest.image}" alt="${Utils.escapeHTML(dest.name)}" loading="lazy" onerror="Utils.handleImageError(this, '${dest.name}')" />
              <span class="destination-card-badge">${Utils.escapeHTML(dest.province)}</span>
              <span class="destination-card-category">${Utils.escapeHTML(dest.subCategory)}</span>
            </div>
            <div class="destination-card-body">                <div class="recommendation-reason-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                ${Utils.escapeHTML(primaryReason)}
              </div>
              <h3 class="destination-card-title" id="rec-title-${dest.id}">
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
                  ${Utils.escapeHTML(dest.typicalDuration)}
                </span>
                <button type="button" data-destination-placeholder class="destination-card-link">
                  View Details &rarr;
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }
};
