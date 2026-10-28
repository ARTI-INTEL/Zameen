/**
 * Zameen — Interactive Multimedia Tourism Website
 * Central Destination, Festival, and Regional Data Repository
 * 
 * Verified geographical coordinates, authentic cultural context, and
 * structured attributes supporting multi-facet filtering and recommendation logic.
 *
 */

const DESTINATIONS_DATA = [
  {
    id: "hunza-valley",
    slug: "hunza-valley",
    name: "Hunza Valley",
    province: "Gilgit-Baltistan",
    region: "gilgit-baltistan",
    category: "nature",
    subCategory: "Mountain Valleys & Glaciers",
    seasons: ["spring", "summer", "autumn"],
    bestTimeToVisit: "April to October (Spring blossom in April; Autumn foliage in October)",
    typicalDuration: "4–6 days",
    coordinates: { lat: 36.3167, lng: 74.6500 },
    featured: true,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    description: "A legendary mountain valley nestled in the Karakoram range, renowned for ancient silk-route fortresses, warm hospitality, and dramatic jagged peaks.",
    tags: ["karakoram", "mountains", "forts", "silk-road", "attabad-lake", "rakaposhi", "heritage", "trekking"]
  },
  {
    id: "skardu-baltistan",
    slug: "skardu-baltistan",
    name: "Skardu & Baltistan",
    province: "Gilgit-Baltistan",
    region: "gilgit-baltistan",
    category: "adventure",
    subCategory: "Alpine Wilderness & High Peaks",
    seasons: ["spring", "summer", "autumn"],
    bestTimeToVisit: "May to October (Peak summer for high altitude passes; autumn for golden poplars)",
    typicalDuration: "5–7 days",
    coordinates: { lat: 35.2971, lng: 75.6333 },
    featured: true,
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80",
    description: "The premier gateway to the mighty Karakoram giants, featuring glacial lakes, mystical cold sand dunes, and centuries-old Tibetan-influenced Balti heritage.",
    tags: ["skardu", "k2", "shangrila", "cold-desert", "shigar", "baltistan", "lakes", "adventure"]
  },
  {
    id: "fairy-meadows",
    slug: "fairy-meadows",
    name: "Fairy Meadows & Nanga Parbat",
    province: "Gilgit-Baltistan",
    region: "gilgit-baltistan",
    category: "adventure",
    subCategory: "Alpine Trekking & Wilderness",
    seasons: ["summer", "autumn"],
    bestTimeToVisit: "June to September (Trails are snow-free and weather is warmest)",
    typicalDuration: "3–4 days",
    coordinates: { lat: 35.3850, lng: 74.5775 },
    featured: false,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "A lush highland plateau offering front-row vistas of the monumental north face of Nanga Parbat (8,126m), the world's ninth-highest mountain.",
    tags: ["nanga-parbat", "fairy-meadows", "hiking", "glacier", "camping", "mountains", "adventure"]
  },
  {
    id: "deosai-national-park",
    slug: "deosai-national-park",
    name: "Deosai National Park",
    province: "Gilgit-Baltistan",
    region: "gilgit-baltistan",
    category: "nature",
    subCategory: "High Altitude Alpine Plains",
    seasons: ["summer"],
    bestTimeToVisit: "July to September (Wildflowers bloom in July–August; snowbound the rest of the year)",
    typicalDuration: "1–2 days (or day excursion from Skardu/Astore)",
    coordinates: { lat: 35.0500, lng: 75.4500 },
    featured: false,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "The 'Land of Giants'—the second-highest alpine plateau on Earth at an average elevation of 4,114 metres, carpeted in summer wildflowers and home to the Himalayan brown bear.",
    tags: ["deosai", "plateau", "wildlife", "brown-bear", "sheosar-lake", "national-park", "nature"]
  },
  {
    id: "lahore-walled-city",
    slug: "lahore-walled-city",
    name: "Walled City of Lahore & Badshahi Mosque",
    province: "Punjab",
    region: "punjab",
    category: "cultural",
    subCategory: "Mughal Architecture & Historic Cities",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "October to March (Pleasantly cool temperatures for walking tours and outdoor dining)",
    typicalDuration: "2–4 days",
    coordinates: { lat: 31.5880, lng: 74.3100 },
    featured: true,
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
    description: "The cultural soul of Pakistan, renowned for monumental Mughal architecture, vibrant historic bazaars, rich literary arts, and world-famous Punjabi gastronomy.",
    tags: ["lahore", "mughal", "badshahi-mosque", "heritage", "food", "walled-city", "punjab", "culture"]
  },
  {
    id: "swat-valley",
    slug: "swat-valley",
    name: "Swat Valley & Malam Jabba",
    province: "Khyber Pakhtunkhwa",
    region: "khyber-pakhtunkhwa",
    category: "recreational",
    subCategory: "Mountain Valleys & Ancient Buddhist Heritage",
    seasons: ["spring", "summer", "winter"],
    bestTimeToVisit: "May to October for green valley tourism; December to February for skiing at Malam Jabba",
    typicalDuration: "3–5 days",
    coordinates: { lat: 35.2227, lng: 72.4258 },
    featured: true,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    description: "Known historically as the 'Switzerland of the East', Swat offers verdant alpine valleys, roaring glacial rivers, modern ski resorts, and ancient Gandhara Buddhist relics.",
    tags: ["swat", "kalam", "malam-jabba", "skiing", "buddhist", "gandhara", "lakes", "kpk"]
  },
  {
    id: "mohenjo-daro",
    slug: "mohenjo-daro",
    name: "Mohenjo-daro Archaeological City",
    province: "Sindh",
    region: "sindh",
    category: "cultural",
    subCategory: "Ancient World Civilizations",
    seasons: ["autumn", "winter"],
    bestTimeToVisit: "November to February (Mild, dry winter weather ideal for exploring open-air archaeological ruins)",
    typicalDuration: "1–2 days",
    coordinates: { lat: 27.3292, lng: 68.1389 },
    featured: true,
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
    description: "One of the world's earliest major urban settlements, an extraordinary 4,500-year-old bronze age metropolis of the Indus Valley Civilization.",
    tags: ["mohenjo-daro", "indus-valley", "archaeology", "unesco", "ancient-history", "sindh", "heritage"]
  },
  {
    id: "makli-thatta",
    slug: "makli-thatta",
    name: "Makli Necropolis & Thatta",
    province: "Sindh",
    region: "sindh",
    category: "cultural",
    subCategory: "Mausoleums & Historical Architecture",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "November to March (Pleasantly cool maritime breezes from the Arabian Sea)",
    typicalDuration: "1–2 days (easy day trip from Karachi)",
    coordinates: { lat: 24.7500, lng: 67.9000 },
    featured: false,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    description: "One of the largest funerary sites on Earth, housing half a million intricately carved stone tombs and tile-glazed royal mausoleums spanning four centuries.",
    tags: ["makli", "thatta", "unesco", "sindh", "tombs", "shah-jahan-mosque", "heritage", "history"]
  },
  {
    id: "hingol-national-park",
    slug: "hingol-national-park",
    name: "Hingol National Park & Makran Coast",
    province: "Balochistan",
    region: "balochistan",
    category: "nature",
    subCategory: "Coastal Desert & Geological Formations",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "November to March (Pleasant ocean temperatures avoiding severe summer desert heat)",
    typicalDuration: "2–3 days (or full day coastal drive from Karachi)",
    coordinates: { lat: 25.5200, lng: 65.5200 },
    featured: true,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "A surreal, otherworldly landscape along the Arabian Sea where natural wind-sculpted rock monuments, active mud volcanoes, and pristine coastal beaches meet.",
    tags: ["hingol", "balochistan", "makran", "kund-malir", "princess-of-hope", "beaches", "desert", "nature"]
  },
  {
    id: "gwadar-coast",
    slug: "gwadar-coast",
    name: "Gwadar & Hammerhead Peninsula",
    province: "Balochistan",
    region: "balochistan",
    category: "coastal",
    subCategory: "Coastal Marine & Maritime Heritage",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "October to April (Mild coastal temperatures and clear blue skies)",
    typicalDuration: "2–3 days",
    coordinates: { lat: 25.1264, lng: 62.3225 },
    featured: false,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "An ancient Arabian Sea port town characterized by a distinct hammerhead peninsula, crystal-clear blue waters, and centuries of Omani maritime trading history.",
    tags: ["gwadar", "balochistan", "coastal", "beaches", "astola-island", "arabian-sea", "marine"]
  },
  {
    id: "islamabad-margalla",
    slug: "islamabad-margalla",
    name: "Islamabad & Margalla Hills",
    province: "Islamabad Capital Territory",
    region: "islamabad",
    category: "recreational",
    subCategory: "Modern Architecture & Foothill Nature",
    seasons: ["spring", "summer", "autumn", "winter"],
    bestTimeToVisit: "Year-round (Autumn and spring offer the best weather for outdoor hiking; winter is crisp and clear)",
    typicalDuration: "2–3 days",
    coordinates: { lat: 33.7294, lng: 73.0931 },
    featured: true,
    image: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80",
    description: "Pakistan's green and peaceful capital city, celebrated for modern modernist architecture, lush Himalayan foothill hiking trails, and premier cultural museums.",
    tags: ["islamabad", "faisal-mosque", "margalla-hills", "lok-virsa", "hiking", "capital", "nature"]
  },
  {
    id: "taxila-gandhara",
    slug: "taxila-gandhara",
    name: "Taxila Ancient Buddhist Ruins",
    province: "Punjab",
    region: "punjab",
    category: "cultural",
    subCategory: "Ancient Archaeological & Buddhist Centers",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "October to April (Comfortable weather for exploring expansive outdoor archaeological ruins)",
    typicalDuration: "1 day (easy 45-min excursion from Islamabad)",
    coordinates: { lat: 33.7439, lng: 72.7878 },
    featured: false,
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
    description: "An extraordinary UNESCO World Heritage archaeological complex that was once the foremost seat of higher learning, philosophy, and Greco-Buddhist art in ancient Asia.",
    tags: ["taxila", "unesco", "gandhara", "buddhist", "greece", "archaeology", "history", "punjab"]
  },
  {
    id: "multan-city-of-saints",
    slug: "multan-city-of-saints",
    name: "Multan — City of Saints & Shrines",
    province: "Punjab",
    region: "punjab",
    category: "cultural",
    subCategory: "Sufi Heritage & Islamic Art",
    seasons: ["autumn", "winter", "spring"],
    bestTimeToVisit: "November to March (Pleasantly temperate winters; summers can be very hot)",
    typicalDuration: "2–3 days",
    coordinates: { lat: 30.1575, lng: 71.5249 },
    featured: false,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    description: "One of the oldest continuously inhabited cities in Asia, celebrated worldwide for majestic blue-tiled Sufi mausoleums, traditional camel-skin lamps, and sweet Sohan Halwa.",
    tags: ["multan", "sufi", "shrines", "blue-pottery", "punjab", "history", "culture"]
  },
  {
    id: "kalash-valleys-chitral",
    slug: "kalash-valleys-chitral",
    name: "Kalash Valleys & Chitral",
    province: "Khyber Pakhtunkhwa",
    region: "khyber-pakhtunkhwa",
    category: "festivals",
    subCategory: "Indigenous Culture & Folk Traditions",
    seasons: ["spring", "summer", "autumn"],
    bestTimeToVisit: "May (Chilam Joshi festival), August (Uchal festival), or December (Chaumos festival)",
    typicalDuration: "4–6 days",
    coordinates: { lat: 35.6833, lng: 71.6667 },
    featured: false,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    description: "Home to the indigenous non-Muslim Kalash people, an ancient community in the Hindu Kush mountains who preserve unique polytheistic festivals, music, and embroidered attire.",
    tags: ["kalash", "chitral", "festivals", "indigenous", "hindu-kush", "kpk", "folklore"]
  },
  {
    id: "neelum-valley-kashmir",
    slug: "neelum-valley-kashmir",
    name: "Neelum Valley & Ratti Gali",
    province: "Azad Jammu & Kashmir",
    region: "azad-kashmir",
    category: "nature",
    subCategory: "Alpine Meadows & Glacial Lakes",
    seasons: ["spring", "summer", "autumn"],
    bestTimeToVisit: "May to October (Ratti Gali Lake is accessible from late June to September)",
    typicalDuration: "4–5 days",
    coordinates: { lat: 34.5833, lng: 73.9000 },
    featured: false,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "A bow-shaped valley of rushing turquoise waters, thick pine forests, traditional wooden villages, and breathtaking high-altitude alpine lakes.",
    tags: ["neelum-valley", "kashmir", "ratti-gali", "arang-kel", "lakes", "alpine", "nature"]
  }
];

