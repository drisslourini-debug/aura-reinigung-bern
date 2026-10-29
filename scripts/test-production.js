const https = require("https");

const routes = [
  "/",
  "/offerte-anfragen",
  "/dienstleistungen",
  "/dienstleistungen/umzugsreinigung",
  "/dienstleistungen/unterhaltsreinigung",
  "/dienstleistungen/hauswartung-treppenhaus",
  "/dienstleistungen/fenster-storen",
  "/dienstleistungen/gewerbe-buero",
  "/dienstleistungen/baureinigung",
  "/ueber-uns",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/favicon.svg",
  "/images/logo-badge-3d.jpg",
  "/images/og-image.jpg",
  "/images/hero-clean.jpg",
  "/images/service-umzug.jpg",
  "/images/service-unterhalt.jpg",
  "/images/service-hauswartung.jpg",
  "/images/service-fenster.jpg",
  "/images/service-gewerbe.jpg",
  "/images/service-baureinigung.jpg",
  "/images/team-founders.jpg",
  "/images/before-clean.jpg",
  "/images/after-clean.jpg"
];

const host = "aura-reinigung-bern.vercel.app";

function checkRoute(path) {
  return new Promise((resolve) => {
    const req = https.request(
      {
        host,
        path,
        method: "GET",
        headers: { "User-Agent": "AURA-Test-Runner/1.0" }
      },
      (res) => {
        let size = 0;
        res.on("data", (chunk) => {
          size += chunk.length;
        });
        res.on("end", () => {
          resolve({
            path,
            status: res.statusCode,
            contentType: res.headers["content-type"],
            size
          });
        });
      }
    );
    req.on("error", (e) => resolve({ path, error: e.message }));
    req.end();
  });
}

async function run() {
  console.log(`Starting automated audit on https://${host}...`);
  let passes = 0;
  let fails = 0;

  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.status === 200 && res.size > 0) {
      console.log(`✓ [PASS] ${res.path.padEnd(45)} | 200 OK | ${(res.size / 1024).toFixed(1)} KB`);
      passes++;
    } else {
      console.log(`✗ [FAIL] ${res.path.padEnd(45)} | ${res.status || res.error}`);
      fails++;
    }
  }

  console.log(`\n================================`);
  console.log(`Audit Finished: ${passes} passed, ${fails} failed out of ${routes.length} total endpoints.`);
  console.log(`================================`);

  if (fails > 0) {
    process.exit(1);
  }
}

run();
