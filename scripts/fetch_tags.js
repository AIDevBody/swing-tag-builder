// Node 18+ script to mirror Google Sheet CSVs into ./data
// Uses the built-in global fetch in Node 18+
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UI_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSE4bUsbuTS-qr0DMeYOtNyD9dJyEtOIR_nqacFDfHthDgmxOF45oXSAI7UADlT0lJbicDP45G5s_KG/pub?gid=0&single=true&output=csv';
const TAGS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRExGpjR2tcEK9n9jgca0Vug94etEFuouriCIKCrh6T0ez7XOMHlOvKgpyQIf5aqXuFMLCgoA-vhee6/pub?output=csv';

async function download(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status} ${res.statusText}`);
  return await res.text();
}

async function main() {
  const outDir = resolve(__dirname, '..', 'data');
  await mkdir(outDir, { recursive: true });

  const [uiCsv, tagsCsv] = await Promise.all([download(UI_CSV_URL), download(TAGS_CSV_URL)]);

  await writeFile(resolve(outDir, 'ui.csv'), uiCsv, 'utf8');
  await writeFile(resolve(outDir, 'tags.csv'), tagsCsv, 'utf8');

  console.log('Saved data/ui.csv and data/tags.csv');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
