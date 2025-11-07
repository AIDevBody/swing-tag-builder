# Swing Tag Builder (GitHub Pages)

Static site that reads two CSVs mirrored from Google Sheets into the `data/` folder by a GitHub Actions workflow, then helps compose hashtags.

## CSV Sources
1. **UI Config CSV** (mapping `tag_type` → `ui_type`):  
   `https://docs.google.com/spreadsheets/d/e/2PACX-1vSE4bUsbuTS-qr0DMeYOtNyD9dJyEtOIR_nqacFDfHthDgmxOF45oXSAI7UADlT0lJbicDP45G5s_KG/pub?gid=0&single=true&output=csv`

2. **Tags SoT CSV** (single CSV with all tags):  
   `https://docs.google.com/spreadsheets/d/e/2PACX-1vRExGpjR2tcEK9n9jgca0Vug94etEFuouriCIKCrh6T0ez7XOMHlOvKgpyQIf5aqXuFMLCgoA-vhee6/pub?output=csv`

> The workflow stores these as `data/ui.csv` and `data/tags.csv`.

## Run locally

Just open `index.html` in a browser. If `data/` is empty, the page will show a notice.

## GitHub Actions

The workflow runs **on push only**. It downloads the latest CSVs into `data/` and commits any changes.

```yaml
on:
  push:
    branches: [ "**" ]
```

## Files
- `index.html` — UI that reads `data/*.csv` and builds simple controls per `ui_type`.
- `scripts/fetch_tags.js` — Node 18 script that fetches the two CSVs and saves them to `data/`.
- `.github/workflows/update-tags-data.yml` — Action that runs on push and commits updated CSVs.
- `data/.gitkeep` — placeholder so the folder exists in the repo.
