#!/usr/bin/env bash
set -euo pipefail

BASE="https://www.bayviewhub.me"
APEX="https://bayviewhub.me"

hdr () {
  curl -sIL "$1" | egrep -i "HTTP/|location:|x-robots-tag|content-type:|cache-control:|server:|x-vercel|cf-"
}

html_meta () {
  curl -sL -A "SemrushBot" "$1" | tr '\n' ' ' | egrep -io \
  "<title[^>]*>.*?</title>|<meta[^>]*name=[\"']description[\"'][^>]*>|<h1[^>]*>.*?</h1>|<link[^>]*rel=[\"']canonical[\"'][^>]*>|<html[^>]*lang=[\"'][^\"']+[\"']|<meta[^>]*name=[\"']robots[\"'][^>]*>" \
  | head -n 60 || true
}

word_count () {
  curl -sL -A "SemrushBot" "$1" | python3 -c '
import re,sys
html=sys.stdin.read()
html=re.sub(r"(?is)<(script|style)[^>]*>.*?</\\1>"," ",html)
text=re.sub(r"(?s)<[^>]+>"," ",html)
text=re.sub(r"\\s+"," ",text).strip()
print("WORD_COUNT:",len(text.split()))
print("PREVIEW:",text[:220])
'
}

echo "== APEX redirect chain (expect 308 to www) =="
hdr "$APEX/"

echo
echo "== robots.txt (expect Sitemap: https://www.bayviewhub.me/sitemap.xml) =="
hdr "$BASE/robots.txt"
curl -sL "$BASE/robots.txt" | tail -n 20

echo
echo "== sitemap.xml (loc host should be www) =="
hdr "$BASE/sitemap.xml"
curl -sL "$BASE/sitemap.xml" | egrep -o "https://[^<]+" | head -n 30

URLS=(
  "$BASE/"
  "$BASE/backyard-small-second-home"
  "$BASE/backyard-small-second-home/feasibility-checklist"
  "$BASE/tools/utm"
  "$BASE/__version"
  "$BASE/private/founding-gallery"
)

for u in "${URLS[@]}"; do
  echo
  echo "============================================================"
  echo "URL: $u"
  echo "-- Headers --"
  hdr "$u"
  echo "-- Meta/H1/Canonical/Lang/Robots --"
  html_meta "$u"
  echo "-- Word Count (SemrushBot UA) --"
  word_count "$u"
done

echo
echo "== Feasibility redirect explicit (expect 308) =="
hdr "$BASE/backyard-small-second-home/feasibility-checklist"
hdr "$BASE/backyard-small-second-home/feasibility-check"
