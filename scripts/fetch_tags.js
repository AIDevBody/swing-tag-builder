const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Mapping of categories to grid IDs.  Must stay in sync with index.html.
const tagCategories = {
  location:        '1613110947',
  dance_type:      '1262810551',
  event_type:      '1767805000',
  level:           '21940718',
  role:            '580185679',
  music_speed:     '749180173',
  music_source:    '1438046882',
  language:        '1955960245',
  venue_type:      '1295506722',
  registration:    '2021528078',
  price_type:      '1041725092',
  age_policy:      '1166459861',
  footwear:        '1367263539'
};

// Base URL for the published CSV.  Each call substitutes the GID.
const baseURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRExGpjR2tcEK9n9jgca0Vug94etEFuouriCIKCrh6T0ez7XOMHlOvKgpyQIf5aqXuFMLCgoA-vhee6/pub?gid=GID&single=true&output=csv';

// URL for the UI types CSV (single sheet)
const uiURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSE4bUsbuTS-qr0DMeYOtNyD9dJyEtOIR_nqacFDfHthDgmxOF45oXSAI7UADlT0lJbicDP45G5s_KG/pub?gid=1442180800&single=true&output=csv';

async function fetchCsv(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

async function run() {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data', { recursive: true });
  }
  // Fetch each category CSV and save to data/
  for (const [category, gid] of Object.entries(tagCategories)) {
    const url = baseURL.replace('GID', gid);
    console.log(`Downloading ${category} from ${url}`);
    const text = await fetchCsv(url);
    fs.writeFileSync(`data/${category}.csv`, text.trim());
  }
  // Fetch UI types sheet
  console.log(`Downloading ui_types from ${uiURL}`);
  const uiText = await fetchCsv(uiURL);
  fs.writeFileSync('data/ui_types.csv', uiText.trim());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});