const FESTIVALS_DATA = [
  {
    id: "shandur-polo-festival",
    name: "Shandur Polo Festival",
    location: "Shandur Pass, Gilgit-Baltistan & Chitral border",
    season: "summer",
    timing: "Annually in early July (approx. July 7–9)",
    dateStatus: "Confirmed seasonally (subject to mountain road clearance)",
    category: "sports",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "Known worldwide as polo played at the 'Roof of the World' at 3,700 metres elevation. The festival features traditional, free-style polo with no modern rules or referee timeouts, contested between the historical rival teams of Gilgit and Chitral since 1936.",
    associatedDestinations: ["hunza-valley", "skardu-baltistan", "kalash-valleys-chitral"]
  },
  {
    id: "chilam-joshi-festival",
    name: "Chilam Joshi Spring Festival",
    location: "Kalash Valleys, Chitral, Khyber Pakhtunkhwa",
    season: "spring",
    timing: "Mid-May (typically May 13–16)",
    dateStatus: "Traditional annual schedule (confirmed annually by Kalash elders)",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "The foremost spring festival of the Kalash people, marking the arrival of spring and praying for the safety of herds and crops. Kalash women wear elaborate embroidered headdresses while the community gathers in village courtyards for communal songs, folk dances, and social celebrations.",
    associatedDestinations: ["kalash-valleys-chitral", "swat-valley"]
  },
  {
    id: "lok-mela-heritage",
    name: "Lok Mela — National Folk Heritage Festival",
    location: "Lok Virsa Museum Complex, Shakarparian, Islamabad",
    season: "autumn",
    timing: "Late October or November (10-day cultural showcase)",
    dateStatus: "Annual dates announced by National Heritage Ministry",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "The premier national celebration of Pakistani traditional folklore, crafts, and music. Over 500 master artisans, folk musicians, and folkloric dancers from every province and territory—including Balochistan, Sindh, Punjab, KPK, and Gilgit-Baltistan—set up regional pavilions with live demonstrations and regional cuisine.",
    associatedDestinations: ["islamabad-margalla", "taxila-gandhara", "lahore-walled-city"]
  },
  {
    id: "cholistan-desert-rally",
    name: "Cholistan Desert Jeep Rally & Cultural Mela",
    location: "Derawar Fort, Cholistan Desert, Punjab",
    season: "winter",
    timing: "Mid-February (typically 4-day event)",
    dateStatus: "Annual winter schedule announced by Tourism Development Corporation of Punjab (TDCP)",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "A premier motorsport and cultural spectacular staging intense 500km off-road desert racing across sand dunes. Staged beside the monumental 40-bastion medieval Derawar Fort, the event includes vibrant camel dances, Cholistani fireworks, folk Sufi singing, and desert camping.",
    associatedDestinations: ["multan-city-of-saints", "lahore-walled-city"]
  },
  {
    id: "sibi-mela",
    name: "Sibi Mela & Cultural Festival",
    location: "Sibi, Balochistan",
    season: "winter",
    timing: "Late February",
    dateStatus: "Historic recurring seasonal date",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "Celebrated since the 15th century, Sibi Mela is one of Pakistan's oldest living cultural gatherings. Tribal chieftains and livestock breeders from across Balochistan gather for prize livestock displays, camel racing, Balochi folk dances, handicraft exhibitions, and traditional martial sword arts.",
    associatedDestinations: ["hingol-national-park", "gwadar-coast"]
  },
  {
    id: "mela-chiraghan",
    name: "Mela Chiraghan (Festival of Lights)",
    location: "Shalimar Gardens & Shrine of Madho Lal Hussain, Lahore",
    season: "spring",
    timing: "Last weekend of March",
    dateStatus: "Traditional spring celebration",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    culturalSignificance: "A vibrant 400-year-old Punjabi festival of lights commemorating the 16th-century Sufi poet Shah Hussain. Thousands of devotees light clay oil lamps (chiraghan) creating massive bonfire circles of light, accompanied by hypnotic dhol drumming, dhamal ecstatic dancing, and community feasting.",
    associatedDestinations: ["lahore-walled-city"]
  }
];

