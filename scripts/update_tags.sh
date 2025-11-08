#!/usr/bin/env bash
# Update tags CSVs for Swing Tag Builder
# Requires: curl
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

ALL_DIR="$ROOT_DIR/tags/all"
UI_DIR="$ROOT_DIR/tags/ui"

# Fresh folders
rm -rf "$ALL_DIR" "$UI_DIR"
mkdir -p "$ALL_DIR" "$UI_DIR"

# Spreadsheet base (tags)
TAGS_BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vRExGpjR2tcEK9n9jgca0Vug94etEFuouriCIKCrh6T0ez7XOMHlOvKgpyQIf5aqXuFMLCgoA-vhee6/pub?single=true&output=csv&gid="

# Names aligned with GIDs as provided
names=(
  "location"
  "dance_type"
  "event_type"
  "level"
  "role"
  "music_speed"
  "music_source"
  "language"
  "venue_type"
  "registration"
  "price_type"
  "age_policy"
  "footwear"
)

gids=(
  "1613110947"
  "1262810551"
  "1767805000"
  "21940718"
  "580185679"
  "749180173"
  "1438046882"
  "1955960245"
  "1295506722"
  "2021528078"
  "1041725092"
  "1166459861"
  "1367263539"
)

echo "Downloading tag sheets to $ALL_DIR ..."
for i in "${!names[@]}"; do
  name="${names[$i]}"
  gid="${gids[$i]}"
  url="${TAGS_BASE}${gid}"
  out="${ALL_DIR}/${name}.csv"
  echo " - ${name} (${gid})"
  curl -L --fail --silent --show-error "${url}" -o "${out}"
done

# UI sheet (single sheet URL provided)
UI_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vSE4bUsbuTS-qr0DMeYOtNyD9dJyEtOIR_nqacFDfHthDgmxOF45oXSAI7UADlT0lJbicDP45G5s_KG/pub?gid=1442180800&single=true&output=csv"
echo "Downloading UI sheet to $UI_DIR/tags_ui.csv ..."
curl -L --fail --silent --show-error "${UI_URL}" -o "${UI_DIR}/tags_ui.csv"

echo "Done."
