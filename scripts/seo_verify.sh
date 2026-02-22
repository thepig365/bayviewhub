#!/usr/bin/env bash
set -euo pipefail

BASE_WWW="https://www.bayviewhub.me"
BASE_APEX="https://bayviewhub.me"

echo "== SEO verify for bayviewhub.me =="

echo
echo "[1] robots.txt has canonical sitemap host (www)"
curl -fsSL "${BASE_WWW}/robots.txt" | rg -n "^Sitemap: https://www\.bayviewhub\.me/sitemap\.xml$"
echo "PASS"

echo
echo "[2] sitemap.xml uses canonical host (www)"
curl -fsSL "${BASE_WWW}/sitemap.xml" | rg -n "<loc>https://www\.bayviewhub\.me/"
echo "PASS"

echo
echo "[3] Redirect: wrong feasibility URL -> canonical feasibility URL (308)"
curl -sI "${BASE_WWW}/backyard-small-second-home/feasibility-checklist" | rg -n "^HTTP/.* 308|^location: /backyard-small-second-home/feasibility-check$" -i
echo "PASS"

echo
echo "[4] Redirect: legacy /second-home -> canonical SSD hub (permanent)"
curl -sI "${BASE_WWW}/second-home" | rg -n "^HTTP/.* 308|^location: /backyard-small-second-home$" -i
echo "PASS"

echo
echo "[5] Redirect: apex host -> www host (308), path + query preserved"
curl -sI "${BASE_APEX}/backyard-small-second-home?utm_source=seo_test" | rg -n "^HTTP/.* 308|^location: https://www\.bayviewhub\.me/backyard-small-second-home\?utm_source=seo_test$" -i
echo "PASS"

echo
echo "[6] Canonical host check on homepage HTML"
curl -fsSL "${BASE_WWW}/" | rg -n "<link rel=\"canonical\" href=\"https://www\.bayviewhub\.me/?\""
echo "PASS"

echo
echo "All checks passed."