const EXPERIENCE_CATEGORIES = [
  {
    id: "cultural",
    title: "Cultural & Historical Tourism",
    number: "01",
    theme: "is-clay",
    description: "Explore 5,000 years of civilization: from ancient Indus Valley ruins and Gandhara Buddhist stupas to monumental Mughal forts and vibrant Sufi shrines.",
    highlights: ["Lahore Walled City", "Mohenjo-daro", "Taxila", "Makli Necropolis Thatta", "Multan Shrines"],
    icon: "landmark"
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    number: "02",
    theme: "is-slate",
    description: "Witness dramatic biodiversity across towering Karakoram peaks, rolling 4,000m alpine plains, rare Himalayan brown bears, and desert geological monuments.",
    highlights: ["Hunza Valley", "Deosai National Park", "Hingol National Park", "Neelum Valley"],
    icon: "mountain"
  },
  {
    id: "adventure",
    title: "Mountains & Adventure",
    number: "03",
    theme: "is-clay",
    description: "Thrill-seeking expeditions: high-altitude K2 staging treks, world-famous cliffside jeep tracks, cold desert quad safaris, and wilderness camping.",
    highlights: ["Skardu & Baltistan", "Fairy Meadows & Nanga Parbat", "Sarfaranga Dunes", "Malam Jabba Ski Resort"],
    icon: "compass"
  },
  {
    id: "coastal",
    title: "Coastal & Marine Wonders",
    number: "04",
    theme: "is-slate",
    description: "Discover the untouched Makran coastline along the Arabian Sea: hammerhead peninsulas, secluded desert beaches, and coral scuba diving at Astola Island.",
    highlights: ["Gwadar Peninsula", "Kund Malir Golden Beach", "Astola Island", "Princess of Hope"],
    icon: "water"
  },
  {
    id: "festivals",
    title: "Sports & Cultural Festivals",
    number: "05",
    theme: "is-clay",
    description: "Immerse yourself in living traditions: free-style high-altitude polo at Shandur, polytheistic Kalash spring ceremonies, and desert jeep rallies.",
    highlights: ["Shandur Polo Festival", "Chilam Joshi Kalash", "Lok Mela Islamabad", "Cholistan Rally"],
    icon: "calendar"
  },
  {
    id: "recreational",
    title: "Lakes, Valleys & Countryside",
    number: "06",
    theme: "is-slate",
    description: "Restorative family vacations, scenic riverside chalets, boating on turquoise glacial lakes, and lush pine foothill walking trails.",
    highlights: ["Swat Valley & Kalam", "Islamabad Margalla Hills", "Attabad Lake", "Rawal Lake"],
    icon: "sun"
  }
];

