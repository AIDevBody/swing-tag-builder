# Swing Tag Builder (GitHub Pages)

Static site that reads two published Google Sheets CSVs:

1. **UI Config CSV** (mapping `tag_type` → `ui_type`):  
   `https://docs.google.com/spreadsheets/d/e/2PACX-1vSE4bUsbuTS-qr0DMeYOtNyD9dJyEtOIR_nqacFDfHthDgmxOF45oXSAI7UADlT0lJbicDP45G5s_KG/pub?gid=0&single=true&output=csv`

   - First column: `tag_type` (e.g., `location`, `dance_type`)
   - Second column: `ui_type` — `dropdown` | `radio` | `checkbox` | `multi` | `chips`

2. **Tags SoT CSV** (single CSV with all tags):  
   `https://docs.google.com/spreadsheets/d/e/2PACX-1vRExGpjR2tcEK9n9jgca0Vug94etEFuouriCIKCrh6T0ez7XOMHlOvKgpyQIf5aqXuFMLCgoA-vhee6/pub?output=csv`

   Expected columns:
   - `tag_type` (e.g., `location`, `dance_type`)
   - `tag` (canonical machine name, e.g., `weimar`, `lindy-hop`)
   - `is-active` (TRUE/FALSE) — optional; defaults to active if missing
   - Language columns: `display_en`, `display_de`, `display_fr`, ... (auto-detected)

The page auto-detects available languages from the `display_*` headers and defaults to the visitor's browser language.
Editors can copy **hashtags** or a **header block** and open a **Google Calendar create** link with tags prefilled.

## Deploy

- Put these files in a public repo (e.g., `swing-tag-builder`).
- GitHub → **Settings → Pages** → Deploy from branch (main / root).
- Visit the Pages URL.

To update the vocabulary, edit the Google Sheet and republish; reload the page (Google may cache for a few minutes).