const REGIONS_DATA = {
  "gilgit-baltistan": {
    name: "Gilgit-Baltistan",
    tagline: "The Realm of Mountain Giants",
    description: "Home to the confluence of the Karakoram, Himalaya, and Hindu Kush ranges, including K2 and five 8,000-metre peaks.",
    center: { lat: 35.8819, lng: 74.4643 },
    zoom: 7
  },
  "khyber-pakhtunkhwa": {
    name: "Khyber Pakhtunkhwa",
    tagline: "Valleys, Heritage & Hospitality",
    description: "Famed for the scenic valleys of Swat and Kaghan, Gandharan Buddhist treasures, and the indigenous Kalash traditions.",
    center: { lat: 34.9526, lng: 72.3311 },
    zoom: 7
  },
  "punjab": {
    name: "Punjab",
    tagline: "Land of Five Rivers & Imperial Splendour",
    description: "The heartland of Mughal architecture, vibrant cuisine, Sufi shrines, and rich agricultural plains.",
    center: { lat: 31.1704, lng: 72.7097 },
    zoom: 7
  },
  "sindh": {
    name: "Sindh",
    tagline: "Cradle of the Indus Civilization",
    description: "Ancient Bronze Age cities at Mohenjo-daro, historic Sufi shrines, and monumental necropolises near the Arabian Sea.",
    center: { lat: 25.8943, lng: 68.5247 },
    zoom: 7
  },
  "balochistan": {
    name: "Balochistan",
    tagline: "Rugged Canyons & Untamed Coastlines",
    description: "The dramatic Makran Coastal Highway, otherworldly rock sculptures, mud volcanoes, and the warm waters of Gwadar.",
    center: { lat: 28.4907, lng: 65.0958 },
    zoom: 6
  },
  "islamabad": {
    name: "Islamabad Capital Territory",
    tagline: "Modern Capital Beneath the Margallas",
    description: "Modernist architecture, green foothill hiking trails, and the national repositories of culture and heritage.",
    center: { lat: 33.6844, lng: 73.0479 },
    zoom: 11
  },
  "azad-kashmir": {
    name: "Azad Jammu & Kashmir",
    tagline: "Paradise of Pine Forests & Alpine Lakes",
    description: "Emerald river valleys, terraced orchards, and turquoise glacial cirques in Neelum Valley.",
    center: { lat: 34.3590, lng: 73.7450 },
    zoom: 8
  }
};
